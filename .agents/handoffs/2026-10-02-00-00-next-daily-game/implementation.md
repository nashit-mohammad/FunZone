# Implementation

## Summary

Added the next playable daily-game addition as Bubble Pop and expanded the catalog's Coming Soon lineup with additional future game placeholders. The change stays within the existing static front-end architecture and preserves the current arcade flow.

## Files changed

- `index.html` — added a new Bubble Pop catalog card and game section, then added more Coming Soon tiles for future titles.
- `styles.css` — added the Bubble Pop artwork and layout styles, plus responsive support for the new section.
- `app.js` — implemented the Bubble Pop round logic, timer, score tracking, and catalog scroll focus behavior.

## Design choices

- Reused the existing arcade card/section pattern rather than creating a separate framework or game system.
- Chose Bubble Pop as the next daily game because it already existed as a placeholder concept and fits the Fun Zone style without duplicating the current mechanics.
- Kept the new Coming Soon tiles non-interactive and visually distinct, preserving the catalog flow.

## Validation

- Ran `node --check app.js` after the change. The script parsed without syntax errors.
- Performed a static catalog review to ensure playable tiles remain before the Coming Soon cards and the new game is visible in the catalog and section list.

## Known issues

- None at this stage. The change is limited to the static arcade and existing behaviors remain intact.
