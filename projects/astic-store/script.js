const products = [
  { id: "evening-edit", name: "After-hours dress", category: "women", type: "Occasion / black", price: 3890, image: "assets/black-dress.svg", badge: "THE EDIT" },
  { id: "gold-hour", name: "Golden hour gown", category: "women", type: "Occasion / gold", price: 4290, image: "assets/gold-gown.svg", badge: "A FAVORITE" },
  { id: "city-layer", name: "The city jacket", category: "men", type: "Outerwear / camel", price: 3490, image: "assets/leather-jacket.svg", badge: "JUST IN" },
  { id: "soft-form", name: "Soft-form shirt", category: "men", type: "Everyday / stone", price: 2190, image: "assets/linen-shirt.svg", badge: "EASY LAYER" },
  { id: "weekend-check", name: "Weekend check", category: "men", type: "Everyday / navy", price: 1990, image: "assets/checked-shirt.svg", badge: "THE CLASSIC" },
];
const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const storageKeys = { cart: "astic-cart-v1", favorites: "astic-favorites-v1" };
const safeRead = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const storedCart = safeRead(storageKeys.cart, {});
let cart = Object.fromEntries(products.flatMap((product) => {
  const quantity = Number(storedCart?.[product.id]);
  return Number.isSafeInteger(quantity) && quantity > 0 ? [[product.id, Math.min(quantity, 99)]] : [];
}));
const storedFavorites = safeRead(storageKeys.favorites, []);
let favorites = new Set(Array.isArray(storedFavorites) ? storedFavorites.filter((id) => products.some((product) => product.id === id)) : []);
let activeFilter = "all";
const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#product-search");
const toast = document.querySelector("#toast");
let toastTimer;

function saveState() {
  try {
    localStorage.setItem(storageKeys.cart, JSON.stringify(cart));
    localStorage.setItem(storageKeys.favorites, JSON.stringify([...favorites]));
  } catch { /* The page still works when browser storage is unavailable. */ }
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = products.filter((product) => (activeFilter === "all" || product.category === activeFilter) && `${product.name} ${product.type}`.toLowerCase().includes(query));
  grid.innerHTML = visible.map((product) => `
    <article class="product-card">
      <div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy"><span class="product-badge">${product.badge}</span>
        <button class="favorite-button ${favorites.has(product.id) ? "is-favorite" : ""}" type="button" data-favorite="${product.id}" aria-label="${favorites.has(product.id) ? "Remove" : "Add"} ${product.name} ${favorites.has(product.id) ? "from" : "to"} favourites" aria-pressed="${favorites.has(product.id)}">♥</button>
      </div>
      <div class="product-meta"><div><h3>${product.name}</h3><p>${product.type}</p></div><strong>${currency.format(product.price)}</strong></div>
      <div class="product-actions"><button class="add-button" type="button" data-add="${product.id}">Add to bag <span aria-hidden="true">+</span></button></div>
    </article>`).join("");
  document.querySelector("#empty-state").hidden = visible.length > 0;
  document.querySelector("#results-count").textContent = `${visible.length} ${visible.length === 1 ? "piece" : "pieces"}`;
}

function cartQuantity() { return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0); }
function renderCart() {
  const quantity = cartQuantity();
  document.querySelector("#cart-count").textContent = quantity;
  document.querySelector("#dialog-count").textContent = `(${quantity})`;
  const entries = products.filter((product) => cart[product.id]);
  document.querySelector("#cart-empty").hidden = entries.length > 0;
  document.querySelector("#cart-items").innerHTML = entries.map((product) => `
    <article class="cart-row"><img src="${product.image}" alt="" loading="lazy"><div><h3>${product.name}</h3><p>${currency.format(product.price)} each</p>
      <div class="quantity-controls"><button type="button" data-quantity="-1" data-id="${product.id}" aria-label="Remove one ${product.name}">−</button><span>${cart[product.id]}</span><button type="button" data-quantity="1" data-id="${product.id}" aria-label="Add one ${product.name}">+</button></div>
      <button class="remove-item" type="button" data-remove="${product.id}">Remove</button></div><strong>${currency.format(product.price * cart[product.id])}</strong></article>`).join("");
  const total = entries.reduce((sum, product) => sum + product.price * cart[product.id], 0);
  document.querySelector("#cart-total").textContent = currency.format(total);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

document.querySelector(".filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter-button").forEach((item) => {
    const selected = item === button;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  renderProducts();
});
searchInput.addEventListener("input", renderProducts);
grid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const favoriteButton = event.target.closest("[data-favorite]");
  if (addButton) {
    const id = addButton.dataset.add;
    cart[id] = (cart[id] ?? 0) + 1;
    saveState(); renderCart(); showToast(`${products.find((item) => item.id === id).name} added to your bag`);
  }
  if (favoriteButton) {
    const id = favoriteButton.dataset.favorite;
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    saveState(); renderProducts();
  }
});

document.querySelector("#cart-items").addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) {
    const id = quantityButton.dataset.id;
    cart[id] = Math.max(0, (cart[id] ?? 0) + Number(quantityButton.dataset.quantity));
    if (cart[id] === 0) delete cart[id];
  }
  if (removeButton) delete cart[removeButton.dataset.remove];
  saveState(); renderCart();
});

const cartDialog = document.querySelector("#cart-dialog");
document.querySelector("#open-cart").addEventListener("click", () => cartDialog.showModal());
document.querySelector("#close-cart").addEventListener("click", () => cartDialog.close());
cartDialog.addEventListener("click", (event) => { if (event.target === cartDialog) cartDialog.close(); });
document.querySelector("#checkout-button").addEventListener("click", () => {
  document.querySelector("#cart-note").textContent = "Your selection is saved in this browser. Checkout and payment are not connected in this demo.";
});

renderProducts();
renderCart();





