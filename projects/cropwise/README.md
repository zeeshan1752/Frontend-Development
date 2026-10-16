# CropWise

A responsive field-planning interface inspired by the supplied Smart Crop Advisory prototype. It demonstrates form-driven interface states, local notes, and an image preview while avoiding unsupported claims about agricultural advice.

## What to try

- Select sample soil, season, and water-access values, then submit the planner.
- Add and remove a field note, then reload to see that it is saved in this browser.
- Select a photo to preview it locally, then clear the preview.

## How the interactions work

The planner reads its form values with `FormData` and looks up a sample result. The result is inserted as text, and list items are created as DOM elements. Saved notes are also rendered as text, rather than interpreted as HTML. The image preview uses a temporary object URL; it does not send the selected file to a server.

The original prototype called an AI endpoint with an empty API key and inserted returned HTML into the page. This version replaces that dependency with visible sample rules and safe local interactions.

## Run and files

Open `index.html` in a browser. No build step or API key is required.

- `index.html` — dashboard, planner form, notes list, and preview controls
- `styles.css` — responsive dashboard styling
- `script.js` — sample-result lookup, safe DOM updates, notes storage, and file preview

## Limitations and next step

The results are interface examples, not validated crop or treatment guidance. Soil and water selections are shown as profile details but do not change the sample crop lookup. The photo is neither analyzed nor uploaded. Real recommendations need verified local data and expert review before they can be offered as advice.
