const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mainNav?.classList.toggle("is-open", !isOpen);
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
  });
});

const reservationDate = document.querySelector("#reservation-date");
if (reservationDate) {
  const today = new Date();
  reservationDate.min = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
}

document.querySelector("#reservation-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const guestName = String(data.get("name")).trim().split(/\s+/)[0];
  const date = new Date(`${data.get("date")}T12:00:00`).toLocaleDateString(undefined, { month: "long", day: "numeric" });
  const guests = data.get("guests");
  document.querySelector("#form-message").textContent = `Thanks, ${guestName}. Your request for ${guests} on ${date} is ready. This demo does not send bookings.`;
  form.reset();
  if (reservationDate) reservationDate.min = [new Date().getFullYear(), String(new Date().getMonth() + 1).padStart(2, "0"), String(new Date().getDate()).padStart(2, "0")].join("-");
});
