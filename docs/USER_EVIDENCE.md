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

## What remains a hypothesis

The evidence supports questions about model/effort choice and concrete examples. **It does not yet validate adoption of this CLI.** The first deliverable is a public, reproducible data point. The CLI makes inspection and reproduction easier; its existence is not proof that users need another tool.

An [open question to the original X poster](https://x.com/jinhyuk9714/status/2096111806096027754) asked what they were trying to finish and what workaround they used. At 05:59 UTC it had no reply. No user interview or installation commitment is claimed.

Distribution will follow the actual question: share the measured result in a relevant public discussion, identify the author's involvement, and invite a concrete next task. No bulk replies, paid stars, star exchanges, or fabricated testimonials. GitHub stars and views indicate interest; independently submitted task reproductions or repeat use would provide stronger evidence.

## Launch follow-up — 06:56 UTC

The eight-run pilot is published. A [public X result post](https://x.com/jinhyuk9714/status/2096127446303252510) and a [follow-up under the original question](https://x.com/jinhyuk9714/status/2096128197213692305) link the actual data and state its one-attempt and quota limits. The existing [awesome collection proposal](https://github.com/Anil-matcha/awesome-gpt-6-astra/pull/2) was updated to this experiment; no duplicate submission was opened.

A new [Reddit model-selection question](https://www.reddit.com/r/OpenAI/comments/1w7t4v7/model_selection_whats_your_choice_for_what/) independently asks which tasks fit which model and whether Astra Light is equivalent to Sol High. Our [reply](https://www.reddit.com/r/OpenAI/comments/1w7t4v7/comment/p7xgggs/) gives the narrow coding data, explicitly says it cannot establish that ChatGPT equivalence, and asks for the user's actual tasks. It contains no project link. That user's answer is pending.

At this checkpoint the new repository has **0 stars, 0 forks, and 0 issues**. Publication, our own comments, npm smoke-test downloads, and our page views are not independent adoption. No user-requested task reproduction has arrived yet.
