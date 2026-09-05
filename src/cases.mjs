export const cases = {
  'abort-delay': {
    title: 'Abort before the retry delay',
    issue: 'https://github.com/sindresorhus/p-retry/issues/97',
    base: '6ac326b188834f4af5a54cedc114f67f0f510613',
    fix: '2aba573c0fdca165c4d95262f51ae56902f2f892',
    problem: 'When the supplied AbortSignal becomes aborted while an attempt is running, pRetry can wait for the full backoff before rejecting. Aborting during an asynchronous failure hook has the same problem. Make cancellation take effect promptly with the signal reason, without starting another retry or waiting for its delay. Preserve ordinary retries and the existing public API.',
  },
  'abort-cleanup': {
    title: 'Remove finished abort listeners',
    issue: 'https://github.com/sindresorhus/p-retry/issues/71',
    base: '285fdc3f890a6f3d199b3d4abb0bad7c172c2233',
    fix: '95a3a4a667494ac585e6ba7ff5154f04d30941f2',
    problem: 'Repeatedly using the same AbortSignal for completed pRetry calls accumulates abort listeners and produces MaxListenersExceededWarning. Remove the listener belonging to a finished call, on success and on terminal failure. Preserve cancellation of pending retries, ordinary retry behavior, and the existing public API. Do not remove listeners installed by someone else.',
  },
};

export const models = { astra: 'gpt-6-astra', sol: 'gpt-5.6-sol' };
export const efforts = ['low', 'medium', 'high'];

export function promptFor(id) {
  if (!Object.hasOwn(cases, id)) throw new Error(`Unknown case: ${id}`);
  return `Fix the following bug in this small JavaScript package.\n\n${cases[id].problem}\n\nThe implementation is index.js. Its dependency is vendored locally. No installation or network access is needed. Edit index.js only; you may add temporary tests, but only index.js will be used for independent grading. Do not change the public API or vendor files. Run the existing tests with npm test and check your fix. Do not search for upstream solutions. Finish with a short description of your change.\n`;
}
