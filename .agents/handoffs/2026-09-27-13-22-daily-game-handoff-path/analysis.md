# Technical analysis

## Repository evidence

- `.github/workflows/daily-game.yml` creates a folder under `.agents/handoffs/` named `<timestamp>-daily-game-<run-id>` and copies all six standard templates.
- The workflow copies blank request/status templates without populating intake metadata, original work request, initial status, or handoff history.
- `DAILY_GAME_HANDOFF_DIR` is passed to Codex, and the prompt tells it to use that directory, but does not clearly require recording every normal stage transition and updating the status history.
- `.github/DAILY-GAMES.md` only says records are uploaded as an artifact; it does not document the canonical folder naming, standard files, or status lifecycle.

## Requirements mapping

| Acceptance criterion | Technical requirement | Validation approach |
|---|---|---|
| Daily automation uses normal location and structure | Keep `.agents/handoffs/<timestamp>-<short-slug>/`, create all expected template artifacts, and initialize request/status before Codex runs | Static inspection of workflow step |
| Daily workflow documents normal lifecycle | Prompt must require same-session Orchestrator → Analyser → Developer → Tester → Orchestrator transitions and status history updates; setup guide explains local path and remote artifact | Static inspection of prompt and guide |
| No conflicting path convention | `DAILY_GAME_HANDOFF_DIR` remains a pointer to the standard folder, with no second handoff location | Search active daily-game files |

## Proposed design

Preserve the existing path in `.agents/handoffs/` and timestamp format, keeping a short `daily-game-<run-id>` slug for uniqueness. In the workflow preparation step, populate `request.md` with the automated task and criteria and populate `status.md` with intake owner/state/next action/history before Codex starts. Leave the other standard files copied from their templates. Update the prompt to treat the provided path as the standard handoff folder and require status transitions and completed reports; update the setup guide to explain local checkout location and uploaded artifact.

## Implementation tasks

1. Initialize the daily-game `request.md` and `status.md` after copying templates and before invoking Codex.
2. Clarify in the prompt that the directory is the normal handoff folder and that all standard role stages/artifacts/history are mandatory.
3. Update `.github/DAILY-GAMES.md` to document naming, contents, and per-run artifact location/retention.
4. Perform static review and report tests not run.

## Data, interfaces, and dependencies

- `DAILY_GAME_HANDOFF_DIR` stays as the environment variable passed to the prompt runner, but its value points into `.agents/handoffs/`.
- No runtime dependency or permission changes.

## Risks, assumptions, and open questions

- The specific game choice is made by Codex on each run; intake request should preserve the stable daily-game task prompt and criteria, while the generated per-run prompt retains open-PR titles as context.

## Developer handoff

- Next owner: Developer
- Ready when: The standard path, missing initialized records, and needed prompt/documentation updates are clear.
