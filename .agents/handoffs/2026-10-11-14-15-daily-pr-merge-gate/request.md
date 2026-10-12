# Request

The daily game workflow should create a new PR only if the previously created PR was merged to main.

## Acceptance criteria
- The workflow must not open a new daily-game PR while an earlier FunZone game PR is still open.
- The workflow must skip generation when no merged FunZone game PR exists on `main` yet.
- The workflow must allow a new daily game only after the previous daily-game PR has been merged to `main`.
- The behavior should remain review-only and should not auto-merge any game PR.

## Scope
- GitHub Actions workflow logic for the daily game automation.
- Documentation update needed to describe the merge gate.

## Constraints
- Keep the existing daily-game workflow pattern and repo structure.
- Do not broaden permissions or install extra dependencies.
- Record the exact validation outcome.
