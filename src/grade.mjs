import {cp, mkdtemp, lstat, copyFile, rm} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {cases} from './cases.mjs';

export const root = fileURLToPath(new URL('../', import.meta.url));
const execute = promisify(execFile);

export async function grade(id, candidate) {
  if (!Object.hasOwn(cases, id)) throw new Error(`Unknown case: ${id}`);
  const info = await lstat(candidate);
  if (!info.isFile() || info.size > 256_000) throw new Error('Candidate must be a regular file smaller than 256 KB.');
  const directory = await mkdtemp(join(tmpdir(), 'sweetspot-grade-'));
  try {
    await cp(join(root, 'fixtures', id), directory, {recursive: true});
    await copyFile(candidate, join(directory, 'index.js'));
    let result;
    try {
      result = await execute(process.execPath, [join(root, 'graders', 'check.mjs'), id, directory], {timeout: 8000, maxBuffer: 1_000_000});
    } catch (error) {
      result = error;
      if (error.killed || !Number.isInteger(error.code) || ![0, 1].includes(error.code)) {
        return {passed: 0, total: id === 'abort-delay' ? 7 : 8, error: error.killed ? 'Grader timed out' : 'Candidate failed to execute'};
      }
    }
    const line = result.stdout?.split('\n').findLast(line => line.startsWith('SWEETSPOT_GRADE='));
    if (!line) return {passed: 0, total: id === 'abort-delay' ? 7 : 8, error: 'Grader produced no result'};
    return JSON.parse(line.slice('SWEETSPOT_GRADE='.length));
  } finally { await rm(directory, {recursive: true, force: true}); }
}
