const DEFAULT_LESSONS = [
  { id: "zh_wo", type: "chinese", display: "我", hint: "ㄨㄛˇ", meaning: "I / me", speakText: "我", lang: "zh-TW" },
  { id: "zh_ni", type: "chinese", display: "你", hint: "ㄋㄧˇ", meaning: "you", speakText: "你", lang: "zh-TW" },
  { id: "zh_ai", type: "chinese", display: "愛", hint: "ㄞˋ", meaning: "love", speakText: "愛", lang: "zh-TW" },
  { id: "zh_ren", type: "chinese", display: "人", hint: "ㄖㄣˊ", meaning: "person", speakText: "人", lang: "zh-TW" },
  { id: "bo_po", type: "bopomofo", display: "ㄅ", hint: "波", meaning: "bopomofo", speakText: "波", lang: "zh-TW" },
  { id: "po_po", type: "bopomofo", display: "ㄆ", hint: "坡", meaning: "bopomofo", speakText: "坡", lang: "zh-TW" },
  { id: "mo_mo", type: "bopomofo", display: "ㄇ", hint: "摸", meaning: "bopomofo", speakText: "摸", lang: "zh-TW" },
  { id: "fo_fo", type: "bopomofo", display: "ㄈ", hint: "佛", meaning: "bopomofo", speakText: "佛", lang: "zh-TW" },
  { id: "en_apple", type: "english", display: "apple", hint: "apple", meaning: "蘋果", speakText: "apple", lang: "en-US" },
  { id: "en_book", type: "english", display: "book", hint: "book", meaning: "書", speakText: "book", lang: "en-US" },
  { id: "en_cat", type: "english", display: "cat", hint: "cat", meaning: "貓", speakText: "cat", lang: "en-US" },
  { id: "en_dog", type: "english", display: "dog", hint: "dog", meaning: "狗", speakText: "dog", lang: "en-US" }
];

const TYPE_LABEL = {
  chinese: "中文",
  bopomofo: "注音",
  english: "英文"
};

const PROGRESS_KEY = "bula-teach-progress-v1";
const CUSTOM_LESSONS_KEY = "bula-teach-custom-lessons-v1";

const state = {
  filter: "all",
  index: 0,
  drawing: false,
  customLessons: loadCustomLessons(),
  completed: new Set(loadProgress())
};

const els = {
  offlineStatus: document.querySelector("#offlineStatus"),
  lessonList: document.querySelector("#lessonList"),
  itemType: document.querySelector("#itemType"),
  itemTitle: document.querySelector("#itemTitle"),
  hintText: document.querySelector("#hintText"),
  meaningText: document.querySelector("#meaningText"),
  traceText: document.querySelector("#traceText"),
  canvas: document.querySelector("#traceCanvas"),
  speakButton: document.querySelector("#speakButton"),
  clearButton: document.querySelector("#clearButton"),
  doneButton: document.querySelector("#doneButton"),
  prevButton: document.querySelector("#prevButton"),
  nextButton: document.querySelector("#nextButton"),
  addLessonForm: document.querySelector("#addLessonForm"),
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
    return Array.isArray(items) ? items.filter(isValidLesson) : [];
  } catch {
    return [];
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

function visibleLessons() {
  const lessons = allLessons();
  return state.filter === "all" ? lessons : lessons.filter((item) => item.type === state.filter);
}

function currentItem() {
  const items = visibleLessons();
  return items[Math.min(state.index, items.length - 1)] || allLessons()[0];
}

function createLessonButton(lesson, index, activeId) {
  const button = document.createElement("button");
  button.className = `lesson-item${lesson.id === activeId ? " is-active" : ""}`;
  button.type = "button";

  const glyph = document.createElement("span");
  glyph.className = "lesson-glyph";
  glyph.textContent = lesson.display;

  const meta = document.createElement("span");
  meta.className = "lesson-meta";

  const title = document.createElement("strong");
  title.textContent = lesson.hint || lesson.display;

  const detail = document.createElement("span");
  detail.textContent = lesson.meaning || TYPE_LABEL[lesson.type];

  const done = document.createElement("span");
  done.className = "done-mark";
  done.textContent = state.completed.has(lesson.id) ? "✓" : lesson.custom ? "+" : "";

  meta.append(title, detail);
  button.append(glyph, meta, done);
  button.addEventListener("click", () => selectItem(index));
  return button;
}

function renderLessonList() {
  const item = currentItem();
  els.lessonList.innerHTML = "";

  visibleLessons().forEach((lesson, index) => {
    els.lessonList.append(createLessonButton(lesson, index, item.id));
  });
}

function renderCurrentItem() {
  const item = currentItem();
  els.itemType.textContent = TYPE_LABEL[item.type];
  els.itemTitle.textContent = item.display;
  els.hintText.textContent = item.hint || item.display;
  els.meaningText.textContent = item.meaning || TYPE_LABEL[item.type];
  els.traceText.textContent = item.display;
  els.traceText.classList.toggle("english", item.type === "english");
  els.doneButton.textContent = state.completed.has(item.id) ? "已完成" : "完成";
  renderLessonList();
  clearCanvas();
}

function selectItem(index) {
  state.index = index;
  renderCurrentItem();
}

function moveItem(direction) {
  const items = visibleLessons();
  state.index = (state.index + direction + items.length) % items.length;
  renderCurrentItem();
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
  if (!("speechSynthesis" in window)) {
    window.alert("這個瀏覽器不支援文字轉語音。");
    return;
  }

  window.speechSynthesis.cancel();
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
  renderCurrentItem();
}

function langForType(type) {
  return type === "english" ? "en-US" : "zh-TW";
}

function meaningForType(type) {
  return type === "english" ? "custom word" : TYPE_LABEL[type];
}

function addCustomLesson(event) {
  event.preventDefault();

  const display = els.customText.value.trim();
  if (!display) return;

  const type = els.customType.value;
  const hint = els.customHint.value.trim() || display;
  const speakText = els.customSpeak.value.trim() || hint || display;
  const lesson = {
    id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type,
    display,
    hint,
    meaning: meaningForType(type),
    speakText,
    lang: langForType(type),
    custom: true
  };

  state.customLessons.push(lesson);
  saveCustomLessons();
  els.addLessonForm.reset();
  els.customType.value = type;
  state.filter = type;
  state.index = visibleLessons().length - 1;
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.filter === type);
  });
  renderCurrentItem();
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

els.addLessonForm.addEventListener("submit", addCustomLesson);
els.canvas.addEventListener("pointerdown", startDrawing);
els.canvas.addEventListener("pointermove", draw);
els.canvas.addEventListener("pointerup", stopDrawing);
els.canvas.addEventListener("pointercancel", stopDrawing);
els.speakButton.addEventListener("click", speakCurrent);
els.clearButton.addEventListener("click", clearCanvas);
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
renderCurrentItem();
updateOnlineStatus();
registerServiceWorker();
