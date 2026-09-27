# Request

## User's request

i daily games md files, make sure this also uses the normal handover structure and locations

## Acceptance criteria

- [ ] Daily game automation creates its work record at `.agents/handoffs/<timestamp>-<short-slug>/` using the normal templates and state/history structure.
- [ ] Daily-game prompt and setup documentation accurately describe that standard location and lifecycle.
- [ ] No conflicting custom handoff location/environment convention remains.

## Scope and constraints

- Keep the hosted daily-game workflow behavior, PR branch behavior, and artifact retention unchanged unless required to make handoff path standard.
- Do not execute application tests; user requested workflow/documentation alignment.

## Work item metadata

- ID: daily-game-handoff-path
- Created: 2026-09-27T13:22:00-04:00
