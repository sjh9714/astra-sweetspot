import retry from './vendor/retry/index.cjs';

const networkErrorMsgs = new Set([
	'Failed to fetch', // Chrome
	'NetworkError when attempting to fetch resource.', // Firefox
	'The Internet connection appears to be offline.', // Safari
	'Network request failed', // `cross-fetch`
	'fetch failed', // Undici (Node.js)
]);

export class AbortError extends Error {
	constructor(message) {
		super();

		if (message instanceof Error) {
			this.originalError = message;
			({message} = message);
		} else {
			this.originalError = new Error(message);
			this.originalError.stack = this.stack;
		}

		this.name = 'AbortError';
		this.message = message;
	}
}

const decorateErrorWithCounts = (error, attemptNumber, options) => {
	// Minus 1 from attemptNumber because the first attempt does not count as a retry
	const retriesLeft = options.retries - (attemptNumber - 1);

	error.attemptNumber = attemptNumber;
	error.retriesLeft = retriesLeft;
	return error;
};

const isNetworkError = errorMessage => networkErrorMsgs.has(errorMessage);

const getDOMException = errorMessage => globalThis.DOMException === undefined
	? new Error(errorMessage)
	: new DOMException(errorMessage);

export default async function pRetry(input, options) {
	return new Promise((resolve, reject) => {
		options = {
			onFailedAttempt() {},
			retries: 10,
			...options,
		};

		const operation = retry.operation(options);
		const signal = options.signal;
		let abortHandler;
		let isSettled = false;
		const cleanup = () => {
			if (abortHandler) {
				signal.removeEventListener('abort', abortHandler);
				abortHandler = undefined;
			}
		};
		const resolveWithCleanup = value => {
			isSettled = true;
			cleanup();
			resolve(value);
		};
		const rejectWithCleanup = error => {
			isSettled = true;
			cleanup();
			reject(error);
		};

		operation.attempt(async attemptNumber => {
			try {
				resolveWithCleanup(await input(attemptNumber));
			} catch (error) {
				if (!(error instanceof Error)) {
					rejectWithCleanup(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
					return;
				}

				if (error instanceof AbortError) {
					operation.stop();
					rejectWithCleanup(error.originalError);
				} else if (error instanceof TypeError && !isNetworkError(error.message)) {
					operation.stop();
					rejectWithCleanup(error);
				} else {
					decorateErrorWithCounts(error, attemptNumber, options);

					try {
						await options.onFailedAttempt(error);
					} catch (error) {
						rejectWithCleanup(error);
						return;
					}

					if (!operation.retry(error)) {
						rejectWithCleanup(operation.mainError());
					}
				}
			}
		});

		if (signal && !signal.aborted && !isSettled) {
			abortHandler = () => {
				operation.stop();
				const reason = signal.reason === undefined
					? getDOMException('The operation was aborted.')
					: signal.reason;
				rejectWithCleanup(reason instanceof Error ? reason : getDOMException(reason));
			};
			signal.addEventListener('abort', abortHandler, {
				once: true,
			});
		}
	});
}
