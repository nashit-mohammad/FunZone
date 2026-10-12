# Analysis

## Goal
The workflow should gate new game generation behind the rule that a prior daily-game PR must already be merged to `main` before another review PR is opened.

## Relevant repo evidence
- [.github/workflows/daily-game.yml](.github/workflows/daily-game.yml) currently lists open PRs and unconditionally proceeds to create a new Copilot run and PR.
- The workflow uses `gh pr list` and the `create-pull-request` action, so the merge gate can be enforced with a simple GitHub CLI check before the Copilot task runs.
- [.github/DAILY-GAMES.md](.github/DAILY-GAMES.md) describes the intended behavior and should reflect the merge requirement.

## Implementation plan
1. Add a `merge-gate` step that checks for any open `FunZone game:` PRs and for at least one previously merged `FunZone game:` PR on `main`.
2. Skip the entire generate-and-PR flow when either condition is not satisfied.
3. Keep the rest of the workflow unchanged for the actual game generation after the gate passes.
4. Update the daily-game documentation to match the merge gate.

## Risks and constraints
- The gate must not accidentally block the first-ever run before any game PR has been merged; it should intentionally skip until a prior PR is merged.
- Remote GitHub Actions execution is not available in this session, so the validation will be static and limited to the workflow logic and docs.
