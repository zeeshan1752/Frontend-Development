const demoIdeas = {
  alluvial: {
    monsoon: ["Rice", "A sample choice for exploring a monsoon plan.", ["Check local planting windows", "Review drainage and field preparation", "Ask a local advisor about varieties"]],
    winter: ["Wheat", "A sample choice for exploring a winter plan.", ["Check local planting windows", "Review seed and soil preparation", "Ask a local advisor about varieties"]],
    summer: ["Mung bean", "A sample choice for exploring a summer plan.", ["Check local planting windows", "Review water availability", "Ask a local advisor about varieties"]],
  },
  black: {
    monsoon: ["Soybean", "A sample choice for exploring a monsoon plan.", ["Check local planting windows", "Review drainage and field preparation", "Ask a local advisor about varieties"]],
    winter: ["Chickpea", "A sample choice for exploring a winter plan.", ["Check local planting windows", "Review seed and soil preparation", "Ask a local advisor about varieties"]],
    summer: ["Mung bean", "A sample choice for exploring a summer plan.", ["Check local planting windows", "Review water availability", "Ask a local advisor about varieties"]],
  },
  sandy: {
    monsoon: ["Pearl millet", "A sample choice for exploring a monsoon plan.", ["Check local planting windows", "Review water availability", "Ask a local advisor about varieties"]],
    winter: ["Mustard", "A sample choice for exploring a winter plan.", ["Check local planting windows", "Review seed and soil preparation", "Ask a local advisor about varieties"]],
    summer: ["Groundnut", "A sample choice for exploring a summer plan.", ["Check local planting windows", "Review water availability", "Ask a local advisor about varieties"]],
  },
  clay: {
    monsoon: ["Maize", "A sample choice for exploring a monsoon plan.", ["Check local planting windows", "Review drainage and field preparation", "Ask a local advisor about varieties"]],
    winter: ["Lentil", "A sample choice for exploring a winter plan.", ["Check local planting windows", "Review seed and soil preparation", "Ask a local advisor about varieties"]],
    summer: ["Okra", "A sample choice for exploring a summer plan.", ["Check local planting windows", "Review water availability", "Ask a local advisor about varieties"]],
  },
};
const notesKey = "cropwise-field-notes-v1";
let previewUrl = "";
const safeReadNotes = () => {
  try { const value = JSON.parse(localStorage.getItem(notesKey)); return Array.isArray(value) ? value.filter((note) => note && typeof note.text === "string") : []; }
  catch { return []; }
};
let notes = safeReadNotes();

function updateDateLabel() {
  const label = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(new Date());
  document.querySelector("#today-label").textContent = label;
}

document.querySelector("#planner-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const [crop, description, checks] = demoIdeas[data.get("soil")][data.get("season")];
  document.querySelector("#result-placeholder").hidden = true;
  document.querySelector("#result-content").hidden = false;
  document.querySelector("#result-title").textContent = crop;
  document.querySelector("#result-description").textContent = `${description} The selected water access (${data.get("water")}) is included in the form to show a complete field profile.`;
  const list = document.querySelector("#result-list");
  list.replaceChildren(...checks.map((item) => { const li = document.createElement("li"); li.textContent = item; return li; }));
});

function saveNotes() {
  try { localStorage.setItem(notesKey, JSON.stringify(notes)); } catch { /* Notes remain visible until this page is closed. */ }
}

function renderNotes() {
  const container = document.querySelector("#saved-notes");
  const empty = document.querySelector("#notes-empty");
  empty.hidden = notes.length > 0;
  document.querySelector("#note-count").textContent = `${notes.length} saved`;
  container.querySelectorAll(".saved-note").forEach((note) => note.remove());
  notes.slice().reverse().forEach((note) => {
    const article = document.createElement("article");
    article.className = "saved-note";
    const body = document.createElement("p");
    body.textContent = note.text;
    const footer = document.createElement("footer");
    const date = document.createElement("span");
    date.textContent = note.date;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", "Remove saved field note");
    remove.addEventListener("click", () => { notes = notes.filter((item) => item.id !== note.id); saveNotes(); renderNotes(); });
    footer.append(date, remove);
    article.append(body, footer);
    container.append(article);
  });
}

const noteText = document.querySelector("#note-text");
noteText.addEventListener("input", () => { document.querySelector("#character-count").textContent = `${noteText.value.length} / 280`; });
document.querySelector("#note-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const text = noteText.value.trim();
  if (!text) return;
  notes.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, date: new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date()) });
  saveNotes();
  renderNotes();
  event.currentTarget.reset();
  document.querySelector("#character-count").textContent = "0 / 280";
});

document.querySelector(".mobile-menu").addEventListener("click", () => document.querySelector(".sidebar").classList.toggle("is-open"));
document.querySelector(".sidebar nav").addEventListener("click", (event) => { if (event.target.closest("a")) document.querySelector(".sidebar").classList.remove("is-open"); });

document.querySelector("#plant-photo-input").addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  const status = document.querySelector("#photo-status");
  const preview = document.querySelector("#photo-preview");
  if (!file) return;
  if (!file.type.startsWith("image/")) { status.textContent = "Choose an image file to preview."; event.target.value = ""; return; }
  if (file.size > 10 * 1024 * 1024) { status.textContent = "Choose an image smaller than 10 MB."; event.target.value = ""; return; }
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = URL.createObjectURL(file);
  document.querySelector("#preview-image").src = previewUrl;
  document.querySelector("#preview-image").alt = `Selected plant photo preview: ${file.name}`;
  document.querySelector("#preview-caption").textContent = file.name;
  preview.hidden = false;
  status.textContent = "Preview ready. This photo is not uploaded or analyzed.";
});
document.querySelector("#clear-photo").addEventListener("click", () => {
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = "";
  document.querySelector("#plant-photo-input").value = "";
  document.querySelector("#preview-image").removeAttribute("src");
  document.querySelector("#photo-preview").hidden = true;
  document.querySelector("#photo-status").textContent = "No photo selected.";
});
updateDateLabel();
renderNotes();
