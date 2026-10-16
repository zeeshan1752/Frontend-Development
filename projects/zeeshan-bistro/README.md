# Zeeshan Bistro

A responsive restaurant landing page based on the original restaurant signup exercise. It gives a visitor a short path through the restaurant story, menu, and reservation form.

## What to try

- Use the navigation to move between the page sections.
- Open the mobile menu at a narrow viewport.
- Choose a date and submit the reservation form to see its local confirmation.

## How the interactions work

The form uses labelled native controls and required fields, so the browser can guide the visitor before JavaScript runs. The script sets the minimum date to today, prevents a page reload on submission, and displays a confirmation in the page. The mobile-menu button toggles the navigation state.

These choices keep the demo usable without a build system or server. They also mean the page can only confirm that the form was submitted in this browser; it cannot create an actual booking.

## Run and files

Open `index.html` in a browser. No dependencies are required.

- `index.html` — semantic page sections, navigation, and labelled form
- `styles.css` — layout, responsive breakpoints, focus styles, and reduced-motion support
- `script.js` — mobile menu, date limit, and local confirmation behavior
- `assets/dessert-illustration.svg` — original vector illustration created for this collection

## Limitations and next step

There is no server connection, booking database, or email notification. A production version would need a real reservation endpoint, server-side validation, and clear success and failure states.
