# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Add exactly one new playable game | Inspect catalog cards and play sections | Star Scout is the only new playable card/section; all other new cards are Coming Soon | Static |
| T-02 | Collect stars, avoid rocks, and reach rocket | Start at row 5 column 1; inspect path and movement state logic | Three reachable stars can be collected; rocks and map edges block movement; rocket only wins after all stars | Static review; manual play not run |
| T-03 | Clear progress and restart | Inspect move, star, win, and reset handlers | Moves and star progress update; success is announced; restart resets position, count, and star set | Static review; manual play not run |
| T-04 | Keyboard and semantic controls | Inspect focus target, key handler, and D-pad buttons | Focused map accepts arrow keys; four native labeled controls perform the same moves | Static review; keyboard play not run |
| T-05 | Responsive and accessible presentation | Inspect map/control styles, media queries, focus rules, map description, and live status | Map fits narrow layouts; controls remain usable; visible focus and screen-reader instructions/status exist | Static review; browser/AT checks not run |
| T-06 | Preserve existing games and stack | Inspect changed-file scope and existing handler sections | Existing games remain in place; no packages, services, or tracking added | Static |
| T-07 | Add more upcoming game tiles | Inspect card sequence and controls | Bubble Pop, Dino Dash, and Word Wizard appear as noninteractive Coming Soon cards | Static |
| T-08 | Avoid duplicate open game proposal | Check open FunZone game PR titles | No matching pending game PR exists | Not available: no GitHub PR list or authenticated CLI access |
