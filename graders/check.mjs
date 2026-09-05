import assert from 'node:assert/strict';
import {getEventListeners} from 'node:events';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';

const [id, directory] = process.argv.slice(2);
const {default: pRetry, AbortError} = await import(pathToFileURL(resolve(directory, 'index.js')));
const checks = [];
async function check(name, run) {
  try { await run(); checks.push({name, passed: true}); }
  catch (error) { checks.push({name, passed: false, detail: String(error.message).slice(0, 800)}); }
}

if (id === 'abort-delay') {
  for (const location of ['input', 'onFailedAttempt', 'shouldConsumeRetry', 'shouldRetry']) {
    await check(`abort in ${location} schedules no backoff`, async () => {
      const controller = new AbortController();
      const reason = new Error('requested cancellation');
      const waits = [];
      const original = globalThis.setTimeout;
      // Observe requested backoffs while fast-forwarding them. No timing threshold.
      globalThis.setTimeout = (callback, delay, ...args) => {
        waits.push(delay);
        return original(callback, 0, ...args);
      };
      let attempts = 0;
      try {
        const options = {signal: controller.signal, retries: 3, minTimeout: 500};
        if (location !== 'input') options[location] = async () => { await Promise.resolve(); controller.abort(reason); return true; };
        await assert.rejects(pRetry(async () => {
          attempts++;
          if (location === 'input') { await Promise.resolve(); controller.abort(reason); }
          throw new Error('attempt failed');
        }, options), error => error === reason);
        assert.equal(attempts, 1);
        assert.deepEqual(waits, []);
        assert.equal(getEventListeners(controller.signal, 'abort').length, 0);
      } finally { globalThis.setTimeout = original; }
    });
  }
  await check('ordinary retries keep their backoff and metadata', async () => {
    const waits = [];
    const contexts = [];
    const original = globalThis.setTimeout;
    globalThis.setTimeout = (callback, delay, ...args) => { waits.push(delay); return original(callback, 0, ...args); };
    let attempts = 0;
    try {
      const value = await pRetry(() => { if (++attempts < 3) throw new Error('retry'); return 42; }, {
        retries: 2, factor: 2, minTimeout: 50, onFailedAttempt: context => contexts.push(context),
      });
      assert.equal(value, 42);
      assert.equal(attempts, 3);
      assert.deepEqual(waits, [50, 100]);
      assert.deepEqual(contexts.map(c => [c.attemptNumber, c.retriesLeft]), [[1, 2], [2, 1]]);
    } finally { globalThis.setTimeout = original; }
  });
  await check('aborting an active delay cancels it and removes its listener', async () => {
    const controller = new AbortController();
    const reason = new Error('stop waiting');
    const task = pRetry(() => { throw new Error('retry'); }, {signal: controller.signal, minTimeout: 1000});
    setTimeout(() => controller.abort(reason), 5);
    await assert.rejects(task, error => error === reason);
    assert.equal(getEventListeners(controller.signal, 'abort').length, 0);
  });
  await check('shouldRetry=false preserves the attempt error', async () => {
    const reason = new Error('terminal');
    let attempts = 0;
    await assert.rejects(pRetry(() => { attempts++; throw reason; }, {shouldRetry: () => false}), error => error === reason);
    assert.equal(attempts, 1);
  });
} else if (id === 'abort-cleanup') {
  for (const outcome of ['success', 'success after retry', 'exhausted', 'AbortError', 'TypeError', 'hook throws', 'non-error']) {
    await check(`cleans up after ${outcome}, preserving unrelated listeners`, async () => {
      const controller = new AbortController();
      const unrelated = () => {};
      controller.signal.addEventListener('abort', unrelated);
      const reason = outcome === 'TypeError' ? new TypeError('not a network error') : new Error('terminal');
      let attempts = 0;
      const options = {signal: controller.signal, retries: 1, minTimeout: 1};
      if (outcome === 'hook throws') options.onFailedAttempt = () => { throw reason; };
      const task = pRetry(() => {
        attempts++;
        if (outcome === 'success' || (outcome === 'success after retry' && attempts === 2)) return 42;
        if (outcome === 'AbortError') throw new AbortError(reason);
        if (outcome === 'non-error') throw 'invalid';
        throw reason;
      }, options);
      if (outcome.startsWith('success')) {
        assert.equal(await task, 42);
        assert.equal(attempts, outcome === 'success' ? 1 : 2);
      } else {
        await assert.rejects(task, error => outcome === 'non-error' ? error instanceof TypeError : error === reason);
        assert.equal(attempts, outcome === 'exhausted' ? 2 : 1);
      }
      assert.deepEqual(getEventListeners(controller.signal, 'abort'), [unrelated]);
      controller.signal.removeEventListener('abort', unrelated);
    });
  }
  await check('cancels an in-flight retry with the supplied error', async () => {
    const controller = new AbortController();
    const reason = new Error('stop waiting');
    let attempts = 0;
    const task = pRetry(() => { attempts++; throw new Error('retry'); }, {signal: controller.signal, minTimeout: 1000});
    setTimeout(() => controller.abort(reason), 5);
    await assert.rejects(task, error => error === reason);
    assert.equal(attempts, 1);
    assert.equal(getEventListeners(controller.signal, 'abort').length, 0);
  });
} else { throw new Error(`Unknown grader: ${id}`); }

const passed = checks.filter(check => check.passed).length;
console.log('SWEETSPOT_GRADE=' + JSON.stringify({passed, total: checks.length, checks}));
process.exitCode = passed === checks.length ? 0 : 1;
