# Four role agent workflow

This workspace uses four role prompts and durable handoff files. The Orchestrator owns the request from start to finish and must create and maintain the handoff for every repository task that changes files or has multiple steps. Do this automatically; the user should not need to ask for handoffs. Use a separate role session only when the user or applicable environment explicitly directs it and a role-session tool is available. Otherwise perform the role stages sequentially in the current session, following each role prompt and updating the artifacts/status at every transition. Never imply a separate agent/session ran when it did not.

## Roles

1. **Orchestrator** — .agents/roles/orchestrator.md: owns the request, sequences the roles, checks handoff completeness, routes bugs back to Developer, and reports the final result.
2. **Analyser** — .agents/roles/analyser.md: investigates the repository and writes an implementation-ready technical plan.
3. **Developer** — .agents/roles/developer.md: implements the approved plan and records changes and known risks.
4. **Tester** — .agents/roles/tester.md: derives and runs appropriate checks, records evidence, and returns defects to Developer.

## One work item, one durable folder

Create `.agents/handoffs/<timestamp>-<short-slug>/` at intake, before repository changes. Use local date/time through minutes only, `YYYY-MM-DD-HH-mm`, then a short slug (example: `2026-09-26-14-35-login-validation/`). Do not include seconds. If a folder with that minute and slug already exists, append `-2`, `-3`, etc. Copy the applicable templates into the folder at intake so the request and status are present before analysis or implementation. Update the role artifact as each stage finishes and update `status.md` at every transition. Preserve prior handoff history; do not erase or rewrite earlier transitions.

Expected artifacts:

- request.md — original user request and acceptance criteria (Orchestrator)
- analysis.md — architecture, requirements, assumptions, and implementation plan (Analyser)
- implementation.md — files changed, design choices, and known issues (Developer)
- test-plan.md and test-report.md — test cases and results (Tester)
- status.md — current owner, state, next action, and handoff history (each role updates on handoff)

## Handshake and state transitions

Use these states: INTAKE, ANALYSIS_READY, IMPLEMENTATION_READY, TESTING, REWORK_REQUIRED, PASS, BLOCKED. `Current owner` means the role currently doing the work; `Next owner` means the receiving role. Record a history row whenever work passes between roles, including same-session role changes.

```text
Orchestrator (INTAKE) -> Analyser (ANALYSIS_READY)
-> Developer (IMPLEMENTATION_READY) -> Tester (TESTING)
-> PASS -> Orchestrator closes and reports
-> REWORK_REQUIRED -> Developer fixes -> Tester retests (repeat)
```

Every handoff must name the receiving role, link the artifact(s), summarize what is ready, list open questions/risks, and state the next action. The receiver acknowledges by updating status.md before doing the work. A role must return BLOCKED with the missing input and reason when it cannot safely proceed; Orchestrator resolves it. Tester findings always go to Developer for fixes, then back to Tester for regression checks. Orchestrator closes only after a passing test report, or tells the user clearly why validation is blocked or unavailable.

## Starting a role

At intake, preserve the user's request verbatim in `request.md`, set status to INTAKE, then proceed to analysis. At each transition, name the next role, link its input artifacts, state what is ready and the next action, and update status before doing that role's work. Each role reads the prior artifacts and writes its output before handing off. Do not stop after creating the folder or ask the user to start the next role. If this environment cannot execute a role stage or validation, record BLOCKED, identify the limitation and next action, and still complete all independent stages.

## Safety and quality

- Preserve the user's scope and acceptance criteria. Ask Orchestrator to clarify material ambiguity.
- Analyser plans against the existing stack and conventions; do not introduce dependencies or broad redesign without a clear need.
- Developer follows repository patterns, keeps changes focused, and records commands run and results.
- Tester checks acceptance criteria, reports reproducible evidence, and never edits production code while acting as Tester. Execute tests only when the user asks for testing or validation. Without that request, use static review and existing evidence where they can fully validate the criteria; record tests as not run, and mark BLOCKED if criteria still require execution to verify.
- Do not claim checks passed unless they were actually run. If the repository has no runnable checks, explain that in the report.
