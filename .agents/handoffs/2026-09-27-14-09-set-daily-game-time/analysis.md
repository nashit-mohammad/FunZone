# Technical analysis

## Repository evidence

- `.github/workflows/daily-game.yml` currently schedules `18 16 * * *` without a timezone, which is 16:18 UTC.
- `.github/DAILY-GAMES.md` describes the workflow as running at 9:00 AM America/Toronto.
- The workflow also has `workflow_dispatch`; preserve it.

## Requirements mapping

| Acceptance criterion | Technical requirement | Validation approach |
|---|---|---|
| Run at 2:30 PM Eastern local time year-round | Set cron to `30 14 * * *` and timezone to `America/Toronto` | Static inspection of schedule block |
| Docs reflect time | Update setup guide schedule description | Static review and text search |

## Proposed design

Use GitHub's timezone-aware schedule syntax with `cron: "30 14 * * *"` and `timezone: "America/Toronto"`. This tracks 2:30 PM local Eastern time across EST/EDT transitions. Keep manual dispatch and the rest of the workflow unchanged.

## Implementation tasks

1. Update the schedule and timezone in the workflow.
2. Change the setup guide to 2:30 PM America/Toronto.
3. Review diff and run `rtk git diff --check`; do not run application tests.

## Data, interfaces, and dependencies

- No runtime changes beyond schedule metadata; no new dependencies.

## Risks, assumptions, and open questions

- Interpreted “EST” as colloquial Eastern local time (Toronto), not fixed UTC-5 year-round, consistent with the repository's prior America/Toronto schedule description.

## Developer handoff

- Next owner: Developer
- Ready when: Exact cron/timezone pair and documentation change are specified.
