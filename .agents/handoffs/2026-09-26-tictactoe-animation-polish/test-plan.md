# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Fixed input layout | Set a long player name and inspect constrained scoreboard CSS | Equal columns stay bounded; input content is clipped and boxes do not grow |
| T-02 | Winner animation | Complete a winning line | Board/status and winning cells receive celebration classes |
| T-03 | Losing animation | Complete a winning line with opponent marks on the board | Opponent marks receive the losing animation class |
| T-04 | Reset cleanup | Start a new round after a win | Winner/loser classes and board effect are removed |
| T-05 | Reduced motion | Inspect reduced-motion media rules | Result styling remains while animation is disabled |
| T-06 | Existing behavior | Run name/draw workflow regression | Names, win score, draw snapshot, and manual/automatic resets still pass |
