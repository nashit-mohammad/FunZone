# Implementation handoff

## Summary

Removed the repo's active RTK dependency from the project instructions and daily-game Copilot prompt, and deleted the RTK-specific repo files so the workflow no longer expects `rtk` to exist on GitHub-hosted runners.

## Files changed

- [AGENTS.md](AGENTS.md) — removed the root `@RTK.md` include so repo guidance no longer loads RTK instructions by default.
- [.github/copilot/prompts/daily-game.md](.github/copilot/prompts/daily-game.md) — removed the explicit `RTK.md` requirement from the daily game task prompt.
- [RTK.md](RTK.md) — deleted.
- [.clinerules](.clinerules) — deleted.

## Plan deviations and decisions

- Kept the daily-game workflow itself untouched; the issue was only repo-level guidance and the prompt dependency on RTK.
- Left historical handoff records intact to preserve the repo's durable agent workflow history as required by the repo instructions.

## Checks actually run

| Command/check | Result | Evidence or limitation |
|---|---|---|
| `git diff --check` | Passed | No output; no whitespace or merge-marker issues were reported. |
| Repo search for `RTK|rtk` in active guidance | Static review | The only remaining matches are historical handoff files under `.agents/handoffs`, which are preserved intentionally as workflow history. |

## Known issues and follow-up

- Live GitHub Actions execution was not available in this local session, so the workflow itself could not be rerun remotely from here.

## Tester handoff

- Next owner: Tester
- Focus areas: confirm active repo guidance no longer references RTK and record the remaining remote-run limitation.
