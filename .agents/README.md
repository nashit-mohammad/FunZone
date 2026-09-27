# Four role agent workflow

This workspace uses four role prompts that can be run as separate Cline tasks or sessions. They are role instructions and durable handoff conventions; they do not launch parallel workers by themselves. Start the Orchestrator role with the user's request, then start each next role with its prompt and the latest handoff document. Cline tasks persist in task history, while the files below preserve the work in a form the next role can reliably pick up.

## Roles

1. **Orchestrator** — .agents/roles/orchestrator.md: owns the request, sequences the roles, checks handoff completeness, routes bugs back to Developer, and reports the final result.
2. **Analyser** — .agents/roles/analyser.md: investigates the repository and writes an implementation-ready technical plan.
3. **Developer** — .agents/roles/developer.md: implements the approved plan and records changes and known risks.
4. **Tester** — .agents/roles/tester.md: derives and runs appropriate checks, records evidence, and returns defects to Developer.

## One work item, one durable folder

Create .agents/handoffs/<work-id>/ for each request. Use a short slug plus date, for example 2026-09-26-login-validation/. Copy the templates from .agents/templates/ into that folder as each role begins. The handoff folder is the source of truth; never overwrite an earlier role's file. Update status.md whenever ownership changes.

Expected artifacts:

- request.md — original user request and acceptance criteria (Orchestrator)
- analysis.md — architecture, requirements, assumptions, and implementation plan (Analyser)
- implementation.md — files changed, design choices, and known issues (Developer)
- test-plan.md and test-report.md — test cases and results (Tester)
- status.md — current owner, state, next action, and handoff history (each role updates on handoff)

## Handshake and state transitions

Use these states: INTAKE, ANALYSIS_READY, IMPLEMENTATION_READY, TESTING, REWORK_REQUIRED, PASS, BLOCKED.

```text
Orchestrator (INTAKE) -> Analyser (ANALYSIS_READY)
-> Developer (IMPLEMENTATION_READY) -> Tester (TESTING)
-> PASS -> Orchestrator closes and reports
-> REWORK_REQUIRED -> Developer fixes -> Tester retests (repeat)
```

Every handoff must name the receiving role, link the artifact(s), summarize what is ready, list open questions/risks, and state the next action. The receiver acknowledges by updating status.md before doing the work. A role must return BLOCKED with the missing input and reason when it cannot safely proceed; Orchestrator resolves it. Tester findings always go to Developer for fixes, then back to Tester for regression checks. Orchestrator closes only after a passing test report, or tells the user clearly why validation is blocked or unavailable.

## Starting a role

In a new Cline task, give the agent the relevant role file and work-item path, for example: “Act as the Analyser. Follow .agents/roles/analyser.md; work item is .agents/handoffs/2026-09-26-login-validation/. Read the request and current status, then produce your handoff.” The role must read the previous artifacts before acting and write its own artifact before handing off.

## Safety and quality

- Preserve the user's scope and acceptance criteria. Ask Orchestrator to clarify material ambiguity.
- Analyser plans against the existing stack and conventions; do not introduce dependencies or broad redesign without a clear need.
- Developer follows repository patterns, keeps changes focused, and records commands run and results.
- Tester tests behavior against acceptance criteria, reports reproducible evidence, and never edits production code while acting as Tester.
- Do not claim checks passed unless they were actually run. If the repository has no runnable checks, explain that in the report.
