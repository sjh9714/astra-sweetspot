# Vendored sources

All included third-party source is MIT licensed. Copyright notices and licenses are retained alongside it. Vendoring lets the two public tasks run without fetching dependencies or executing install scripts.

- **p-retry**, Sindre Sorhus: `fixtures/*/index.js` and `test/known-fixes/*/index.js`. Exact starting and fix commits are listed in [methodology](docs/METHODOLOGY.md). The sole adaptation is changing the bare dependency import to the local vendor path. License: `fixtures/*/LICENSE`.
- **is-network-error 1.3.0**, Sindre Sorhus: `fixtures/abort-delay/vendor/is-network-error.js` and its `.LICENSE`, from the [npm tarball](https://registry.npmjs.org/is-network-error/-/is-network-error-1.3.0.tgz). Tarball SHA-1: `2ce62cbca444abd506f8a900f39d20b898d37512`.
- **retry 0.13.1**, Tim Koschützki and contributors: `fixtures/abort-cleanup/vendor/retry/`, from the [npm tarball](https://registry.npmjs.org/retry/-/retry-0.13.1.tgz). Tarball SHA-1: `185b1587acf67919d63b357349e03537b2484658`. `index.js` is named `index.cjs` and a local `{"type":"commonjs"}` package marker is added; source content is unchanged.

This project is independent and is not affiliated with OpenAI or the upstream maintainers. Upstream bugs were already fixed; this project does not imply those bugs affect current p-retry versions.
