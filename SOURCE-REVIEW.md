# Source review

Reviewed the original Web Development folder and created this separate copy. The source folder was not modified.

## What the source contained

- 37 top-level HTML practice pages, mostly short examples covering HTML structure and CSS fundamentals.
- `Project1`, a restaurant signup mockup with inline CSS, local food imagery, and a form action pointing to a PHP file that was not present.
- `Project2`, a fashion storefront with CSS and product photography, plus an independent Smart Crop Advisory prototype in `SIH.html`.
- Several editor-generated or personal files alongside the learning material.

## What was carried forward

- 35 general learning pages are in [`learning-exercises/`](learning-exercises/index.html), grouped by topic in the browser index.
- The restaurant concept was rebuilt as [Zeeshan Bistro](projects/zeeshan-bistro/README.md), with a mobile layout and a local-only reservation confirmation.
- The fashion concept was rebuilt as [Astic Studio](projects/astic-store/README.md), adding category/search filters, favourites, a bag, and local browser storage.
- The crop prototype was rebuilt as [CropWise](projects/cropwise/README.md). The original called a generative API with an empty key and inserted returned HTML into the page. The new demo uses labelled sample rules, safe text rendering, a local notes list, and a photo preview that never uploads or analyzes the image.
- [Focus Board](projects/focus-board/README.md) is a new task-planner project that demonstrates local state, filters, and task updates.

## Learning-page groups

### HTML structure

`Entities.html`, `Ids&Classes.html`, `inline&blockElement.html`, `Links&images.html`, `paragraph&emmet.html`, `SemanticTags.html`, `Tables&Lists.html`, `forms.html`, `tutorial.html`

### CSS foundations

`boxModel.html`, `colorCSS.html`, `cssTypes.html`, `CSSselectors.html`, `font.html`, `HWborder.html`, `links&buttons.html`, `selectorsCSS.html`, `shadow.html`, `customVariables.html`

### Layout and responsive design

`displayCSS.html`, `flexbox.html`, `float&clear.html`, `Grid.html`, `gridRowGap.html`, `MediaQuaries.html`, `navigationMenu.html`, `position.html`, `units&responsiveDesign.html`, `visiblity&Z-index.html`

### Effects and selectors

`animation.html`, `before&afterPseudo.html`, `pseudoSelectors.html`, `transform.html`, `transition.html`

### Tools

`developerTools.html`

## Copy adjustments and omissions

- Two personally addressed practice pages and the personal photo were not copied.
- `.vs`/`.vscode` editor state and the local `.hintrc` configuration were not copied.
- Missing image references were replaced with a generic SVG illustration. The personal photo formerly used by `HWborder.html` was replaced by the same illustration.
- Broken root-relative exercise links were made relative. Missing `tutorial.css` and `tutorial.js` files were supplied so the example works as written.
- The external random-photo background in `before&afterPseudo.html` was replaced with a CSS gradient.
- Names and personal references within general practice examples were replaced with sample content.
- Source product and dessert photographs were replaced in this copy with original SVG illustrations because the source folder contained no image license or attribution records. The original source files remain untouched.

The learning pages remain examples rather than polished production pages; the four projects are the finished portfolio pieces.
