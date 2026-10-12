# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Remove RTK from active repo guidance | Inspect [AGENTS.md](AGENTS.md), the Copilot daily-game prompt, and the repo root for RTK references | No active guidance references `RTK.md` or the `rtk` wrapper | Static |
| T-02 | Preserve workflow behavior | Review the daily-game prompt and repo instructions for unrelated dependency or permission changes | The task still targets the same game workflow without adding tooling | Static |
| T-03 | Record remote validation limitation | Attempt local static verification only | The report clearly notes that live GitHub Actions execution is unavailable in this session | Static |
