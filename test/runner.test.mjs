import test from 'node:test';
import assert from 'node:assert/strict';
import {collectEvent, runTrial} from '../src/runner.mjs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {readFileSync} from 'node:fs';

test('captured CLI event retains reported reasoning and cache-write counters', () => {
  const event = JSON.parse(readFileSync(new URL('../results/receipts/2026-09-05T06-24-04-221Z-sol-medium-48beb0/usage-event.json', import.meta.url), 'utf8'));
  const state = {usage: {}};
  collectEvent(event, state);
  assert.deepEqual(state.usage, event.usage);
});

test('usage preserves unavailable fields and counts completed turns only', () => {
  const state = {usage: {input_tokens: null, cached_input_tokens: null, cache_write_input_tokens: null, output_tokens: null, reasoning_output_tokens: null}};
  collectEvent({type: 'item.completed', usage: {input_tokens: 999}}, state);
  assert.equal(state.usage.input_tokens, null);
  collectEvent({type: 'turn.completed', usage: {input_tokens: 100, output_tokens: 12}}, state);
  assert.deepEqual(state.usage, {input_tokens: 100, cached_input_tokens: null, cache_write_input_tokens: null, output_tokens: 12, reasoning_output_tokens: null});
  collectEvent({type: 'turn.completed', usage: {input_tokens: 20, cached_input_tokens: 5, output_tokens: -1}}, state);
  assert.deepEqual(state.usage, {input_tokens: 120, cached_input_tokens: 5, cache_write_input_tokens: null, output_tokens: 12, reasoning_output_tokens: null});
});
test('bad run options are rejected before invoking Codex', async () => {
  await assert.rejects(runTrial({id: '../outside', model: 'astra', effort: 'medium'}), /Unknown case/);
  await assert.rejects(runTrial({id: 'abort-delay', model: 'astra', effort: 'medium', timeout: NaN}), /Timeout/);
  const result = spawnSync(process.execPath, [fileURLToPath(new URL('../bin/astra-sweetspot.mjs', import.meta.url)), 'run', 'abort-delay', '--unexpected', 'x']);
  assert.equal(result.status, 1);
  assert.match(result.stderr.toString(), /Expected --model/);
});
