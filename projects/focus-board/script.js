const storageKey = "focus-board-tasks-v1";
const labels = { focus: "Focus", learning: "Learning", life: "Life" };
const today = new Date();
const dayStamp = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
const starterTasks = [
  { id: "starter-1", title: "Choose one thing to finish today", category: "focus", date: dayStamp(today), done: false },
  { id: "starter-2", title: "Spend a few minutes learning something", category: "learning", date: dayStamp(today), done: false },
  { id: "starter-3", title: "Leave a little room to recharge", category: "life", date: dayStamp(tomorrow), done: true },
];
const safeRead = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    if (!Array.isArray(stored)) return starterTasks;
    return stored.filter((task) => task && typeof task.id === "string" && typeof task.title === "string" && Object.hasOwn(labels, task.category) && typeof task.done === "boolean" && (task.date === "" || /^\d{4}-\d{2}-\d{2}$/.test(task.date)))
      .map((task) => ({ id: task.id.slice(0, 80), title: task.title.slice(0, 90), category: task.category, date: task.date, done: task.done }));
  } catch { return starterTasks; }
};
let tasks = safeRead();
let activeFilter = "all";
const list = document.querySelector("#task-list");
const dateInput = document.querySelector("#task-date");

function setToday() {
  const formatted = new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" }).format(today);
  document.querySelector("#today-label").textContent = formatted;
  dateInput.min = dayStamp(today);
  dateInput.value = dayStamp(today);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning,<br><em>make room for what matters.</em>" : hour < 18 ? "Good afternoon,<br><em>make room for what matters.</em>" : "Good evening,<br><em>make room for what matters.</em>";
  document.querySelector("#greeting").innerHTML = greeting;
}

function save() {
  try { localStorage.setItem(storageKey, JSON.stringify(tasks)); } catch { /* The board remains usable for this visit. */ }
}

function formatDueDate(value) {
  if (!value) return "No date";
  const due = new Date(`${value}T12:00:00`);
  if (value === dayStamp(today)) return "Today";
  const next = new Date(today); next.setDate(today.getDate() + 1);
  if (value === dayStamp(next)) return "Tomorrow";
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(due);
}

function render() {
  const shown = tasks.filter((task) => activeFilter === "all" || (activeFilter === "open" && !task.done) || (activeFilter === "done" && task.done));
  list.replaceChildren();
  shown.forEach((task) => {
    const row = document.createElement("article");
    row.className = `task-row${task.done ? " is-done" : ""}`;
    const checkbox = document.createElement("input");
    checkbox.className = "task-check"; checkbox.type = "checkbox"; checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `${task.done ? "Mark incomplete" : "Mark complete"}: ${task.title}`);
    checkbox.addEventListener("change", () => { task.done = checkbox.checked; save(); render(); });
    const main = document.createElement("div"); main.className = "task-main";
    const title = document.createElement("p"); title.className = "task-title"; title.textContent = task.title;
    const tags = document.createElement("div"); tags.className = "task-tags";
    const category = document.createElement("span"); category.className = `category-tag ${task.category}`; category.textContent = labels[task.category];
    tags.append(category); main.append(title, tags);
    const due = document.createElement("span");
    const isToday = task.date === dayStamp(today);
    due.className = `due-date${isToday ? " is-today" : ""}`; due.textContent = formatDueDate(task.date);
    const remove = document.createElement("button"); remove.className = "delete-task"; remove.type = "button"; remove.textContent = "×"; remove.setAttribute("aria-label", `Delete task: ${task.title}`);
    remove.addEventListener("click", () => { tasks = tasks.filter((item) => item.id !== task.id); save(); render(); });
    row.append(checkbox, main, due, remove); list.append(row);
  });
  document.querySelector("#empty-state").hidden = shown.length > 0;
  const open = tasks.filter((task) => !task.done).length;
  const done = tasks.filter((task) => task.done).length;
  const todayTasks = tasks.filter((task) => task.date === dayStamp(today));
  const todayDone = todayTasks.filter((task) => task.done).length;
  const progress = todayTasks.length ? Math.round((todayDone / todayTasks.length) * 100) : 0;
  document.querySelector("#open-count").textContent = open;
  document.querySelector("#done-count").textContent = done;
  document.querySelector("#progress-copy").textContent = `${progress}%`;
  document.querySelector("#progress-bar").style.width = `${progress}%`;
  document.querySelector("#progress-message").textContent = progress === 100 ? "You made space for what matters." : progress > 0 ? "A good start. Keep your own pace." : "Start with one small thing.";
}

document.querySelector("#task-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const title = String(data.get("title")).trim();
  if (!title) return;
  tasks.unshift({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, title: title.slice(0, 90), category: String(data.get("category")), date: String(data.get("date")), done: false });
  save(); render(); event.currentTarget.reset(); dateInput.value = dayStamp(today); document.querySelector("#task-title").focus();
});

document.querySelector(".filter-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter-tab").forEach((tab) => { const selected = tab === button; tab.classList.toggle("is-active", selected); tab.setAttribute("aria-pressed", String(selected)); });
  render();
});

setToday();
render();
