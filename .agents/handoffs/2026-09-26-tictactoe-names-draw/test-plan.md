# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Enter player names | Change both input values and make moves | Names appear in turn and win statuses; values are rendered safely |
| T-02 | Clear draw state | Play a full drawn game | Draw message, board and all cells highlighted, all cells disabled |
| T-03 | Keep final snapshot 10 seconds | Finish a draw with controlled timer | Drawn marks remain during a 10,000 ms pending timeout |
| T-04 | Auto reset and preserve state | Fire the pending timeout | Board clears, X begins, draw styling clears, names and scores remain |
| T-05 | Manual reset available | Reset during a pending draw | Board resets immediately, timeout is cancelled, names and scores remain |
| T-06 | Retain winner behavior | Win a round after entering a custom name | Winner message uses the name; score updates |
