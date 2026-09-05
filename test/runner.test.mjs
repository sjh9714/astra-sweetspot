import test from 'node:test';
import assert from 'node:assert/strict';
import {collectEvent, runTrial} from '../src/runner.mjs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

test('usage preserves unavailable fields and counts completed turns only', () => {
  const state = {usage: {input_tokens: null, cached_input_tokens: null, output_tokens: null}};
  collectEvent({type: 'item.completed', usage: {input_tokens: 999}}, state);
  assert.equal(state.usage.input_tokens, null);
  collectEvent({type: 'turn.completed', usage: {input_tokens: 100, output_tokens: 12}}, state);
  assert.deepEqual(state.usage, {input_tokens: 100, cached_input_tokens: null, output_tokens: 12});
  collectEvent({type: 'turn.completed', usage: {input_tokens: 20, cached_input_tokens: 5, output_tokens: -1}}, state);
  assert.deepEqual(state.usage, {input_tokens: 120, cached_input_tokens: 5, output_tokens: 12});
});
test('bad run options are rejected before invoking Codex', async () => {
  await assert.rejects(runTrial({id: '../outside', model: 'astra', effort: 'medium'}), /Unknown case/);
  await assert.rejects(runTrial({id: 'abort-delay', model: 'astra', effort: 'medium', timeout: NaN}), /Timeout/);
  const result = spawnSync(process.execPath, [fileURLToPath(new URL('../bin/astra-sweetspot.mjs', import.meta.url)), 'run', 'abort-delay', '--unexpected', 'x']);
  assert.equal(result.status, 1);
  assert.match(result.stderr.toString(), /Expected --model/);
});
