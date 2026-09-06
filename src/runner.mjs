import {spawn, execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {mkdir, cp, readFile, writeFile} from 'node:fs/promises';
import {createWriteStream} from 'node:fs';
import {finished} from 'node:stream/promises';
import {join, dirname} from 'node:path';
import {homedir} from 'node:os';
import {createHash, randomBytes} from 'node:crypto';
import {performance} from 'node:perf_hooks';
import {cases, models, efforts, promptFor} from './cases.mjs';
import {grade, root} from './grade.mjs';

const execute = promisify(execFile);
export const sha256 = data => createHash('sha256').update(data).digest('hex');

export function collectEvent(event, state) {
  if (typeof event.model === 'string') state.observedModel = event.model;
  if (event.type === 'turn.failed' || event.type === 'error') state.failed = true;
  if (event.type !== 'turn.completed') return;
  for (const name of ['input_tokens', 'cached_input_tokens', 'cache_write_input_tokens', 'output_tokens', 'reasoning_output_tokens']) {
    const value = event.usage?.[name];
    const previous = state.completed ? state.usage[name] : 0;
    // A partial sum must never become a complete total after a later valid event.
    if (Number.isSafeInteger(previous) && previous >= 0 && Number.isSafeInteger(value) && value >= 0 && Number.isSafeInteger(previous + value)) {
      state.usage[name] = previous + value;
    } else {
      state.usage[name] = null;
    }
  }
  state.completed = true;
}

async function codexCommand() {
  if (process.platform !== 'win32') return {command: 'codex', prefix: []};
  const {stdout} = await execute('where.exe', ['codex']);
  const entries = stdout.trim().split(/\r?\n/);
  const executable = entries.find(path => path.toLowerCase().endsWith('.exe'));
  if (executable) return {command: executable, prefix: []};
  const shim = entries.find(path => /\.cmd$/i.test(path));
  if (!shim) throw new Error('Cannot locate a supported Codex executable.');
  return {command: process.execPath, prefix: [join(dirname(shim), 'node_modules', '@openai', 'codex', 'bin', 'codex.js')]};
}

export async function runTrial({id, model, effort, timeout = 180}) {
  if (!Object.hasOwn(cases, id)) throw new Error(`Unknown case: ${id}`);
  if (!Object.hasOwn(models, model)) throw new Error('Model must be astra or sol.');
  if (!efforts.includes(effort)) throw new Error('Effort must be low, medium, or high.');
  if (!Number.isInteger(timeout) || timeout < 10 || timeout > 900) throw new Error('Timeout must be 10–900 seconds.');
  const launcher = await codexCommand();
  const {stdout: version} = await execute(launcher.command, [...launcher.prefix, '--version']);
  const {stdout: help} = await execute(launcher.command, [...launcher.prefix, 'exec', '--help']);
  for (const flag of ['--ignore-user-config', '--ephemeral', '--json']) {
    if (!help.includes(flag)) throw new Error('Update Codex CLI to 0.153.0 or newer before running a trial.');
  }
  await execute('git', ['--version']);
  const runId = `${new Date().toISOString().replace(/[:.]/g, '-')}-${model}-${effort}-${randomBytes(3).toString('hex')}`;
  const directory = join(homedir(), '.astra-sweetspot', 'runs', runId);
  const workspace = join(directory, 'workspace');
  await mkdir(directory, {recursive: true, mode: 0o700});
  const hooksDirectory = join(directory, 'empty-hooks');
  await mkdir(hooksDirectory);
  await cp(join(root, 'fixtures', id), workspace, {recursive: true});
  const git = args => execute('git', ['-c', 'core.autocrlf=false', ...args], {cwd: workspace});
  await git(['init', '--quiet']);
  await git(['add', '.']);
  await git(['-c', 'user.name=Sweetspot fixture', '-c', 'user.email=fixture@example.invalid', '-c', `core.hooksPath=${hooksDirectory}`, '-c', 'commit.gpgsign=false', 'commit', '--quiet', '-m', 'Pristine public fixture']);
  const prompt = promptFor(id);
  await writeFile(join(directory, 'prompt.txt'), prompt, {mode: 0o600});
  const args = [...launcher.prefix, 'exec', '--ignore-user-config', '--ephemeral', '--model', models[model],
    '--sandbox', 'workspace-write', '--cd', workspace, '--json', '--color', 'never',
    '-c', 'approval_policy="never"', '-c', `model_reasoning_effort="${effort}"`,
    '-c', 'project_doc_max_bytes=0', '-c', 'web_search="disabled"',
    '--disable', 'multi_agent', '--disable', 'goals', '--disable', 'apps', '--disable', 'memories', '--disable', 'hooks',
    '--output-last-message', join(directory, 'last-message.txt'), '-'];
  const state = {usage: {input_tokens: null, cached_input_tokens: null, cache_write_input_tokens: null, output_tokens: null, reasoning_output_tokens: null}, observedModel: null, failed: false, completed: false};
  const raw = createWriteStream(join(directory, 'events.private.jsonl'), {mode: 0o600});
  const stderr = createWriteStream(join(directory, 'stderr.private.log'), {mode: 0o600});
  const startedAt = new Date().toISOString();
  const start = performance.now();
  let timedOut = false;
  let outputLimited = false;
  let bytes = 0;
  let pending = '';
  let killTimer;
  const child = spawn(launcher.command, args, {cwd: workspace, shell: false, detached: process.platform !== 'win32', stdio: ['pipe', 'pipe', 'pipe']});
  const kill = signal => {
    try {
      if (process.platform === 'win32') {
        const killer = spawn('taskkill.exe', ['/pid', String(child.pid), '/T', '/F'], {stdio: 'ignore'});
        killer.on('error', () => child.kill());
      } else { process.kill(-child.pid, signal); }
    } catch { /* The process may have exited between the timeout and signal. */ }
  };
  const stop = () => { kill('SIGTERM'); killTimer ??= setTimeout(() => kill('SIGKILL'), 1500); };
  const timer = setTimeout(() => { timedOut = true; stop(); }, timeout * 1000);
  const cancel = () => { state.failed = true; stop(); };
  process.once('SIGINT', cancel);
  process.once('SIGTERM', cancel);
  child.stdout.setEncoding('utf8');
  const parse = line => { try { collectEvent(JSON.parse(line), state); } catch { /* Non-JSON diagnostics are retained privately. */ } };
  child.stdout.on('data', chunk => {
    bytes += Buffer.byteLength(chunk);
    if (bytes > 32_000_000) { outputLimited = true; stop(); return; }
    raw.write(chunk);
    pending += chunk;
    let newline;
    while ((newline = pending.indexOf('\n')) !== -1) { parse(pending.slice(0, newline)); pending = pending.slice(newline + 1); }
    if (pending.length > 8_000_000) { outputLimited = true; pending = ''; stop(); }
  });
  child.stderr.on('data', chunk => {
    bytes += chunk.length;
    if (bytes > 32_000_000) { outputLimited = true; stop(); return; }
    stderr.write(chunk);
  });
  child.stdin.on('error', () => {});
  child.stdin.end(prompt);
  let exitCode;
  try {
    exitCode = await new Promise((resolve, reject) => { child.once('error', reject); child.once('close', resolve); });
  } finally {
    clearTimeout(timer);
    if (killTimer) clearTimeout(killTimer);
    process.removeListener('SIGINT', cancel);
    process.removeListener('SIGTERM', cancel);
    raw.end(); stderr.end();
    await Promise.all([finished(raw), finished(stderr)]);
  }
  if (pending) parse(pending);
  const elapsedSeconds = Math.round(performance.now() - start) / 1000;
  const status = timedOut ? 'timeout' : outputLimited ? 'output_limit' : exitCode === 0 && state.completed && !state.failed ? 'completed' : 'failed';
  let verification;
  let candidate;
  try {
    verification = await grade(id, join(workspace, 'index.js'));
    candidate = await readFile(join(workspace, 'index.js'));
  } catch { verification = {passed: 0, total: id === 'abort-delay' ? 7 : 8, error: 'Candidate missing or invalid'}; }
  const {stdout: patch} = await git(['diff', '--no-ext-diff', '--no-textconv', 'HEAD', '--', 'index.js']);
  await writeFile(join(directory, 'candidate.patch'), patch, {mode: 0o600});
  const receipt = {
    schemaVersion: 1, id: runId, case: id, startedAt, finishedAt: new Date().toISOString(),
    requestedModel: models[model], observedModel: state.observedModel, effort, status, elapsedSeconds,
    usage: state.usage, verification, harness: {codex: version.trim(), node: process.version, platform: process.platform, arch: process.arch, timeoutSeconds: timeout, ignoreUserConfig: true},
    source: {issue: cases[id].issue, baseCommit: cases[id].base, sha256: sha256(await readFile(join(root, 'fixtures', id, 'index.js')))},
    promptSha256: sha256(prompt), graderSha256: sha256(await readFile(join(root, 'graders', 'check.mjs'))),
    candidateSha256: candidate ? sha256(candidate) : null, patchSha256: sha256(patch),
  };
  await writeFile(join(directory, 'receipt.json'), JSON.stringify(receipt, null, 2) + '\n', {mode: 0o600});
  return {receipt, directory};
}
