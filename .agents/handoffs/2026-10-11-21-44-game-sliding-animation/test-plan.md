# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Garden tiles slide, including merges | Review line index order for left/right/up/down; trace a moved tile and equal-value pair through compaction, origin tracking, rendering, and animation classes. | Moved tiles start at their source cell and land at their destination; merged results retain a source and get merge feedback; spawned tiles pop instead of sliding from a false origin. | Static review; runtime deferred |
| T-02 | Sliding motion is added where suitable | Review Star Scout move direction row/column deltas and CSS offset signs; confirm blocked moves and reset do not request slide motion; review existing motion in other games. | Valid moves glide one cell in the requested direction; invalid moves do not animate; existing game-specific motion remains intact. | Static review; runtime deferred |
| T-03 | Reduced-motion and input safety | Review the reduced-motion media rule and confirm state updates/event handlers remain synchronous and are not gated by animation completion. | New animations are reduced to near-zero duration for reduced-motion users; keyboard and pointer input continue to update state immediately. | Static review; runtime deferred |
