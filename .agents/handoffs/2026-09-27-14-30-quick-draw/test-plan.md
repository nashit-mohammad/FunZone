# Test plan

| Case | Criterion | Scenario | Expected | Type |
|---|---|---|---|---|
| T-01 | Quick Draw navigation | Click its arcade button | Scrolls to game and focuses Start round | Manual runtime |
| T-02 | Valid reaction | Start, wait for green, click target | Milliseconds shown; best updates | Manual runtime |
| T-03 | Early click | Click while waiting | Too-soon feedback; retry enabled | Manual runtime |
| T-04 | Ordering | Inspect arcade cards | Five playable cards 01â05 before Coming Soon 06â07 | Static |
| T-05 | Regression | Inspect existing cards and handlers | Existing games remain wired | Static |
