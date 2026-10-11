# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Keep scheduled and manual triggers | Inspect `on.schedule.cron`, timezone, and `workflow_dispatch` | Runs daily at 9 AM America/Toronto and remains manually dispatchable | Static |
| T-02 | Replace Codex with Copilot and retain prompt inputs | Inspect the install/run steps and environment | Copilot CLI receives the per-run prompt and handoff directory; inference uses `COPILOT_GITHUB_TOKEN`; no Codex action remains | Static |
| T-03 | Preserve handoffs and PR flow | Inspect preparation, upload, title, cleanup, and PR steps | Existing handoff artifacts upload; a dedicated Copilot-named branch is based on `main`; no merge is configured | Static |
| T-04 | Remote schedule works with PC off | Configure secret and run workflow on GitHub Actions | Hosted runner completes Copilot task and opens review PR when application files change | Remote execution; not run |
| T-05 | Secret and permission safety | Inspect workflow permissions and token environment scopes | Existing repo-write token permissions remain unchanged; Copilot secret is isolated to Copilot step and redacted from child tool environments | Static |
