# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | User-controlled tile size | Change range input to 120 px | Output and board CSS variable update |
| T-02 | Responsive square sizing | Inspect board grid CSS and viewport clamp | Nine equal square cells; requested size is bounded by viewport |
| T-03 | Animated reset | Win, press New round, pause before reset timeout | Existing marks stay visible, cells are disabled, reset animation class is present |
| T-04 | Reset completion | Fire 560 ms reset timer | Marks and outcome classes clear; X can play |
| T-05 | Preserve earlier behavior | Run previous game regression runner | Names, scores, 10-second draw snapshot, and manual/automatic resets pass |
