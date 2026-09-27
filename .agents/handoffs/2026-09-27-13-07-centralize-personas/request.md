# Request

## User's request

I wnat to rstructue my agents personas. I want a agents.md which has all persona;s mentioned as I have now. No agents.md redirecting to readme and then to roles folder persona. everything on agents.md to allow this architecture for codex and github both.

Then, remove roles folder and modify other impacted setups as i dont them now.
Also, add these orchestrator persona as an custom agent for github copilot to use agents.md orchestrator persona

## Acceptance criteria

- [ ] Root AGENTS.md contains the complete four-persona workflow and is usable by Codex and GitHub Copilot.
- [ ] Persona instructions are not redirected to another README or roles folder.
- [ ] `.agents/roles` is removed and impacted configuration/docs are updated.
- [ ] A GitHub Copilot custom agent provides the orchestrator persona by referencing AGENTS.md.

## Scope and constraints

- Preserve existing persona meaning and handoff workflow while consolidating.
- Do not run tests unless requested.

## Work item metadata

- ID: centralize-personas
- Created: 2026-09-27T13:07:00-04:00
