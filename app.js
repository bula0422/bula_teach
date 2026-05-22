const BOPOMOFO_LESSONS = [
  ["ㄅ", "F1.WAV"],
  ["ㄆ", "F2.WAV"],
  ["ㄇ", "F3.WAV"],
  ["ㄈ", "F4.WAV"],
  ["ㄉ", "F5.WAV"],
  ["ㄊ", "F6.WAV"],
  ["ㄋ", "F7.WAV"],
  ["ㄌ", "F8.WAV"],
  ["ㄍ", "F9.WAV"],
  ["ㄎ", "F10.WAV"],
  ["ㄏ", "F11.WAV"],
  ["ㄐ", "F12.WAV"],
  ["ㄑ", "F13.WAV"],
  ["ㄒ", "F14.WAV"],
  ["ㄓ", "F15.WAV"],
  ["ㄔ", "F16.WAV"],
  ["ㄕ", "F17.WAV"],
  ["ㄖ", "F18.WAV"],
  ["ㄗ", "F19.WAV"],
  ["ㄘ", "F20.WAV"],
  ["ㄙ", "F21.WAV"],
  ["ㄧ", "F22.WAV"],
  ["ㄨ", "F23.WAV"],
  ["ㄩ", "F24.WAV"],
  ["ㄚ", "F25.WAV"],
  ["ㄛ", "F26.WAV"],
  ["ㄜ", "F27.WAV"],
  ["ㄝ", "F28.WAV"],
  ["ㄞ", "F29.WAV"],
  ["ㄟ", "F30.WAV"],
  ["ㄠ", "F31.WAV"],
  ["ㄡ", "F32.WAV"],
  ["ㄢ", "F33.WAV"],
  ["ㄣ", "F34.WAV"],
  ["ㄤ", "F35.WAV"],
  ["ㄥ", "F36.WAV"],
  ["ㄦ", "F37.WAV"]
].map(([symbol, file], index) => ({
  id: `bpmf_${index + 1}`,
  type: "bopomofo",
  display: symbol,
  hint: symbol,
  meaning: "教育部注音發音",
  speakText: symbol,
  lang: "zh-TW",
  audioUrl: `./assets/audio/bopomofo/${file}`
}));

const ENGLISH_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").flatMap((letter) => [
  {
    id: `en_upper_${letter.toLowerCase()}`,
    type: "english",
    display: letter,
    hint: `${letter} uppercase`,
    meaning: "大寫字母",
    speakText: letter,
    lang: "en-US"
  },
  {
    id: `en_lower_${letter.toLowerCase()}`,
    type: "english",
    display: letter.toLowerCase(),
    hint: `${letter.toLowerCase()} lowercase`,
    meaning: "小寫字母",
    speakText: letter.toLowerCase(),
    lang: "en-US"
  }
]);

const DEFAULT_LESSONS = [
  { id: "zh_wo", type: "chinese", display: "我", hint: "ㄨㄛˇ", meaning: "I / me", speakText: "我", lang: "zh-TW" },
  { id: "zh_ni", type: "chinese", display: "你", hint: "ㄋㄧˇ", meaning: "you", speakText: "你", lang: "zh-TW" },
  { id: "zh_ai", type: "chinese", display: "愛", hint: "ㄞˋ", meaning: "love", speakText: "愛", lang: "zh-TW" },
  { id: "zh_ren", type: "chinese", display: "人", hint: "ㄖㄣˊ", meaning: "person", speakText: "人", lang: "zh-TW" },
  ...BOPOMOFO_LESSONS,
  { id: "en_apple", type: "english", display: "apple", hint: "apple", meaning: "蘋果", speakText: "apple", lang: "en-US" },
  { id: "en_book", type: "english", display: "book", hint: "book", meaning: "書", speakText: "book", lang: "en-US" },
  { id: "en_cat", type: "english", display: "cat", hint: "cat", meaning: "貓", speakText: "cat", lang: "en-US" },
  { id: "en_dog", type: "english", display: "dog", hint: "dog", meaning: "狗", speakText: "dog", lang: "en-US" },
  ...ENGLISH_LETTERS
];

const TYPE_LABEL = {
  chinese: "中文",
  bopomofo: "注音",
  english: "英文"
};

const PROGRESS_KEY = "bula-teach-progress-v1";
const CUSTOM_LESSONS_KEY = "bula-teach-custom-lessons-v1";
const SETTINGS_KEY = "bula-teach-settings-v1";

const DEFAULT_SETTINGS = {
  autoPlay: false,
  showTemplate: true
};

const state = {
  filter: "all",
  index: 0,
  drawing: false,
  editingId: null,
  customLessons: loadCustomLessons(),
  completed: new Set(loadProgress()),
  settings: loadSettings()
};

const els = {
  offlineStatus: document.querySelector("#offlineStatus"),
  lessonList: document.querySelector("#lessonList"),
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
  settingsButton: document.querySelector("#settingsButton"),
  settingsPanel: document.querySelector("#settingsPanel"),
  autoPlayToggle: document.querySelector("#autoPlayToggle"),
  templateToggle: document.querySelector("#templateToggle"),
  doneButton: document.querySelector("#doneButton"),
  prevButton: document.querySelector("#prevButton"),
  nextButton: document.querySelector("#nextButton"),
  lessonForm: document.querySelector("#lessonForm"),
  formTitle: document.querySelector("#formTitle"),
  saveLessonButton: document.querySelector("#saveLessonButton"),
  cancelEditButton: document.querySelector("#cancelEditButton"),
  customText: document.querySelector("#customText"),
  customType: document.querySelector("#customType"),
  customHint: document.querySelector("#customHint"),
  customSpeak: document.querySelector("#customSpeak")
};

const ctx = els.canvas.getContext("2d");

function allLessons() {
  return [...DEFAULT_LESSONS, ...state.customLessons];
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]");
  } catch {
    return [];
  }
}

function loadCustomLessons() {
  try {
    const items = JSON.parse(localStorage.getItem(CUSTOM_LESSONS_KEY) || "[]");
    return Array.isArray(items) ? items.filter(isValidLesson).map((item) => ({ ...item, custom: true })) : [];
  } catch {
    return [];
  }
}

function loadSettings() {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function isValidLesson(item) {
  return item && TYPE_LABEL[item.type] && typeof item.display === "string" && item.display.trim();
}

function saveProgress() {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify([...state.completed]));
}

function saveCustomLessons() {
  localStorage.setItem(CUSTOM_LESSONS_KEY, JSON.stringify(state.customLessons));
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function visibleLessons() {
  const lessons = allLessons();
  return state.filter === "all" ? lessons : lessons.filter((item) => item.type === state.filter);
}

function currentItem() {
  const items = visibleLessons();
  return items[Math.min(state.index, items.length - 1)] || allLessons()[0];
}

function findVisibleIndexById(id) {
  return Math.max(0, visibleLessons().findIndex((item) => item.id === id));
}

function createText(className, text) {
  const node = document.createElement("span");
  node.className = className;
  node.textContent = text;
  return node;
}

function createLessonItem(lesson, index, activeId) {
  const row = document.createElement("div");
  row.className = "lesson-item";

  const button = document.createElement("button");
  button.className = `lesson-main${lesson.id === activeId ? " is-active" : ""}`;
  button.type = "button";

  const glyph = createText(`lesson-glyph${lesson.type === "english" ? " english" : ""}`, lesson.display);
  const meta = document.createElement("span");
  meta.className = "lesson-meta";

  const title = document.createElement("strong");
  title.textContent = lesson.hint || lesson.display;

  const detail = document.createElement("span");
  detail.textContent = lesson.meaning || TYPE_LABEL[lesson.type];

  const done = createText("done-mark", state.completed.has(lesson.id) ? "✓" : lesson.custom ? "+" : "");

  meta.append(title, detail);
  button.append(glyph, meta, done);
  button.addEventListener("click", () => selectItem(index));
  row.append(button);

  if (lesson.custom) {
    const actions = document.createElement("div");
    actions.className = "lesson-actions";

    const edit = document.createElement("button");
    edit.className = "lesson-action";
    edit.type = "button";
    edit.title = "編輯字卡";
    edit.setAttribute("aria-label", `編輯 ${lesson.display}`);
    edit.textContent = "✎";
    edit.addEventListener("click", () => startEditLesson(lesson.id));

    const remove = document.createElement("button");
    remove.className = "lesson-action delete";
    remove.type = "button";
    remove.title = "刪除字卡";
    remove.setAttribute("aria-label", `刪除 ${lesson.display}`);
    remove.textContent = "×";
    remove.addEventListener("click", () => deleteCustomLesson(lesson.id));

    actions.append(edit, remove);
    row.append(actions);
  }

  return row;
}

function renderLessonList() {
  const item = currentItem();
  els.lessonList.innerHTML = "";

  visibleLessons().forEach((lesson, index) => {
    els.lessonList.append(createLessonItem(lesson, index, item.id));
  });
}

function renderSettings() {
  els.autoPlayToggle.checked = state.settings.autoPlay;
  els.templateToggle.checked = state.settings.showTemplate;
  els.traceStage.classList.toggle("template-hidden", !state.settings.showTemplate);
  els.templateButton.classList.toggle("is-active", state.settings.showTemplate);
  els.templateButton.setAttribute("aria-pressed", String(state.settings.showTemplate));
}

function renderFormMode() {
  const editing = Boolean(state.editingId);
  els.formTitle.textContent = editing ? "編輯字卡" : "新增字卡";
  els.saveLessonButton.textContent = editing ? "儲存修改" : "新增到清單";
  els.cancelEditButton.classList.toggle("is-hidden", !editing);
}

function renderCurrentItem(options = {}) {
  const item = currentItem();
  els.itemType.textContent = TYPE_LABEL[item.type];
  els.itemTitle.textContent = item.display;
  els.hintText.textContent = item.hint || item.display;
  els.meaningText.textContent = item.meaning || TYPE_LABEL[item.type];
  els.traceText.textContent = item.display;
  els.traceText.classList.toggle("english", item.type === "english");
  els.doneButton.textContent = state.completed.has(item.id) ? "已完成" : "完成";
  renderSettings();
  renderLessonList();
  clearCanvas();

  if (options.autoSpeak && state.settings.autoPlay) {
    window.setTimeout(speakCurrent, 120);
  }
}

function selectItem(index) {
  state.index = index;
  renderCurrentItem({ autoSpeak: true });
}

function moveItem(direction) {
  const items = visibleLessons();
  state.index = (state.index + direction + items.length) % items.length;
  renderCurrentItem({ autoSpeak: true });
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

function getPoint(event) {
  const rect = els.canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function startDrawing(event) {
  event.preventDefault();
  state.drawing = true;
  els.canvas.setPointerCapture(event.pointerId);
  const point = getPoint(event);
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
}

function draw(event) {
  if (!state.drawing) return;
  event.preventDefault();
  const point = getPoint(event);
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
}

function stopDrawing(event) {
  if (!state.drawing) return;
  state.drawing = false;
  els.canvas.releasePointerCapture(event.pointerId);
}

function clearCanvas() {
  const rect = els.canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  setBrush();
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
  if (!("speechSynthesis" in window)) {
    window.alert("這個瀏覽器不支援文字轉語音。");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(item.speakText || item.display);
  utterance.lang = item.lang;
  utterance.rate = item.type === "english" ? 0.82 : 0.78;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function markDone() {
  const item = currentItem();
  state.completed.add(item.id);
  saveProgress();
  renderCurrentItem();
}

function setFilter(filter) {
  state.filter = filter;
  state.index = 0;
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.filter === filter);
  });
  renderCurrentItem({ autoSpeak: true });
}

function langForType(type) {
  return type === "english" ? "en-US" : "zh-TW";
}

function meaningForType(type) {
  return type === "english" ? "custom word" : TYPE_LABEL[type];
}

function lessonFromForm(id = null) {
  const display = els.customText.value.trim();
  if (!display) return null;

  const type = els.customType.value;
  const hint = els.customHint.value.trim() || display;
  const speakText = els.customSpeak.value.trim() || hint || display;

  return {
    id: id || `custom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type,
    display,
    hint,
    meaning: meaningForType(type),
    speakText,
    lang: langForType(type),
    custom: true
  };
}

function resetLessonForm() {
  state.editingId = null;
  els.lessonForm.reset();
  renderFormMode();
}

function saveLessonFromForm(event) {
  event.preventDefault();
  const lesson = lessonFromForm(state.editingId);
  if (!lesson) return;

  if (state.editingId) {
    const index = state.customLessons.findIndex((item) => item.id === state.editingId);
    if (index >= 0) state.customLessons[index] = lesson;
  } else {
    state.customLessons.push(lesson);
  }

  saveCustomLessons();
  state.filter = lesson.type;
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.filter === lesson.type);
  });
  resetLessonForm();
  state.index = findVisibleIndexById(lesson.id);
  renderCurrentItem({ autoSpeak: true });
}

function startEditLesson(id) {
  const lesson = state.customLessons.find((item) => item.id === id);
  if (!lesson) return;

  state.editingId = id;
  els.customText.value = lesson.display;
  els.customType.value = lesson.type;
  els.customHint.value = lesson.hint || "";
  els.customSpeak.value = lesson.speakText || "";
  renderFormMode();
  els.customText.focus();
}

function deleteCustomLesson(id) {
  const lesson = state.customLessons.find((item) => item.id === id);
  if (!lesson) return;

  const confirmed = window.confirm(`刪除「${lesson.display}」？`);
  if (!confirmed) return;

  state.customLessons = state.customLessons.filter((item) => item.id !== id);
  state.completed.delete(id);
  saveCustomLessons();
  saveProgress();
  if (state.editingId === id) resetLessonForm();

  const items = visibleLessons();
  state.index = Math.min(state.index, Math.max(0, items.length - 1));
  renderCurrentItem();
}

function toggleTemplate() {
  state.settings.showTemplate = !state.settings.showTemplate;
  saveSettings();
  renderSettings();
}

function toggleSettingsPanel() {
  const hidden = els.settingsPanel.classList.toggle("is-hidden");
  els.settingsButton.setAttribute("aria-expanded", String(!hidden));
  els.settingsButton.classList.toggle("is-active", !hidden);
}

function updateSettingFromControls() {
  state.settings.autoPlay = els.autoPlayToggle.checked;
  state.settings.showTemplate = els.templateToggle.checked;
  saveSettings();
  renderSettings();
}

function updateOnlineStatus() {
  els.offlineStatus.textContent = navigator.onLine ? "可離線使用" : "離線中";
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    els.offlineStatus.textContent = "此瀏覽器不支援離線快取";
    return;
  }

  navigator.serviceWorker.register("./sw.js").then(updateOnlineStatus).catch(() => {
    els.offlineStatus.textContent = "離線快取尚未啟用";
  });
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => setFilter(tab.dataset.filter));
});

els.lessonForm.addEventListener("submit", saveLessonFromForm);
els.cancelEditButton.addEventListener("click", resetLessonForm);
els.canvas.addEventListener("pointerdown", startDrawing);
els.canvas.addEventListener("pointermove", draw);
els.canvas.addEventListener("pointerup", stopDrawing);
els.canvas.addEventListener("pointercancel", stopDrawing);
els.speakButton.addEventListener("click", speakCurrent);
els.clearButton.addEventListener("click", clearCanvas);
els.templateButton.addEventListener("click", toggleTemplate);
els.settingsButton.addEventListener("click", toggleSettingsPanel);
els.autoPlayToggle.addEventListener("change", updateSettingFromControls);
els.templateToggle.addEventListener("change", updateSettingFromControls);
els.doneButton.addEventListener("click", markDone);
els.prevButton.addEventListener("click", () => moveItem(-1));
els.nextButton.addEventListener("click", () => moveItem(1));
window.addEventListener("resize", () => {
  resizeCanvas();
  clearCanvas();
});
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

resizeCanvas();
renderFormMode();
renderCurrentItem();
updateOnlineStatus();
registerServiceWorker();
