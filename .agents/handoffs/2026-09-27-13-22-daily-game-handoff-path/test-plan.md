# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Standard path and artifacts | Review workflow path generation and template copies | Timestamped folder is under `.agents/handoffs/` and contains all six standard artifacts | Static review |
| T-02 | Intake status and request are initialized | Review workflow heredocs and their position relative to Codex invocation | `request.md` contains task/criteria/metadata and `status.md` begins in `INTAKE` with Orchestrator → Analyser history before Codex starts | Static review |
| T-03 | Prompt and docs use normal lifecycle | Review daily-game prompt and setup guide | They require the canonical directory, persona stages, status-history updates, and artifact handling | Static review |
| T-04 | Diff hygiene | `rtk git diff --check` | No whitespace errors | Automated check |

Workflow execution and application tests are not requested and will not be run.
