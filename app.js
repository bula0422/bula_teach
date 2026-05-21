const LESSONS = [
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

const STORAGE_KEY = "bula-teach-progress-v1";

const state = {
  filter: "all",
  index: 0,
  drawing: false,
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
  nextButton: document.querySelector("#nextButton")
};

const ctx = els.canvas.getContext("2d");

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.completed]));
}

function visibleLessons() {
  return state.filter === "all" ? LESSONS : LESSONS.filter((item) => item.type === state.filter);
}

function currentItem() {
  const items = visibleLessons();
  return items[Math.min(state.index, items.length - 1)] || LESSONS[0];
}

function renderLessonList() {
  const item = currentItem();
  els.lessonList.innerHTML = "";

  visibleLessons().forEach((lesson, index) => {
    const button = document.createElement("button");
    button.className = `lesson-item${lesson.id === item.id ? " is-active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="lesson-glyph">${lesson.display}</span>
      <span class="lesson-meta">
        <strong>${lesson.hint}</strong>
        <span>${lesson.meaning}</span>
      </span>
      <span class="done-mark">${state.completed.has(lesson.id) ? "✓" : ""}</span>
    `;
    button.addEventListener("click", () => selectItem(index));
    els.lessonList.append(button);
  });
}

function renderCurrentItem() {
  const item = currentItem();
  els.itemType.textContent = TYPE_LABEL[item.type];
  els.itemTitle.textContent = item.display;
  els.hintText.textContent = item.hint;
  els.meaningText.textContent = item.meaning;
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
  const utterance = new SpeechSynthesisUtterance(item.speakText);
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
