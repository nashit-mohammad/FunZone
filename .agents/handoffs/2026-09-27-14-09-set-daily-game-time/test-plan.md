# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Schedule at 2:30 PM Eastern local | Inspect `schedule` block | Cron is `30 14 * * *` with timezone `America/Toronto` | Static review |
| T-02 | Docs match | Inspect daily-game schedule description | Guide states 2:30 PM America/Toronto | Static review |
| T-03 | Diff hygiene | Run `rtk git diff --check` | No whitespace errors | Automated check |

No application tests are applicable.
