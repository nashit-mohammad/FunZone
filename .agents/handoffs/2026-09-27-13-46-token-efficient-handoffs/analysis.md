# Technical analysis

## Repository evidence

- Root `AGENTS.md` contains the shared workflow and all persona definitions.
- Shared transitions require artifact links, ready summary, risks, and next action, but do not bound the handoff size or discourage rereading conversation/history.
- Analyser and Developer instructions say to read `AGENTS.md`, and Tester reads all prior artifacts; this can encourage redundant loading in addition to instructions already in context.
- `.github/codex/prompts/daily-game.md` explicitly has agents proceed through stages but lacks an instruction to avoid repeating/reloading context.

## Requirements mapping

| Acceptance criterion | Technical requirement | Validation approach |
|---|---|---|
| Concise artifact-first handoffs | Define the small content set for transition notes, avoid copying conversation or full prior analysis | Static review of shared workflow section |
| Minimal stage inputs | Specify only relevant artifacts for each persona and allow reopening when needed | Static review of persona read lists |
| Avoid unnecessary rereads/repetition | Treat artifacts as the source of truth; history is available but not presumed to be required | Static review of shared instructions and persona sections |
| Daily-game aligned | Add concise handoff guidance to daily-game prompt | Static review of prompt |

## Proposed design

Add a shared context-efficiency subsection that makes durable artifacts the handoff source of truth, limits transition notes to recipient artifact paths, missing criteria/context, concrete risks/questions, and next action, and says not to copy long conversation or repeat analysis. Rework persona read lists to stage-specific minimal artifacts without forbidding reopening upstream artifacts. Keep artifact templates/status history intact.

## Implementation tasks

1. Add concise, artifact-first handoff rules to the shared workflow in `AGENTS.md`.
2. Refine each persona's minimum read inputs and concise output expectations.
3. Align daily-game prompt with same rules.
4. Static review for internal consistency and diff hygiene; no tests.

## Data, interfaces, and dependencies

- No runtime interfaces or dependencies change.

## Risks, assumptions, and open questions

- Same-session context cannot technically be hidden from the next persona; instructions can prevent unnecessary reuse and rereading, not guarantee context isolation.
- Preserve enough rationale and evidence in durable artifacts so concise handoffs do not require retransmission.

## Developer handoff

- Next owner: Developer
- Ready when: Inputs, outputs, and transition note limits are defined while retaining permission to consult upstream records as needed.
