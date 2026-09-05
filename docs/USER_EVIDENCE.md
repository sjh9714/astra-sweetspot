# Why this experiment exists

**Observed September 5, 2026, 05:30–05:59 UTC**, using the actual Reddit posts and authenticated Chrome views of X posts and replies, plus GitHub repository metadata. This is a small qualitative sample of public statements, not authenticated account telemetry or a representative survey.

| User evidence | What it supports | What it does not establish |
|---|---|---|
| [Numman Ali asks for Astra's reasoning sweet spot](https://x.com/nummanali/status/2096012041727144205); 28 likes and about 19K views at observation | People are trying to choose an effort. Replies propose conflicting settings and ask about plan and harness. | Which effort is optimal, or why the reported quota was consumed |
| [Friendly-Gur-3289 asks why use Astra when Sol already works](https://www.reddit.com/r/codex/comments/1w7qwt3/sol_v_astra/) | A model comparison needs an existing-workflow baseline | Demand for an automatic model router |
| [Technical-Garbage484 asks about ultra planning and medium implementation](https://www.reddit.com/r/codex/comments/1w7rjth/astra/) | Effort choice is tied to actual development work | A fixed universal workflow |
| [Puspendra007 asks for concrete Astra use cases](https://www.reddit.com/r/codex/comments/1w7ptfy/id_love_to_hear_your_thoughts_on_astra_but/) | Inspectable work examples can help evaluate a model switch | That these two JavaScript bugs are representative |
| [destinyawait reports returning to Sol medium because of limits](https://x.com/destinyawait/status/2096108672816669038) | A reported behavioral response, beyond hypothetical complaints | Independently verified savings or willingness to install a tool |
| [Own-Professor-6157 reports unusually fast usage with Ghidra MCP](https://www.reddit.com/r/codex/comments/1w7qqau/astra_absolutely_destroys_usage_for_mcp_it_seems/) | Some users need explanations tied to their particular workflow | That token counts from a coding pilot explain their MCP problem |

There is counterevidence to a simple “Astra wastes usage” story: the [launch thread](https://www.reddit.com/r/codex/comments/1w7j5jf/astra_release_megathread/) contains both favorable and unfavorable reports. [Another user](https://www.reddit.com/r/codex/comments/1w7pwow/astra_is_a_great_step_up_from_sol_56/) says Astra is good enough to expand Codex from review into implementation. We do not select only negative reports.

## Existing alternatives

- [awesome-gpt-6-astra](https://github.com/Anil-matcha/awesome-gpt-6-astra): an existing launch resource collection. Creating another “awesome” list would not answer these task-level questions.
- [astra-room-test](https://github.com/SushaanthSrinivasan/astra-room-test): already compares Astra efforts on a Blender room. Reasoning comparisons are not an empty category. Sweetspot uses coding regressions, adds Sol, and makes the result independently checkable.
- [astra-advisor](https://github.com/DannyMac180/astra-advisor): an existing model orchestration plugin. A new fixed multi-model workflow would need stronger evidence than general quota complaints.
- [codex-usage-tracker](https://github.com/douglasmonsky/codex-usage-tracker): existing session usage analysis. This experiment does not replace it or try to attribute subscription quota.
- [OpenBench](https://github.com/minghinmatthewlam/openbench/blob/db193457a3d9128cd4d01fd839c2a890c186c9ac/docs/private-evals.md): already provides private-codebase evaluation with task suites, runs, and receipts. Its documented workflow was reviewed on September 5; we did not run its live benchmarks. Generic private-repository comparisons are not an unserved gap.

## What remains a hypothesis

The evidence supports questions about model/effort choice and concrete examples. **It does not yet validate adoption of this CLI.** The first deliverable is a public, reproducible data point. The CLI makes inspection and reproduction easier; its existence is not proof that users need another tool.

An [open question to the original X poster](https://x.com/jinhyuk9714/status/2096111806096027754) asked what they were trying to finish and what workaround they used. At 05:59 UTC it had no reply. No user interview or installation commitment is claimed.

Distribution will follow the actual question: share the measured result in a relevant public discussion, identify the author's involvement, and invite a concrete next task. No bulk replies, paid stars, star exchanges, or fabricated testimonials. GitHub stars and views indicate interest; independently submitted task reproductions or repeat use would provide stronger evidence.

## Launch follow-up — 06:56 UTC

The eight-run pilot is published. A [public X result post](https://x.com/jinhyuk9714/status/2096127446303252510) and a [follow-up under the original question](https://x.com/jinhyuk9714/status/2096128197213692305) link the actual data and state its one-attempt and quota limits. The existing [awesome collection proposal](https://github.com/Anil-matcha/awesome-gpt-6-astra/pull/2) was updated to this experiment; no duplicate submission was opened.

A new [Reddit model-selection question](https://www.reddit.com/r/OpenAI/comments/1w7t4v7/model_selection_whats_your_choice_for_what/) independently asks which tasks fit which model and whether Astra Light is equivalent to Sol High. Our [reply](https://www.reddit.com/r/OpenAI/comments/1w7t4v7/comment/p7xgggs/) gives the narrow coding data, explicitly says it cannot establish that ChatGPT equivalence, and asks for the user's actual tasks. It contains no project link. That user's answer is pending.

At this checkpoint the new repository has **0 stars, 0 forks, and 0 issues**. Publication, our own comments, npm smoke-test downloads, and our page views are not independent adoption. No user-requested task reproduction has arrived yet.

## Follow-up — 07:51 UTC

The [r/coolgithubprojects introduction](https://www.reddit.com/r/coolgithubprojects/comments/1w7th7h/astra_sweetspot_onecommand_astra_vs_sol/) reached 108 displayed views, with no comments and a score of 1 that includes the author's automatic vote. The X result post displayed 5 views and no replies or likes. The repository still had 0 stars and 0 forks. These are early, limited observations; views are not unique people or installations, and a lack of response does not by itself identify the problem.

The project was also shared in the explicitly invited [r/AI_Agents weekly project-display thread](https://www.reddit.com/r/AI_Agents/comments/1w5ehca/comment/p7xj30t/), with the measured results, author disclosure, limitations, and a request for a concrete different task. No independent task suggestion has been received at this checkpoint.

Further [model-selection replies](https://www.reddit.com/r/OpenAI/comments/1w7t4v7/model_selection_whats_your_choice_for_what/) include users considering a switch from Sol to Astra medium/high, as well as claims that lower Astra efforts make Sol unnecessary. They remain personal reports and unverified generalizations. The original poster has not yet supplied a task in response to our question. We will not treat those replies as support for a universal model ranking.

Separately, [additional upstream runtime checks](../research/upstream-2026-09-05) found no newly failing tests relative to the starting code across the eight existing patches. This improves the inspectability of the experiment; it is not new evidence of product demand.

## Follow-up — 09:10 UTC

The r/coolgithubprojects introduction now displayed 198 views and no comments. GitHub still had 0 stars at the 08:59 UTC check. A first external reaction appeared on X: the author of an effort-selection question, Yerkebulan Rakhimov, liked [our reply with the pilot results](https://x.com/jinhyuk9714/status/2096145078809215050). The notification and original reply were checked in Chrome. This is an interest signal; no installation, reproduction, or GitHub star is established by it.

A separate public maintainer request, [sungjunlee/skills #123](https://github.com/sungjunlee/skills/issues/123), asks for Astra low/medium versus Sol medium, at least three attempts per fixture, several task categories, and separate quality, token, time, and cost evidence. It explicitly defers revisiting the evaluation until October 5 or later. This is concrete demand for broader evaluation, not an endorsement of this CLI. Our two-task, one-attempt pilot does not satisfy those acceptance criteria.

We [shared the working CLI telemetry path and an actual receipt](https://github.com/sungjunlee/skills/issues/123#issuecomment-5550763384), disclosing authorship and the missing repetition, served-model identity, reasoning-token breakdown, and quota measurement. No reply from the maintainer has been received at this checkpoint. The next useful expansion needs a task and success criterion that broaden the evidence, rather than another similar example from the same library.

## Follow-up — original usage records and a different failure report

At 09:48 UTC, inspection of the original pilot logs found that the CLI had provided reasoning and cache-write counters in all eight runs. Their omission was in our v0.1.0 collector. The [v0.1.1 correction](METHODOLOGY.md#usage-field-correction) restores those reported values with the original usage events and their hashes. No trial was rerun, and this does not supply the missing quota attribution or repeated evaluation.

Separately, [Shai Mishali reports Astra identifying a problem without acting on it](https://x.com/freak4pc/status/2096125712243560491), along with dissatisfaction with speed at high effort and capability at medium. This is a public developer report, not an independently reproduced failure. Our [reply](https://x.com/jinhyuk9714/status/2096168666748661766) asks for a public reproduction and discloses that the two existing JavaScript tasks do not capture that behavior. No reproduction has been supplied at this checkpoint.
