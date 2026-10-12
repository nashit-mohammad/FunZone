# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Give Copilot the exact run-specific handoff path | Inspect the prompt-generation block and workflow run-context text | The concrete `$work_dir` is appended to the prompt before Copilot starts | Static |
| T-02 | Continue when RTK is unavailable | Inspect `RTK.md` fallback and daily-game prompt instruction | Agent can use built-in file tools or direct shell commands and does not block on missing `rtk` | Static |
| T-03 | Preserve workflow behavior | Inspect triggers, permissions, handoff upload, and PR action | Schedule/manual trigger, current permissions, artifact upload, and conditional PR behavior are unchanged | Static |
| T-04 | Confirm end-to-end game and PR creation | Manually dispatch workflow after fix | Copilot completes handoffs, changes application files, and the PR action creates a review PR | Remote execution; not run |
