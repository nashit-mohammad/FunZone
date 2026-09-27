# Request

## User's request

lets do it

Context: I want to save tokens. Update the persona handoffs so each stage treats the necessary handoff artifacts as its source of truth, passes only those artifacts, acceptance criteria, and specific risks/open questions, avoids repeating full analysis or conversation history, and reopens earlier artifacts only when needed.

## Acceptance criteria

- [ ] `AGENTS.md` instructs concise, artifact-first handoffs between personas.
- [ ] Persona input lists and handoff artifacts are minimal and stage-specific.
- [ ] Same-session conversation history is not unnecessarily reread or repeated; earlier artifacts may be reopened when needed.
- [ ] Daily-game prompt follows the same token-efficient handoff rule.

## Scope and constraints

- Keep all persona instructions in root `AGENTS.md`.
- Preserve correctness, acceptance criteria, and audit trail; reduce duplication rather than discard decisions or evidence.
- Do not run tests unless requested.

## Work item metadata

- ID: token-efficient-handoffs
- Created: 2026-09-27T13:46:00-04:00
