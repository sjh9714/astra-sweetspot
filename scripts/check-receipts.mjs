import assert from 'node:assert/strict';
import {readFile, cp, mkdtemp, rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {sha256, collectEvent} from '../src/runner.mjs';
import {promptFor} from '../src/cases.mjs';
import {grade, root} from '../src/grade.mjs';
import {loadResults} from '../src/report.mjs';

const execute = promisify(execFile);
const report = await loadResults();
for (const row of report.runs) {
  const artifact = join(root, 'results', 'receipts', row.id);
  assert.deepEqual(JSON.parse(await readFile(join(artifact, 'receipt.json'), 'utf8')), row);
  if (row.usageSupplement) {
    assert.equal(row.usageSupplement.eventFile, 'usage-event.json');
    const rawEvent = await readFile(join(artifact, 'usage-event.json'));
    assert.equal(sha256(rawEvent), row.usageSupplement.eventSha256);
    const event = JSON.parse(rawEvent);
    assert.equal(event.type, 'turn.completed');
    assert.deepEqual(event.usage, row.usage);
    const collected = {usage: {}};
    collectEvent(event, collected);
    assert.deepEqual(collected.usage, row.usage);
  }
  const candidate = join(artifact, 'index.js');
  assert.equal(sha256(await readFile(candidate)), row.candidateSha256);
  assert.equal(sha256(await readFile(join(artifact, 'candidate.patch'))), row.patchSha256);
  assert.equal(sha256(await readFile(join(root, 'fixtures', row.case, 'index.js'))), row.source.sha256);
  assert.equal(sha256(promptFor(row.case)), row.promptSha256);
  assert.equal(sha256(await readFile(join(root, 'graders', 'check.mjs'))), row.graderSha256);
  assert.deepEqual(await grade(row.case, candidate), row.verification);
  const directory = await mkdtemp(join(tmpdir(), 'sweetspot-patch-check-'));
  try {
    await cp(join(root, 'fixtures', row.case), directory, {recursive: true});
    await execute('git', ['init', '--quiet'], {cwd: directory});
    const patch = await readFile(join(artifact, 'candidate.patch'), 'utf8');
    if (patch.length) await execute('git', ['-c', 'core.autocrlf=false', 'apply', '--', join(artifact, 'candidate.patch')], {cwd: directory});
    assert.equal(sha256(await readFile(join(directory, 'index.js'))), row.candidateSha256);
  } finally { await rm(directory, {recursive: true, force: true}); }
  console.log(`Verified ${row.case} ${row.requestedModel} ${row.effort}: hashes, patch, and ${row.verification.passed}/${row.verification.total} checks`);
}
console.log(`Verified ${report.runs.length} published receipts.`);
