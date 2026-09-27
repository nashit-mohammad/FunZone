# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Artifact-first handoffs | Review shared workflow context-efficient rules | Artifacts are source of truth; transition notes are limited and do not repeat long context | Static review |
| T-02 | Minimal stage-specific reads | Review each persona's input instructions | Default reads are scoped; prior request/analysis can be reopened when needed | Static review |
| T-03 | Daily prompt aligned | Review daily-game prompt opening | It uses linked artifacts and avoids unnecessary recap/reloads | Static review |
| T-04 | Diff hygiene | Run `rtk git diff --check` | No whitespace errors | Automated check |

No application tests are applicable or requested.
