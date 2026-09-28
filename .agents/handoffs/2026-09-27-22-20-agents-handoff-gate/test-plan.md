# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Handoff exists before analysis or edits | Review mandatory gate and Orchestrator intake checklist | Request/status are created and verified before implementation-file inspection or repository edits | Static |
| T-02 | Stage transitions cannot be deferred | Review Developer, Tester, and rework/closeout gates | Each stage names required incoming artifacts and requires status update before work starts | Static |
| T-03 | Same-session workflow preserved | Review gate language and existing workflow | Gates explicitly apply in one session and same-session work remains allowed | Static |
| T-04 | Recovery stays truthful | Review missed-gate recovery text | Work stops, records actual times/history, identifies missed gate, then continues | Static |
