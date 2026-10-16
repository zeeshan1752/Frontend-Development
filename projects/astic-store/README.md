# Astic Studio

A responsive boutique storefront developed from the original Astic fashion-page concept. The sample catalogue demonstrates browsing, filtering, favourites, and a small shopping-bag flow.

## What to try

- Search the five sample products by name or style.
- Filter products by category.
- Save favourites and add products to the bag.
- Change quantities, remove an item, or reload the page to see browser storage in action.
- Open the checkout message to see the demo boundary.

## How the interactions work

Product details live in one JavaScript array. The page filters that array, then renders the matching product cards. Click handling is delegated from the product grid so it continues to work when cards are replaced. The cart stores product IDs and quantities; favourites store product IDs. Both are read defensively from `localStorage`, then saved when the visitor makes a change. The cart subtotal is recalculated from the sample product data.

The cart uses the browser's native `<dialog>` element. The interaction resembles a checkout flow, but the final message makes clear that no order or payment is being sent.

## Run and files

Open `index.html` in a browser. No build step is required.

- `index.html` — storefront structure, filters, and cart dialog
- `styles.css` — responsive product cards and cart drawer
- `script.js` — sample data, search, filters, favourites, cart, and browser storage
- `assets/` — original vector product illustrations created for this collection

## Limitations and next step

This is a front-end demo with sample products and prices. It has no inventory, accounts, server, checkout, or payment provider. A real store needs a backend that validates product availability and price, plus a trusted payment service.
