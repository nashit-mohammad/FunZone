# Test plan

| ID | Scenario | Check | Expected Result |
|---|---|---|---|
| T-01 | New daily game is added | Inspect the catalog cards and play sections | Bubble Pop appears as a playable card and has a matching section below the arcade grid |
| T-02 | Catalog ordering stays consistent | Inspect the arcade order | Playable cards remain before the Coming Soon cards |
| T-03 | More Coming Soon cards are added | Inspect the card list | At least three additional non-playable placeholder tiles appear after Bubble Pop |
| T-04 | Bubble Pop logic works | Review script and state transitions | The timer, score counter, and active bubble transition all update without syntax errors |
| T-05 | Existing arcade remains intact | Static review of the existing game sections | Other games and flows remain present and unchanged |

## Validation note

This task uses static review and a JavaScript parse check rather than a full browser test suite because no automated UI test harness exists in the repository.
