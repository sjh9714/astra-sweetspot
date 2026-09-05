# Supplementary upstream runtime checks

**Checked September 5, 2026, starting at 07:45 UTC.** The eight existing pilot patches introduced no additional failures in the unchanged upstream runtime tests under this environment. This is an extra check after the pilot, not a new set of model trials or a replacement for their original grades.

| Implementation | `abort-delay` | `abort-cleanup` |
|---|---:|---:|
| Starting code | 63/63 | 12/13 |
| Known upstream fix | 63/63 | 12/13 |
| Sol medium pilot patch | 63/63 | 12/13 |
| Astra low pilot patch | 63/63 | 12/13 |
| Astra medium pilot patch | 63/63 | 12/13 |
| Astra high pilot patch | 63/63 | 12/13 |

Every `abort-cleanup` run failed the same test: **`aborts with an AbortSignal`**. That historical test expects the default message `The operation was aborted.`; Node 22.23.2 produces `This operation was aborted`. The failure also occurs with the starting code and the known upstream fix. We retained it, without editing the assertion or counting the suite as fully passing.

The baseline passing 63/63 on `abort-delay` also shows why the original targeted regression checks matter: these older runtime tests do not detect that task's bug.

## Sources and environment

The included `test.js`, `package.json`, and `license` files are unchanged copies from these exact starting commits:

- [`abort-delay`: p-retry 6ac326b](https://github.com/sindresorhus/p-retry/tree/6ac326b188834f4af5a54cedc114f67f0f510613)
- [`abort-cleanup`: p-retry 285fdc3](https://github.com/sindresorhus/p-retry/tree/285fdc3f890a6f3d199b3d4abb0bad7c172c2233)

The lock files were generated for this supplementary check on September 5, 2026; they are **not historical upstream lock files**. Installation used `npm install --ignore-scripts --no-audit --no-fund`. The original package manifests include tools beyond AVA, but the command executed was only `./node_modules/.bin/ava test.js --tap`. **XO lint and tsd type tests were not run.** This is not the full upstream `npm test` command.

| Component | `abort-delay` | `abort-cleanup` |
|---|---|---|
| Platform | macOS arm64 | macOS arm64 |
| Node | 22.23.2 | 22.23.2 |
| npm | 10.9.8 | 10.9.8 |
| AVA | 6.4.1 | 4.3.3 |
| delay test helper | 6.0.0 | 5.0.0 |
| execa | 9.6.1 | 5.1.1 |
| Implementation dependency | vendored is-network-error 1.3.0 | vendored retry 0.13.1 |

All six implementations within each case use the same vendored dependency and the same unchanged upstream test file. The baseline and known fix retain the import normalization used by the pilot. Installed bare dependencies are not substituted for those vendor imports. Candidate files are byte-for-byte identical to the published pilot files.

[The JSON summary](results/summary.json) records candidate, test, and lock-file hashes, exit codes, and individual TAP log paths. Its `seconds` field is runtime-test duration, **not model execution time**. The original model receipts and their measurements are unchanged. These tests were executed after seeing the patches; no held-out evaluation claim is made.

## Reproduce a runtime check

From the repository root, with Node 22.23.2 and npm 10.9.8, this example tests the existing Astra-low `abort-delay` patch in a new temporary directory:

```sh
audit_dir="$(mktemp -d)"
cp research/upstream-2026-09-05/abort-delay/package*.json "$audit_dir/"
cp research/upstream-2026-09-05/abort-delay/test.js "$audit_dir/"
cp -R fixtures/abort-delay/vendor "$audit_dir/vendor"
cp results/receipts/2026-09-05T06-27-10-716Z-astra-low-432933/index.js "$audit_dir/index.js"
(
  cd "$audit_dir" &&
  npm ci --ignore-scripts --no-audit --no-fund &&
  ./node_modules/.bin/ava test.js --tap
)
```

This installs development dependencies in that temporary directory and makes no model call. To check another row, copy its candidate file instead. For the controls, use `fixtures/<case>/index.js` or `test/known-fixes/<case>/index.js`. For `abort-cleanup`, use its manifest, lock file, test, vendor directory, and candidate together. Its documented 12/13 result has a nonzero exit code.

These additional checks provide evidence about regressions in this environment. They do not establish production readiness, comparative reliability, or how either model will behave on a different task.
