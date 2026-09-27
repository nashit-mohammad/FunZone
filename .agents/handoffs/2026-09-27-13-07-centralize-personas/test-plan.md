# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Root AGENTS has complete personas and workflow | Compare root sections to the four prior persona prompts and workflow definition | All shared workflow details and four personas are present, with `@RTK.md` retained | Static review |
| T-02 | No active setup redirects to old persona sources | Search active root, `.github/`, and templates for `.agents/README.md` and `.agents/roles` | No active references remain; old role files and README are absent | Static review |
| T-03 | Copilot custom agent uses canonical Orchestrator persona | Inspect `.github/agents/orchestrator.agent.md` frontmatter and body | Profile has required identity metadata and directs Copilot to root `AGENTS.md` Orchestrator section | Static review |
| T-04 | No whitespace defects | Run `rtk git diff --check` | Command exits successfully | Automated check |

Execution-based tests were not requested and will not be run.
