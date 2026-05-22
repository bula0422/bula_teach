const BOPOMOFO_BASE = [
  ["ㄅ", "F1.WAV"], ["ㄆ", "F2.WAV"], ["ㄇ", "F3.WAV"], ["ㄈ", "F4.WAV"],
  ["ㄉ", "F5.WAV"], ["ㄊ", "F6.WAV"], ["ㄋ", "F7.WAV"], ["ㄌ", "F8.WAV"],
  ["ㄍ", "F9.WAV"], ["ㄎ", "F10.WAV"], ["ㄏ", "F11.WAV"], ["ㄐ", "F12.WAV"],
  ["ㄑ", "F13.WAV"], ["ㄒ", "F14.WAV"], ["ㄓ", "F15.WAV"], ["ㄔ", "F16.WAV"],
  ["ㄕ", "F17.WAV"], ["ㄖ", "F18.WAV"], ["ㄗ", "F19.WAV"], ["ㄘ", "F20.WAV"],
  ["ㄙ", "F21.WAV"], ["ㄧ", "F22.WAV"], ["ㄨ", "F23.WAV"], ["ㄩ", "F24.WAV"],
  ["ㄚ", "F25.WAV"], ["ㄛ", "F26.WAV"], ["ㄜ", "F27.WAV"], ["ㄝ", "F28.WAV"],
  ["ㄞ", "F29.WAV"], ["ㄟ", "F30.WAV"], ["ㄠ", "F31.WAV"], ["ㄡ", "F32.WAV"],
  ["ㄢ", "F33.WAV"], ["ㄣ", "F34.WAV"], ["ㄤ", "F35.WAV"], ["ㄥ", "F36.WAV"],
  ["ㄦ", "F37.WAV"]
].map(([symbol, file], index) => ({
  id: `bpmf_${index + 1}`,
  category: "bopomofo",
  display: symbol,
  hint: symbol,
  meaning: "教育部注音發音",
  speakText: symbol,
  lang: "zh-TW",
  audioUrl: `./assets/audio/bopomofo/${file}`
}));

const LETTER_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").flatMap((letter) => [
  { id: `letter_upper_${letter.toLowerCase()}`, category: "letter", display: letter, hint: "大寫", meaning: `uppercase ${letter}`, speakText: letter, lang: "en-US" },
  { id: `letter_lower_${letter.toLowerCase()}`, category: "letter", display: letter.toLowerCase(), hint: "小寫", meaning: `lowercase ${letter.toLowerCase()}`, speakText: letter.toLowerCase(), lang: "en-US" }
]);

const BASE_LESSONS = [
  ...BOPOMOFO_BASE,
  ...LETTER_BASE,
  { id: "hanzi_wo", category: "hanzi", display: "我", hint: "ㄨㄛˇ", meaning: "I / me", speakText: "我", lang: "zh-TW" },
  { id: "hanzi_ni", category: "hanzi", display: "你", hint: "ㄋㄧˇ", meaning: "you", speakText: "你", lang: "zh-TW" },
  { id: "hanzi_ai", category: "hanzi", display: "愛", hint: "ㄞˋ", meaning: "love", speakText: "愛", lang: "zh-TW" },
  { id: "hanzi_ren", category: "hanzi", display: "人", hint: "ㄖㄣˊ", meaning: "person", speakText: "人", lang: "zh-TW" },
  { id: "word_apple", category: "word", display: "apple", hint: "[ˋæpəl]", meaning: "蘋果", speakText: "apple", lang: "en-US" },
  { id: "word_book", category: "word", display: "book", hint: "[bʊk]", meaning: "書", speakText: "book", lang: "en-US" },
  { id: "word_cat", category: "word", display: "cat", hint: "[kæt]", meaning: "貓", speakText: "cat", lang: "en-US" },
  { id: "word_dog", category: "word", display: "dog", hint: "[dɔg]", meaning: "狗", speakText: "dog", lang: "en-US" }
];

const CATEGORY_LABELS = {
  bopomofo: "注音",
  letter: "字母",
  hanzi: "國字",
  word: "英文單字"
};
const CATEGORY_ORDER = ["bopomofo", "letter", "hanzi", "word"];
const LESSONS_KEY = "bula-teach-lessons-v2";
const SETTINGS_KEY = "bula-teach-settings-v1";
const DEFAULT_SETTINGS = { autoPlay: false, showTemplate: true };

const state = {
  lessons: loadLessons(),
  category: "bopomofo",
  index: 0,
  drawing: false,
  editingId: null,
  settings: loadSettings()
};

const els = {
  offlineStatus: document.querySelector("#offlineStatus"),
  categoryList: document.querySelector("#categoryList"),
  itemType: document.querySelector("#itemType"),
  itemTitle: document.querySelector("#itemTitle"),
  hintText: document.querySelector("#hintText"),
  meaningText: document.querySelector("#meaningText"),
  traceStage: document.querySelector("#traceStage"),
  traceText: document.querySelector("#traceText"),
  canvas: document.querySelector("#traceCanvas"),
  speakButton: document.querySelector("#speakButton"),
  clearButton: document.querySelector("#clearButton"),
  templateButton: document.querySelector("#templateButton"),
  prevButton: document.querySelector("#prevButton"),
  nextButton: document.querySelector("#nextButton"),
  manageButton: document.querySelector("#manageButton"),
  manageDialog: document.querySelector("#manageDialog"),
  closeManageButton: document.querySelector("#closeManageButton"),
  lessonForm: document.querySelector("#lessonForm"),
  formTitle: document.querySelector("#formTitle"),
  saveLessonButton: document.querySelector("#saveLessonButton"),
  cancelEditButton: document.querySelector("#cancelEditButton"),
  customText: document.querySelector("#customText"),
  customCategory: document.querySelector("#customCategory"),
  customHint: document.querySelector("#customHint"),
  customMeaning: document.querySelector("#customMeaning"),
  customSpeak: document.querySelector("#customSpeak"),
  customList: document.querySelector("#customList"),
  settingsButton: document.querySelector("#settingsButton"),
  settingsDialog: document.querySelector("#settingsDialog"),
  closeSettingsButton: document.querySelector("#closeSettingsButton"),
  autoPlayToggle: document.querySelector("#autoPlayToggle")
};
const ctx = els.canvas.getContext("2d");

function normalizeLegacyLesson(item) {
  const category = item.category || (item.type === "bopomofo" ? "bopomofo" : item.type === "chinese" ? "hanzi" : "word");
  return { ...item, category, lang: item.lang || (category === "word" || category === "letter" ? "en-US" : "zh-TW") };
}

function loadLessons() {
  const fixedLessons = BASE_LESSONS.filter((item) => item.category === "bopomofo" || item.category === "letter").map((item) => ({ ...item }));
  const editableDefaults = BASE_LESSONS.filter((item) => item.category === "hanzi" || item.category === "word");

  try {
    const saved = JSON.parse(localStorage.getItem(LESSONS_KEY) || "null");
    if (Array.isArray(saved) && saved.length) {
      const editable = saved.map(normalizeLegacyLesson).filter(isEditableLesson);
      return [...fixedLessons, ...editable];
    }
  } catch {}

  return [...fixedLessons, ...editableDefaults.map((item) => ({ ...item }))];
}

function loadSettings() {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function isValidLesson(item) {
  return item && CATEGORY_LABELS[item.category] && typeof item.display === "string" && item.display.trim();
}

function isEditableLesson(item) {
  return isValidLesson(item) && (item.category === "hanzi" || item.category === "word");
}

function saveLessons() {
  localStorage.setItem(LESSONS_KEY, JSON.stringify(state.lessons.filter(isEditableLesson)));
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function lessonsFor(category = state.category) {
  return state.lessons.filter((item) => item.category === category);
}

function currentItem() {
  const items = lessonsFor();
  return items[Math.min(state.index, items.length - 1)] || state.lessons[0];
}

function makeSpan(className, text) {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  return span;
}

function renderCategoryList() {
  const current = currentItem();
  els.categoryList.innerHTML = "";
  CATEGORY_ORDER.forEach((category) => {
    const section = document.createElement("section");
    section.className = "category-section";
    const header = document.createElement("button");
    header.className = `category-header${state.category === category ? " is-open" : ""}`;
    header.type = "button";
    header.textContent = `${CATEGORY_LABELS[category]} (${lessonsFor(category).length})`;
    header.addEventListener("click", () => {
      state.category = category;
      state.index = 0;
      renderCurrent({ autoSpeak: true });
    });
    section.append(header);

    if (state.category === category) {
      const list = document.createElement("div");
      list.className = "category-items";
      lessonsFor(category).forEach((lesson, index) => {
        const button = document.createElement("button");
        button.className = `card-row${lesson.id === current.id ? " is-active" : ""}`;
        button.type = "button";
        button.append(
          makeSpan(`card-symbol ${category}`, lesson.display),
          makeSpan("card-copy", lesson.hint || lesson.meaning || lesson.display)
        );
        button.addEventListener("click", () => {
          state.index = index;
          renderCurrent({ autoSpeak: true });
        });
        list.append(button);
      });
      section.append(list);
    }
    els.categoryList.append(section);
  });
}

function renderCustomList() {
  els.customList.innerHTML = "";
  state.lessons.filter(isEditableLesson).forEach((lesson) => {
    const row = document.createElement("div");
    row.className = "manage-row";
    const info = document.createElement("div");
    info.className = "manage-info";
    info.append(makeSpan("manage-title", lesson.display), makeSpan("manage-meta", `${CATEGORY_LABELS[lesson.category]} · ${lesson.hint || lesson.meaning || "無提示"}`));
    const edit = document.createElement("button");
    edit.className = "secondary-button mini";
    edit.type = "button";
    edit.textContent = "編輯";
    edit.addEventListener("click", () => startEdit(lesson.id));
    row.append(info, edit);
    els.customList.append(row);
  });
}

function renderSettings() {
  els.autoPlayToggle.checked = state.settings.autoPlay;
  els.traceStage.classList.toggle("template-hidden", !state.settings.showTemplate);
  els.templateButton.classList.toggle("is-active", state.settings.showTemplate);
}

function renderFormMode() {
  const editing = Boolean(state.editingId);
  els.formTitle.textContent = editing ? "編輯字卡" : "新增字卡";
  els.saveLessonButton.textContent = editing ? "儲存修改" : "新增";
  els.cancelEditButton.classList.toggle("is-hidden", !editing);
}

function renderCurrent(options = {}) {
  const item = currentItem();
  state.category = item.category;
  els.itemType.textContent = CATEGORY_LABELS[item.category];
  els.itemTitle.textContent = item.display;
  els.hintText.textContent = item.hint || item.display;
  els.meaningText.textContent = item.meaning || CATEGORY_LABELS[item.category];
  els.traceText.textContent = item.display;
  els.traceText.className = `trace-text ${item.category}`;
  renderSettings();
  renderCategoryList();
  renderCustomList();
  clearCanvas();
  if (options.autoSpeak && state.settings.autoPlay) window.setTimeout(speakCurrent, 120);
}

function selectRelative(direction) {
  const items = lessonsFor();
  state.index = (state.index + direction + items.length) % items.length;
  renderCurrent({ autoSpeak: true });
}

function resizeCanvas() {
  const rect = els.canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  els.canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  els.canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  setBrush();
}

function setBrush() {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#174b45";
  ctx.lineWidth = 11;
}

function clearCanvas() {
  const rect = els.canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  setBrush();
}

function pointFor(event) {
  const rect = els.canvas.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function startDrawing(event) {
  event.preventDefault();
  state.drawing = true;
  els.canvas.setPointerCapture(event.pointerId);
  const point = pointFor(event);
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
}

function draw(event) {
  if (!state.drawing) return;
  event.preventDefault();
  const point = pointFor(event);
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
}

function stopDrawing(event) {
  if (!state.drawing) return;
  state.drawing = false;
  els.canvas.releasePointerCapture(event.pointerId);
}

function speakCurrent() {
  const item = currentItem();
  window.speechSynthesis?.cancel();
  if (item.audioUrl) {
    const audio = new Audio(item.audioUrl);
    audio.play().catch(() => speakWithTts(item));
    return;
  }
  speakWithTts(item);
}

function speakWithTts(item) {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(item.speakText || item.display);
  utterance.lang = item.lang || (item.category === "word" || item.category === "letter" ? "en-US" : "zh-TW");
  utterance.rate = item.category === "word" || item.category === "letter" ? 0.82 : 0.78;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function langForCategory(category) {
  return category === "letter" || category === "word" ? "en-US" : "zh-TW";
}

function lessonFromForm(id = null) {
  const display = els.customText.value.trim();
  if (!display) return null;
  const category = els.customCategory.value;
  if (category !== "hanzi" && category !== "word") return null;
  const previous = id ? state.lessons.find((item) => item.id === id) : null;
  return {
    id: id || `lesson_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    category,
    display,
    hint: els.customHint.value.trim() || display,
    meaning: els.customMeaning.value.trim() || CATEGORY_LABELS[category],
    speakText: els.customSpeak.value.trim() || display,
    lang: langForCategory(category),
    audioUrl: previous && previous.category === category ? previous.audioUrl : undefined
  };
}

function saveLesson(event) {
  event.preventDefault();
  const lesson = lessonFromForm(state.editingId);
  if (!lesson) return;
  const index = state.editingId ? state.lessons.findIndex((item) => item.id === state.editingId) : -1;
  if (index >= 0) state.lessons[index] = lesson;
  else state.lessons.push(lesson);
  saveLessons();
  state.category = lesson.category;
  state.index = lessonsFor(lesson.category).findIndex((item) => item.id === lesson.id);
  resetForm();
  renderCurrent({ autoSpeak: true });
}

function startEdit(id) {
  const lesson = state.lessons.find((item) => item.id === id);
  if (!isEditableLesson(lesson)) return;
  state.editingId = id;
  els.customText.value = lesson.display;
  els.customCategory.value = lesson.category;
  els.customHint.value = lesson.hint || "";
  els.customMeaning.value = lesson.meaning || "";
  els.customSpeak.value = lesson.speakText || "";
  renderFormMode();
  els.customText.focus();
}

function resetForm() {
  state.editingId = null;
  els.lessonForm.reset();
  renderFormMode();
}

function toggleTemplate() {
  state.settings.showTemplate = !state.settings.showTemplate;
  saveSettings();
  renderSettings();
}

function updateOnlineStatus() {
  els.offlineStatus.textContent = navigator.onLine ? "可離線使用" : "離線中";
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("./sw.js").then(updateOnlineStatus).catch(() => {
    els.offlineStatus.textContent = "離線快取尚未啟用";
  });
}

els.canvas.addEventListener("pointerdown", startDrawing);
els.canvas.addEventListener("pointermove", draw);
els.canvas.addEventListener("pointerup", stopDrawing);
els.canvas.addEventListener("pointercancel", stopDrawing);
els.speakButton.addEventListener("click", speakCurrent);
els.clearButton.addEventListener("click", clearCanvas);
els.templateButton.addEventListener("click", toggleTemplate);
els.prevButton.addEventListener("click", () => selectRelative(-1));
els.nextButton.addEventListener("click", () => selectRelative(1));
els.manageButton.addEventListener("click", () => els.manageDialog.showModal());
els.closeManageButton.addEventListener("click", () => els.manageDialog.close());
els.settingsButton.addEventListener("click", () => els.settingsDialog.showModal());
els.closeSettingsButton.addEventListener("click", () => els.settingsDialog.close());
els.autoPlayToggle.addEventListener("change", () => {
  state.settings.autoPlay = els.autoPlayToggle.checked;
  saveSettings();
});
els.lessonForm.addEventListener("submit", saveLesson);
els.cancelEditButton.addEventListener("click", resetForm);
window.addEventListener("resize", () => { resizeCanvas(); clearCanvas(); });
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

resizeCanvas();
renderFormMode();
renderCurrent();
updateOnlineStatus();
registerServiceWorker();
