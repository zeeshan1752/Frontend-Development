# Focus Board

A responsive task planner for practising task state, filtering, date labels, progress feedback, and browser storage.

## What to try

- Add a task with a category and optional due date.
- Mark it complete or remove it.
- Filter the list to show all, to-do, or done tasks.
- Reload the page to see tasks saved in the same browser.

## How the interactions work

Tasks are held in a JavaScript array and rendered as DOM elements. Adding, completing, deleting, or filtering updates the visible list and its progress summary. The page saves the tasks in `localStorage`. Before saved tasks are used, the script checks that their fields have the expected types and limits overly long IDs and titles. Due dates are formatted as Today, Tomorrow, or a short calendar date.

Each checkbox and delete button has an accessible name that includes its task title. Filters only change which tasks are shown; they do not delete hidden tasks.

## Run and files

Open `index.html` in a browser. No build step is required.

- `index.html` — planner structure and task form
- `styles.css` — responsive layout and task states
- `script.js` — task creation, filters, dates, progress, and browser storage

## Limitations and next step

Tasks stay in the current browser and are not synced or backed up. Clearing browser storage restores the sample tasks. A next iteration could make storage errors visible and add a deliberate export or backup feature.
