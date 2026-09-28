# Technical analysis

## Repository evidence

- Root AGENTS.md already requires intake artifacts and status transitions, but the instruction is embedded in prose and repeats the intake requirement without a concrete gate that blocks analysis or edits.
- The previous task began code changes before records existed, then recorded transitions retrospectively.

## Requirements mapping

| Acceptance criterion | Technical requirement | Validation |
|---|---|---|
| Handoff exists before analysis or edits | Add an explicit mandatory gate that requires request.md and status.md to exist and be complete before repository analysis or changes | Inspect instruction placement and wording |
| Stage transitions cannot be deferred | Add stage checklists that require each handoff artifact and status update before the next role starts; prohibit backfilling as if timely | Static review |
| Sequential same-session work remains supported | Make gates apply to same-session persona transitions and require honest owner/history updates | Static review |

## Proposed design

Add a prominent mandatory pre-work gate to Shared workflow and a short Orchestrator checklist. It will identify allowed intake-only reads (templates and instruction files), require verification of request/status records before analysis, require incoming artifacts and status transition before each next stage, and explicitly say that missing artifacts pause work. Preserve same-session execution and record it truthfully.

## Implementation tasks

1. Insert the shared pre-work gate before the workflow detail.
2. Add intake and stage-transition checklist enforcement in Orchestrator instructions.
3. Review the changed section and document validation limits.

## Data, interfaces, and dependencies

No code, interface, or dependency changes.

## Risks, assumptions, and open questions

- Scope is root AGENTS.md plus required handoff artifacts only.
- No unresolved questions.

## Developer handoff

- Next owner: Developer
- Ready when: This focused instruction plan is ready for same-session implementation.
