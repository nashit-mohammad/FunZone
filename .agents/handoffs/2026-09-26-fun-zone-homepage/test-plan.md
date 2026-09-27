# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Homepage and game list | Load index.html; inspect heading and cards | Fun Zone hero, playable Tic Tac Toe, and clearly marked future games appear | Manual/static |
| T-02 | Turn handling and occupied squares | Click a cell, then another cell | First click shows X, turn changes to O; used cell cannot be changed | Logic |
| T-03 | Win detection and score | Play X at 1, 2, 3 and O at 4, 5 | X win announced, score increments, remaining cells disabled | Logic |
| T-04 | Draw detection | Play 0,1,2,4,3,5,7,6,8 | Draw announced, no score increments, board disabled | Logic |
| T-05 | New round | Finish a round and select New round | Empty board, X begins, score persists, cells are enabled | Logic |
| T-06 | Responsive and keyboard access | Inspect mobile CSS and semantic buttons; use Tab/Enter | One-column mobile cards, reachable controls, visible focus and cell labels | Static review |
