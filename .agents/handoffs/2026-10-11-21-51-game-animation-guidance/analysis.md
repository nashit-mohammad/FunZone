# Technical analysis

## Repository evidence

- Stack and relevant conventions: Root `AGENTS.md` is the canonical guidance for repository agents; its `Shared quality rules` section applies across tasks.
- Relevant files/modules: `AGENTS.md`, under `### Shared quality rules`.

## Requirements mapping

| Acceptance criterion | Technical requirement | Validation approach |
|---|---|---|
| Copilot gets reusable smooth/consistent game animation guidance. | Add one concise shared rule about motion quality and cross-game consistency. | Static review of the new root guidance. |
| Motion matches behavior. | Require movement/feedback to communicate real game state and interaction behavior; avoid misleading decoration. | Confirm instruction explicitly ties animation to actual game behavior/state. |
| Preserve accessibility and avoid poor-fit animation. | Keep controls responsive, honor reduced motion, and animate only where it naturally communicates behavior. | Confirm instruction includes those caveats. |

## Proposed design

Add a single bullet under `### Shared quality rules` in root `AGENTS.md`. This is the canonical shared location, avoids duplicating instruction across game/workflow docs, and applies to future game changes without changing current game behavior.

## Implementation tasks

1. Add concise animation guidance to the shared quality rules.
2. Review the diff and run editor diagnostics if available; do not run tests for this documentation-only change unless explicitly requested.

## Data, interfaces, and dependencies

- None.

## Risks, assumptions, and open questions

- Interpret "match behaviours across all games" as a consistent motion language across games while requiring each animation to match its own mechanic.
- None requiring user input.

## Developer handoff

- Next owner: Developer
- Ready when: The canonical guidance location is identified and the acceptance criteria are mapped to one focused instruction bullet.
