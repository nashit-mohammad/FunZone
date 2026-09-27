# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Daily schedule at 9 AM Toronto time | Inspect workflow schedule and timezone | Schedule is daily at 09:00 `America/Toronto` | Static |
| T-02 | PC-off remote execution | Inspect runner declaration | Workflow uses GitHub-hosted runner | Static |
| T-03 | Dedicated PR branch based on `main` | Inspect checkout and create-pull-request inputs | Every run checks out `main`, targets base `main`, and uses unique run-id branch | Static |
| T-04 | Review required; no automatic merge | Inspect workflow actions and setup guide | Workflow opens PR only; no merge action or auto-merge configuration | Static |
| T-05 | One new game proposal per run | Inspect Codex prompt and PR creation behavior | Prompt requests exactly one distinct playable game; action does not open PR when no diff exists | Static |
| T-06 | GitHub activation requirements documented | Inspect setup guide | API secret, Actions PR permission, merge-to-main, and manual first run are documented | Static |
| T-07 | Live end-to-end schedule and PR integration | Configure repository, run workflow, inspect run and PR | Run succeeds and creates a PR from its unique branch | Requires GitHub configuration and authenticated remote run |
