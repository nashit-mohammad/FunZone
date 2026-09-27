# Technical analysis

## Repository evidence

- The root `AGENTS.md` only included `RTK.md`, so it did not require use of `.agents/README.md`.
- `.agents/README.md` and `.agents/roles/orchestrator.md` required separate Cline/role sessions, which this context cannot start.
- Role prompts did not consistently require automatic same-session continuation or history rows.
- Tester instructions implied running tests even when the user had not asked for validation.

## Requirements mapping

| Acceptance criterion | Technical requirement | Validation approach |
|---|---|---|
| Automatic handoffs | Require records at intake for file-changing or multi-step repo tasks | Inspect root and workflow instructions |
| Same-session handoffs | Continue role stages sequentially when separate role sessions are unavailable | Inspect README and each role prompt |
| Honest session reporting | Forbid claims that another role session ran unless it did | Inspect orchestration and workflow instructions |
| Traceable state and testing | Record each transition and preserve no-test/no-PASS rule absent user request | Inspect status template and Tester prompt |

## Proposed design

Make root `AGENTS.md` invoke `.agents/README.md` for relevant work. Define same-session role stages as the default and external role sessions only when explicitly directed and supported. Require a timestamped handoff folder before changes and a status history row per transition. Align all role prompts and the status template.

## Implementation tasks

1. Add the workflow requirement to root agent instructions.
2. Update workflow overview and Orchestrator prompt for automatic same-session transitions.
3. Align Analyser, Developer, Tester, and status template language.
4. Review edited instructions for contradictions.

## Data, interfaces, and dependencies

No runtime interfaces or dependencies; documentation only.

## Risks, assumptions, and open questions

- Assumption: the workflow should apply to repository tasks that modify files or require multiple steps, not answer-only conversation.
- Test execution stays subject to the user's request for testing/validation.

## Developer handoff

- Next owner: Developer
- Ready when: The instructions are clear and do not depend on launching unavailable Cline sessions.
