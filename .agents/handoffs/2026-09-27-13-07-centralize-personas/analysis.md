# Technical analysis

## Repository evidence

- Root `AGENTS.md` currently contains only an RTK include and a pointer to `.agents/README.md`.
- `.agents/README.md` defines the durable work-item handoff workflow and redirects persona details to four files in `.agents/roles/`.
- `.github/codex/prompts/daily-game.md` explicitly cites `.agents/README.md`.
- No existing `.github/agents/` custom agent profile was found.
- Root instructions already include `RTK.md`; retain it alongside the consolidated workflow.

## Requirements mapping

| Acceptance criterion | Technical requirement | Validation approach |
|---|---|---|
| Root AGENTS has all personas and workflow | Consolidate Orchestrator, Analyser, Developer, Tester responsibilities, stage transitions, handoff requirements, and quality rules into root AGENTS.md | Static review of AGENTS.md against current four role prompts and workflow README |
| Persona source is not redirected | Remove references from active setup to the old README/role prompt chain; delete obsolete README and roles prompts | Search active configuration/docs for old references |
| Copilot custom agent uses Orchestrator persona | Add `.github/agents/orchestrator.agent.md` profile that points Copilot to the Orchestrator instructions in root AGENTS.md | Inspect expected profile location/frontmatter and source reference |
| Handoff consistency maintained | Keep `.agents/handoffs` and templates as durable records, not persona sources | Review README replacement references and repo search |

## Proposed design

Make root `AGENTS.md` the canonical instruction file for Codex and GitHub Copilot, retaining `@RTK.md` and adding full persona and workflow text. Keep templates and durable handoff records under `.agents/`, but remove `.agents/roles/` and the obsolete `.agents/README.md` once active references have been updated. Add a Copilot custom agent profile in `.github/agents/` whose instructions explicitly load and follow the Orchestrator section in root `AGENTS.md`.

## Implementation tasks

1. Replace root `AGENTS.md` with consolidated shared workflow instructions and all four complete persona sections.
2. Update active `.github/codex/prompts/daily-game.md` to cite only the canonical root instructions and handoff templates/process.
3. Add `.github/agents/orchestrator.agent.md` with valid custom-agent frontmatter and a source pointer to root `AGENTS.md`.
4. Delete `.agents/roles/` and obsolete `.agents/README.md`.
5. Record implementation and static review. Do not run tests, per user instruction constraints.

## Data, interfaces, and dependencies

- No runtime interfaces or dependencies change.
- Copilot custom agent file format follows GitHub's repository convention: `.github/agents/*.agent.md` with YAML frontmatter.
- Root `AGENTS.md` is the one source of persona instructions; custom agent profile points to its Orchestrator section.

## Risks, assumptions, and open questions

- Existing historical handoff artifacts may mention `.agents/roles` or `.agents/README.md`; preserve historical records and only update active configuration.
- The Copilot agent instruction must be resolvable from the repository root and Copilot must also honor repository `AGENTS.md` instructions.

## Developer handoff

- Next owner: Developer
- Ready when: The canonical-source approach, active references, deletion scope, and Copilot profile location are clear.
