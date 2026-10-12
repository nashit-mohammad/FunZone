# Daily FunZone game task

Use [.github/DAILY-GAMES.md](.github/DAILY-GAMES.md) as the canonical source of truth for this workflow and its rules.

Implement exactly one distinct, playable game for today's FunZone update. Follow repository-root `AGENTS.md` and the standard Orchestrator → Analyser → Developer → Tester → Orchestrator handoff flow. Read the existing `request.md` and `status.md` in the injected work item folder first, then use the exact handoff directory supplied by the workflow run context. Do not invent another folder or try to resolve the environment variable via shell commands.

- Keep the existing static HTML/CSS/vanilla JavaScript architecture.
- Add no packages, external services, tracking, or accounts.
- Avoid duplicating existing games or any open `FunZone game:` PRs.
- Keep the change focused on one game and preserve current behavior elsewhere.
- Update all six required handoff artifacts and keep `status.md` current.
- Start `implementation.md` with `Game name: <name>` so the workflow can generate the PR title from it.
- If a safe, distinct game cannot be completed, leave the app unchanged and explain why in the handoff instead of forcing a PR.

## Request to record verbatim

The workflow already provides the concrete request and operating rules in the handoff folder. Follow the live request file and keep the implementation aligned with the canonical instructions in [.github/DAILY-GAMES.md](.github/DAILY-GAMES.md).

## Game requirements

Follow the implementation and validation rules in [.github/DAILY-GAMES.md](.github/DAILY-GAMES.md), then record the result in the generated handoff files. Keep the game distinct, playable, and focused on the current main branch; do not invent a separate process or duplicate documentation.
