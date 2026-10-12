# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | No new PR while an earlier one is open | Review the workflow and confirm `gh pr list --state open` is checked before generation | The workflow exits before Copilot or PR creation if any `FunZone game:` PR is still open | Static |
| T-02 | No new PR before the last one is merged | Review the workflow and confirm `gh pr list --state merged` is checked before generation | The workflow exits when no merged `FunZone game:` PR exists on `main` yet | Static |
| T-03 | New PR allowed after merge | Review the workflow gate and branch creation logic | The workflow proceeds only after a prior daily-game PR is merged | Static |
| T-04 | Remote execution limitation | Note inability to run a GitHub-hosted workflow from this local session | The final result remains static-only until a GitHub run executes the workflow | Static |
