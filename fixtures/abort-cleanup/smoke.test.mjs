import test from 'node:test';
import assert from 'node:assert/strict';
import pRetry, {AbortError} from './index.js';

test('returns a successful value', async () => assert.equal(await pRetry(() => 42), 42));
test('retries a failure', async () => {
  let attempts = 0;
  assert.equal(await pRetry(() => { if (++attempts < 2) throw new Error('retry'); return 42; }, {minTimeout: 1}), 42);
  assert.equal(attempts, 2);
});
test('AbortError preserves the original error', async () => {
  const reason = new Error('stop');
  await assert.rejects(pRetry(() => { throw new AbortError(reason); }), error => error === reason);
});
