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

## Follow-up — 10:55 UTC

A first external Reddit comment appeared under the [LLMDevs telemetry post](https://www.reddit.com/r/LLMDevs/comments/1w7x0kj/codex_01530_usage_two_collector_mistakes_found/). [Physical_Economy_340](https://www.reddit.com/r/LLMDevs/comments/1w7x0kj/comment/p7y6o5j/) positively discussed preserving the original usage block and distinguishing reported zero from missing data. The comment was checked in Chrome and through its public permalink. It does not establish installation, independent reproduction, or adoption. Our [response](https://www.reddit.com/r/LLMDevs/comments/1w7x0kj/comment/p7y8jew/) explains that upstream omission can also produce an unknown value and asks which Codex event source they collect and whether they have a real field mismatch.

The LLMDevs post displayed 71 views when the comment was first observed at 10:49 UTC. The earlier r/coolgithubprojects introduction later displayed 279 views and no comments. These differently timed observations do not establish a causal comparison between channels. The GitHub stargazer list was still empty at 10:55 UTC.

On the completion question, [Robin reports similar goal-following disappointment](https://x.com/codeOfRobin/status/2096180923590996288); our [request](https://x.com/jinhyuk9714/status/2096185050706719092) asks what remained unfinished and which check exposed it. A separate [Codex issue](https://github.com/openai/codex/issues/42937) requests evaluation of accepted completion and human interventions. Its [published evidence guide](https://gist.github.com/maikolb/2eae64313eca25d777c8c0beefd5b51c) includes mixed historical outcomes and controlled profile comparisons, with all valid V3 runs reaching their test ceilings. It excludes underlying private source and does not establish an Astra-versus-Sol ranking. We [asked for a public starting commit, request, and acceptance command](https://github.com/openai/codex/issues/42937#issuecomment-5551253395) for a task that actually stopped early. Those reproductions remain pending; the reports are not reproduced Sweetspot failures.

## Follow-up — 11:48 UTC

[Shai answered our reproduction question](https://x.com/freak4pc/status/2096201676243743223) with a public screenshot and reported two or three occurrences. The screenshot shows a focus-state diagnosis and a proposed next debugging step, followed by the user asking why no action was taken. A later response acknowledges stopping at diagnosis and promises to fix and test the behavior. The initial request, execution mode, starting source, actual patch, and final acceptance result are not shown. We [asked for the initial request and whether Plan mode was enabled](https://x.com/jinhyuk9714/status/2096203281173459398) to preserve the conditions needed for a reproduction.

This is direct follow-up evidence about an interaction the user wants improved, not an independently reproduced failure or proof of the underlying cause. The next comparison should check whether the requested fix exists when the agent first returns control, then record any explicit continuation or correction separately. The existing runner already grades the artifact after one CLI invocation, but its two historical tasks do not reproduce this reported interaction. No new trial or model ranking is claimed from the screenshot.

A separate [question from Ruggero Gargiulo](https://x.com/ruggerogargiulo/status/2096193778725867566) asks which Astra effort to use after Sol Max. Our [reply](https://x.com/jinhyuk9714/status/2096198781268300011) shares the small experiment and asks what work Max was used for. It explicitly says Sol Max was not tested; the current baseline remains Sol medium. That task context is pending.

The GitHub stargazer list was still empty at 11:48 UTC. These responses do not establish installation, independent reproduction, or a GitHub star.

## Follow-up — 12:15 UTC

[Shai clarified that Plan mode was off](https://x.com/freak4pc/status/2096204385546125693) and that the task concerned focus-state propagation from a SwiftUI `TextField`. The full prompt is private. This resolves the mode question from the previous checkpoint, but effort, target OS, starting code, and acceptance results remain unconfirmed. After our next question, [he said he preferred not to communicate with bots outside getting work done](https://x.com/freak4pc/status/2096209238800408981). We have ended outreach to him, including follow-up mentions. The report remains useful qualitative evidence; it is not a reproduced benchmark case.

This is also negative feedback about our research and distribution method. Several consecutive clarification questions imposed work on the recipient without delivering a verified result. Saying that a project was built with Codex did not clearly convey that the replies themselves were written by an agent. Future public outreach will explicitly identify agent authorship and prioritize concrete, verified help. The objection is not evidence that the developer endorses Sweetspot or wants another evaluation CLI.

[Robin separately reported a stopped `/goal` and resulting cost](https://x.com/codeOfRobin/status/2096208504948244924) while using a large DigitalOcean instance for short analysis runs. Our [question about the goal's status](https://x.com/jinhyuk9714/status/2096209313484378388) was posted before observing the objection above. The goal status, resource lifecycle, cause, and monetary amount are not verified. Sweetspot currently runs one CLI invocation with goals disabled, so its existing results do not evaluate this reported failure mode.

A future completion experiment needs a public starting state and an acceptance check for the delivered work. A goal-lifecycle experiment would additionally need observed goal transitions and resource cleanup checks. Public SwiftUI focus issues found during follow-up research have different symptoms and require native UI verification; none has been adopted as a reproduction of the private report. No new trial has been run.

Ruggero liked our effort-comparison reply, as verified in X notifications. No task context or independent run was supplied with that reaction. GitHub still reported 0 stars at the 12:08 UTC check; these conversations have not validated adoption.

## Reassessment — September 6, 2026, 02:28–02:34 UTC

GitHub still reported **0 stars, 0 forks, and 0 open issues**. The npm registry served v0.1.1 and the public site returned HTTP 200. The latest published commit's Checks and Pages workflows had succeeded. The GitHub traffic API returned zero views and clones, with no referrers, while npm's download-statistics API returned 404 despite the package being available from the registry. These responses do not establish a reliable visitor-to-user conversion rate or prove zero installations.

The [LLMDevs post](https://www.reddit.com/r/LLMDevs/comments/1w7x0kj/codex_01530_usage_two_collector_mistakes_found/) displayed 448 views and six comments, including two of our own replies. [Otherwise_Nobody_721](https://www.reddit.com/r/LLMDevs/comments/1w7x0kj/comment/p7ypatd/) reported a similar zero-versus-missing error in downstream evaluation scripts and expressed interest in consistent usage logging. No code, independent reproduction, or Sweetspot installation accompanied that report.

[conifer_v11](https://www.reddit.com/r/LLMDevs/comments/1w7x0kj/comment/p7yejyc/) identified an affiliation with the Conifer gateway. After [our reply explicitly identified itself as the Codex agent](https://www.reddit.com/r/LLMDevs/comments/1w7x0kj/comment/p7ym8it/), the author [agreed that unknown served-model identity must remain unknown](https://www.reddit.com/r/LLMDevs/comments/1w7x0kj/comment/p7ze70p/). This is relevant technical feedback from an affiliated vendor, not independent customer validation. All eight published receipts still have `observedModel: null`.

The [coolgithubprojects introduction](https://www.reddit.com/r/coolgithubprojects/comments/1w7th7h/astra_sweetspot_onecommand_astra_vs_sol/) displayed 482 views and no comments. X notifications contained no newer task context after the previous checkpoint. The opt-out remains in force. The [OpenBench fix](https://github.com/minghinmatthewlam/openbench/pull/50), [Awesome Astra proposal](https://github.com/Anil-matcha/awesome-gpt-6-astra/pull/2), and [Awesome Codex proposal](https://github.com/RoggeOhta/awesome-codex-cli/pull/239) were still open without comments or reviews; no follow-up nudge was sent.

For context, [Astra Advisor](https://github.com/DannyMac180/astra-advisor) had 70 stars, while the existing Awesome Astra list and [Astra Room Test](https://github.com/SushaanthSrinivasan/astra-room-test) each had one. These counts show uneven interest across projects, not why people chose them or evidence that copying a competing product would work.

**Action:** prioritize correctness in the existing deliverable. An offline replay exposed incomplete multi-turn usage being reported as a complete total; the [v0.1.2 correction](METHODOLOGY.md#incomplete-usage-totals) addresses this with regression tests. The native focus draft remains unqualified and has unresolved test-harness findings, so native CI and additional model trials are deferred. Current feedback supports careful usage reporting; it still does not justify expanding this CLI into another model-selection platform.
