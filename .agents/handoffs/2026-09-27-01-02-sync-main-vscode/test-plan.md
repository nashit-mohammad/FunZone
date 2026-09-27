# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Local branch is main tracking origin/main | Inspect current branch and upstream status | main...origin/main | Manual |
| T-02 | Local main reflects fetched origin/main | Compare git rev-parse main and git rev-parse origin/main | Commit IDs match | Manual |
| T-03 | VS Code sync steps are clear | Review final instructions | Fetch/pull workflow is described | Manual |
