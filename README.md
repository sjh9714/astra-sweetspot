# Astra Sweetspot

**Which Astra reasoning effort is worth it? Start with the patches, not a recommendation.**

Small, reproducible Astra vs Sol experiments on real public bugs. Independent regression checks, wall time, tokens, and every candidate patch. Built with Codex after reading users' [effort questions](https://x.com/nummanali/status/2096012041727144205) and [Sol vs Astra questions](https://www.reddit.com/r/codex/comments/1w7qwt3/sol_v_astra/).

[**See the results →**](https://sjh9714.github.io/astra-sweetspot/) · [Method](docs/METHODOLOGY.md) · [Suggest a real task](https://github.com/sjh9714/astra-sweetspot/issues/new?template=real-task.yml)

```sh
npx astra-sweetspot
```

That command shows bundled results. It makes **no model call** and needs no API key. To install the command permanently: `npm install -g astra-sweetspot`.

## Launch-day pilot

<!-- RESULTS:START -->
**All 8 runs passed their focused regression checks.** On these two tasks, higher Astra effort took more time with the same check score. This does not establish comparative reliability or a universal best effort.

| Task | Model / effort | Checks | Seconds | Input | Cached subset | Output |
|---|---|---:|---:|---:|---:|---:|
| [abort-delay](results/receipts/2026-09-05T06-24-04-221Z-sol-medium-48beb0) | Sol medium | 7/7 | 130.8 | 124,035 | 106,368 | 4,774 |
| [abort-delay](results/receipts/2026-09-05T06-27-10-716Z-astra-low-432933) | Astra low | 7/7 | 78.2 | 73,820 | 64,256 | 1,822 |
| [abort-delay](results/receipts/2026-09-05T06-28-29-078Z-astra-medium-54cf2a) | Astra medium | 7/7 | 101.4 | 103,401 | 93,056 | 2,284 |
| [abort-delay](results/receipts/2026-09-05T06-30-10-623Z-astra-high-b8bcf8) | Astra high | 7/7 | 163.0 | 127,331 | 113,280 | 3,865 |
| [abort-cleanup](results/receipts/2026-09-05T06-32-53-812Z-sol-medium-fff3ad) | Sol medium | 8/8 | 129.4 | 104,643 | 69,120 | 5,425 |
| [abort-cleanup](results/receipts/2026-09-05T06-35-03-397Z-astra-low-73f206) | Astra low | 8/8 | 76.2 | 83,831 | 74,624 | 1,501 |
| [abort-cleanup](results/receipts/2026-09-05T06-36-19-738Z-astra-medium-514d9c) | Astra medium | 8/8 | 77.3 | 83,126 | 62,208 | 1,536 |
| [abort-cleanup](results/receipts/2026-09-05T06-37-37-177Z-astra-high-5ea5ae) | Astra high | 8/8 | 123.2 | 102,322 | 91,520 | 2,920 |
<!-- RESULTS:END -->

Two historical [p-retry bugs](docs/METHODOLOGY.md#tasks-and-grading), four model/effort settings, **one attempt per condition**. Same starting source and prompt within each task. Both are small tasks from one library and may be in training data. This is not a held-out benchmark or a model leaderboard.

[Supplementary upstream runtime checks](research/upstream-2026-09-05): all four settings match their starting code's results—63/63 on one task, 12/13 on the other. The one failure also occurs with the known upstream fix; its log and explanation are included. No model trial was rerun.

**Input includes cached input. Tokens are not subscription quota or money paid.** Time includes Codex startup and its own tests. The table uses requested model identifiers; the CLI may not report the served identifier. Failed and timed-out trials stay in the data.

## Reproduce one trial

```sh
npx astra-sweetspot run abort-delay --model astra --effort medium
```

Requires Node 20+, Git, Codex CLI 0.153.0+, an existing Codex login, and access to the requested model. **`run` invokes a model and consumes your Codex usage.** It copies the public fixture into a fresh local workspace and saves a receipt, patch, and private logs under `~/.astra-sweetspot/runs/`. Nothing is uploaded automatically. Your current project is not used or changed.

Cases: `abort-delay`, `abort-cleanup`. Models: `astra`, `sol`. Efforts: `low`, `medium`, `high`. Default timeout: 180 seconds; use `--timeout 300` to change it. The published pilot used 180 seconds throughout.

```sh
# Inspect the bundled data as JSON
npx astra-sweetspot report --json

# Grade any candidate against the same pristine external checks, without inference
npx astra-sweetspot grade abort-delay /path/to/index.js
```

## What makes a result inspectable?

- The grader fails the original bug and passes the known upstream fix. `npm test` verifies this.
- Only the candidate's implementation is copied into a pristine fixture. Editing local tests does not improve its grade.
- Every receipt includes source, prompt, grader, candidate, and patch hashes, plus environment and execution status.
- The prompts, vendored fixtures, grader, candidate patches, and limitations are public. Raw private logs are not uploaded.

[Read the method and limitations](docs/METHODOLOGY.md). Passing these focused checks is not equivalent to passing the entire upstream test suite or proving a production-ready patch.

## What should we try next?

Suggest a **real task where your current model or effort struggles**, with public starting code and a way to check success. Cross-language work, an unfamiliar repository, or a failing integration test would broaden this small sample. [Open a task suggestion](https://github.com/sjh9714/astra-sweetspot/issues/new?template=real-task.yml).

If these receipts help you decide what to try, **star the repository** to follow the next experiment. Stars indicate interest; they do not prove the tool is being used.

Development: no runtime dependencies or install scripts. Run `npm test` and `npm run site`. Model inference is intentionally excluded from CI. Automated checks cover Node 20/22 on Linux and Node 22 on Windows; the published live model trials ran on macOS only.

MIT. [Third-party licenses](THIRD_PARTY.md). Independent of OpenAI and p-retry's maintainers.
