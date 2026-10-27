# Fast (fasting-tracker-app)

A simple intermittent fasting tracker. Start the clock, stay the course.

No account, no server: everything is stored locally in your browser (`localStorage`). When hosted on claude.ai, fasts sync per user.

## Live app

https://giwrgoskaklidakis.github.io/fasting-tracker-app/

Deployed automatically to GitHub Pages on every push to `main` (requires Settings → Pages → Source: "GitHub Actions").

## Features

- One-tap start / end, with a live progress ring toward your goal.
- Goal presets (13:11, 14:10, 16:8, 18:6, 20:4, 24h, 36h, 48h) or a custom number of hours.
- Fix the start time if you forgot to start the timer.
- Rough fasting-stage hints (general guidance, not medical advice).
- Eating-window timer between fasts.
- Stats: number of fasts, day streak, average, longest, goal hit rate, and a last-7-days chart.
- History with edit and delete.
- Calories estimate: set sex, age, height, weight and activity level once to see ~kcal per hour and kcal burned so far (Mifflin-St Jeor resting energy × activity level).
- Backup & restore: save a backup file (on iPhone via the share sheet → Save to Files) and restore it later. Restoring only adds fasts and never removes what's already there.
- Light and dark mode, mobile friendly.
- Always loads the latest version when online, and works offline (`sw.js`).

## Run locally

No build step. Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Tech

Plain static HTML/CSS/JavaScript, no dependencies.
