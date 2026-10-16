# Zeeshan Jamshed — Frontend Learning Portfolio

A collection of browser-based projects and detailed HTML/CSS lessons. The projects focus on responsive layouts, accessible controls, JavaScript interactions, and clear boundaries between a front-end demo and a production service.

## Start here

- Open the [portfolio homepage](index.html) to browse the projects.
- Read the [case studies](case-studies.html) for implementation walkthroughs, decisions, limitations, and possible next steps.
- Browse the [learning library](learning-exercises/index.html) for 35 guided HTML and CSS practice pages.
- See [SOURCE-REVIEW.md](SOURCE-REVIEW.md) for a summary of what was carried forward from the original learning folder.
- Visit [Zeeshan's GitHub profile](https://github.com/zeeshan1752).

## Projects

| Project | Main practice areas | Demo | Case study |
| --- | --- | --- | --- |
| **Zeeshan Bistro** | Responsive page structure, labelled reservation form, mobile navigation | [Open](projects/zeeshan-bistro/index.html) | [Read](case-studies.html#zeeshan-bistro) |
| **Astic Studio** | Product filters, search, favourites, cart state, browser storage | [Open](projects/astic-store/index.html) | [Read](case-studies.html#astic-studio) |
| **CropWise** | Form-driven states, safe DOM updates, local file preview, notes | [Open](projects/cropwise/index.html) | [Read](case-studies.html#cropwise) |
| **Focus Board** | Task state, filters, date labels, progress, browser storage | [Open](projects/focus-board/index.html) | [Read](case-studies.html#focus-board) |

Each project has its own README with the features, files, and run instructions. The case studies explain the JavaScript concepts in context and call out what the demo does not do.

## Run the projects

The projects use plain HTML, CSS, and JavaScript. There is no build step or package installation. Open the root `index.html` or any project `index.html` in a browser. A local web server may provide more consistent browser storage and file-preview behavior.

## Repository map

```text
Frontend-Development/
├── index.html                 # Personal portfolio homepage
├── styles.css                 # Shared homepage and case-study foundations
├── case-studies.html          # Detailed walkthroughs of all four projects
├── case-studies.css
├── projects/
│   ├── zeeshan-bistro/        # Restaurant landing page
│   ├── astic-store/           # Boutique storefront
│   ├── cropwise/              # Field-planning interface demo
│   └── focus-board/           # Browser-based task planner
└── learning-exercises/        # Organized HTML/CSS lessons and examples
```

## Learning and project boundaries

- This is a learning portfolio assembled and refined with AI assistance. Review the code, make changes that reflect your own decisions, and describe your contribution accurately when presenting it.
- Zeeshan Bistro shows a local form confirmation. It does not send or store a real reservation.
- Astic Studio uses sample products and prices. The cart is local UI state; there is no inventory, checkout, or payment service.
- CropWise shows illustrative sample rules. It does not provide validated agricultural guidance, analyze uploaded photos, or connect to an AI service.
- Focus Board saves tasks in the current browser with `localStorage`; it does not sync them between devices.
- The product and dessert photographs from the source copy were replaced with original SVG illustrations because no license or attribution record was present. The original source folder was not changed.
- Google Fonts are optional. The pages have system-font fallbacks when the font service is unavailable.

## Publishing with GitHub Pages

The pages are static and can be hosted with GitHub Pages. Put this folder's contents at the repository root, then choose **Settings → Pages → Deploy from a branch**, select `main` and `/(root)`, and save. GitHub will show the published URL in the Pages settings after the first deployment.

## Technologies

Semantic HTML, responsive CSS, vanilla JavaScript, native forms/dialogs, browser `localStorage`, and the browser File API for a local-only image preview.
