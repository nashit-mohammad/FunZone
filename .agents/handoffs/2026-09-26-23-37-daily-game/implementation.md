# Implementation handoff

## Summary

Added a GitHub-hosted workflow that checks out `main` daily at 9:00 AM Toronto time, asks Codex to add one distinct FunZone game, and opens a review-only PR from a run-unique branch based on `main` when there is a product diff. Added the game-generation prompt and one-time repository setup guide.

## Files changed

- `.github/workflows/daily-game.yml` — scheduled and manual hosted workflow; Codex invocation; isolated PR creation from `main`; role artifact upload.
- `.github/codex/prompts/daily-game.md` — game requirements, repository workflow, and honest validation instructions.
- `.github/DAILY-GAMES.md` — secret, permissions, activation, and manual-run setup.
- `.agents/handoffs/2026-09-26-23-37-daily-game/*` — this work item's durable same-session role handoff.

## Plan deviations and decisions

- The workflow uses one Action run ID per PR branch, preventing separate runs from sharing a working branch.
- PR changes exclude `.agents/handoffs/**`; the generated handoff is preserved in a 90-day Actions artifact instead.
- Remote activation is not complete: the repo owner must configure the key and Actions PR permission, and the workflow must be merged into `main`.

## Checks actually run

| Command/check | Result | Evidence or limitation |
|---|---|---|
| Static read of workflow, prompt, setup guide, and repository handoff instructions | Reviewed | Configuration matches intended schedule, base branch, and unique PR branch; live GitHub behavior remains unverified. |
| `rtk git diff --check` | Passed | No whitespace errors in tracked diff; new untracked files were reviewed separately. |
| Automated/manual tests | Not run | User did not ask to test; no remote workflow run is available before GitHub setup. |

## Known issues and follow-up

- Add repository Actions secret `OPENAI_API_KEY`, enable Actions PR creation, merge the setup to `main`, then run manually once to validate GitHub integration.
- No `gh` command or authenticated GitHub connector is available in this workspace, so this local branch cannot be pushed and a PR cannot be opened here.

## Tester handoff

- Next owner: Tester
- Focus areas: schedule and timezone, checkout and base `main`, unique PR branch, write permissions, prompt isolation, handoff artifact handling, and setup prerequisites.
