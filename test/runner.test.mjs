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
  assert.deepEqual(state.usage, {input_tokens: 120, cached_input_tokens: null, cache_write_input_tokens: null, output_tokens: null, reasoning_output_tokens: null});
});

test('a missing counter in any completed turn leaves that run total unknown', () => {
  const usage = {input_tokens: 100, cached_input_tokens: 40, cache_write_input_tokens: 0, output_tokens: 20, reasoning_output_tokens: 5};
  for (const field of Object.keys(usage)) {
    for (const missingTurn of [0, 1, 2]) {
      const state = {usage: {}};
      for (let turn = 0; turn < 3; turn++) {
        const counters = {...usage};
        if (turn === missingTurn) delete counters[field];
        collectEvent({type: 'turn.completed', usage: counters}, state);
      }
      const expected = Object.fromEntries(Object.entries(usage).map(([name, value]) => [name, name === field ? null : value * 3]));
      assert.deepEqual(state.usage, expected, `${field} omitted in turn ${missingTurn}`);
    }
  }
});

test('invalid counters and an absent usage block cannot produce complete totals', () => {
  for (const invalid of [null, -1, 1.5, '10', Number.MAX_SAFE_INTEGER + 1]) {
    const state = {usage: {}};
    for (const output_tokens of [10, invalid, 20]) {
      collectEvent({type: 'turn.completed', usage: {input_tokens: 100, output_tokens}}, state);
    }
    assert.equal(state.usage.output_tokens, null);
    assert.equal(state.usage.input_tokens, 300);
  }
  const state = {usage: {}};
  collectEvent({type: 'turn.completed'}, state);
  collectEvent({type: 'turn.completed', usage: {input_tokens: 100}}, state);
  assert.equal(state.usage.input_tokens, null);
});

test('complete counters sum exactly, preserve zero, and reject unsafe totals', () => {
  const state = {usage: {}};
  collectEvent({type: 'turn.completed', usage: {input_tokens: Number.MAX_SAFE_INTEGER, cache_write_input_tokens: 0, output_tokens: 10}}, state);
  collectEvent({type: 'turn.completed', usage: {input_tokens: 1, cache_write_input_tokens: 0, output_tokens: 20}}, state);
  assert.deepEqual(state.usage, {input_tokens: null, cached_input_tokens: null, cache_write_input_tokens: 0, output_tokens: 30, reasoning_output_tokens: null});
});
test('bad run options are rejected before invoking Codex', async () => {
  await assert.rejects(runTrial({id: '../outside', model: 'astra', effort: 'medium'}), /Unknown case/);
  await assert.rejects(runTrial({id: 'abort-delay', model: 'astra', effort: 'medium', timeout: NaN}), /Timeout/);
  const result = spawnSync(process.execPath, [fileURLToPath(new URL('../bin/astra-sweetspot.mjs', import.meta.url)), 'run', 'abort-delay', '--unexpected', 'x']);
  assert.equal(result.status, 1);
  assert.match(result.stderr.toString(), /Expected --model/);
});
