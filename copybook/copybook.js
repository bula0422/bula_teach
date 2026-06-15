const LESSON_DATA = window.BulaTeachLessonData || {};
const BASE_LESSONS = [
  ...(LESSON_DATA.bopomofo || []),
  ...(LESSON_DATA.letters || []),
  ...(LESSON_DATA.hanzi || []),
  ...(LESSON_DATA.words || [])
];

const CATEGORY_LABELS = {
  bopomofo: "注音",
  letter: "字母",
  hanzi: "國字",
  word: "英文單字"
};
const CATEGORY_ORDER = ["bopomofo", "letter", "hanzi", "word"];
const HANZI_PINYIN = {
  "我": "wǒ", "你": "nǐ", "他": "tā", "她": "tā", "是": "shì", "不": "bù", "有": "yǒu", "在": "zài",
  "人": "rén", "大": "dà", "小": "xiǎo", "上": "shàng", "下": "xià", "中": "zhōng", "天": "tiān", "地": "dì",
  "日": "rì", "月": "yuè", "山": "shān", "水": "shuǐ", "火": "huǒ", "木": "mù", "土": "tǔ", "金": "jīn",
  "口": "kǒu", "手": "shǒu", "目": "mù", "耳": "ěr", "足": "zú", "心": "xīn", "門": "mén", "車": "chē",
  "馬": "mǎ", "鳥": "niǎo", "魚": "yú", "蟲": "chóng", "花": "huā", "草": "cǎo", "米": "mǐ", "飯": "fàn",
  "果": "guǒ", "愛": "ài", "好": "hǎo", "來": "lái", "去": "qù", "看": "kàn", "聽": "tīng", "說": "shuō",
  "寫": "xiě", "讀": "dú", "學": "xué", "問": "wèn", "校": "xiào", "家": "jiā", "爸": "bà", "媽": "mā",
  "哥": "gē", "姐": "jiě", "弟": "dì", "妹": "mèi", "朋": "péng", "友": "yǒu", "年": "nián", "今": "jīn",
  "明": "míng", "早": "zǎo", "晚": "wǎn", "七": "qī", "一": "yī", "二": "èr", "三": "sān", "四": "sì",
  "五": "wǔ", "六": "liù", "八": "bā", "九": "jiǔ", "十": "shí", "百": "bǎi", "千": "qiān", "多": "duō",
  "少": "shǎo", "長": "cháng", "短": "duǎn", "高": "gāo", "低": "dī", "紅": "hóng", "白": "bái", "黑": "hēi",
  "藍": "lán", "綠": "lǜ", "雨": "yǔ", "風": "fēng"
};
const LESSONS_KEY = "bula-teach-lessons-v2";
const SETTINGS_KEY = "bula-teach-settings-v1";
const BACKUP_KEY = "bula-teach-backup-state-v1";
const EXPORT_VERSION = 1;
const GRID_SIZES = [2, 4, 16];
const DEFAULT_SETTINGS = { autoPlay: false, showTemplate: true, gridSize: 2 };
const HANZI_DATA_CACHE = "bula-hanzi-writer-data-v1";
const HANZI_DATA_VERSION = "2.0.1";
const HANZI_DATA_CDN = `https://cdn.jsdelivr.net/npm/hanzi-writer-data@${HANZI_DATA_VERSION}`;
const BOPOMOFO_STROKE_DATA_BASE = "../assets/bopomofo-stroke-data";
const BOPOMOFO_STROKE_DATA_VERSION = "59";
const BOPOMOFO_STROKE_LOOP_PAUSE_MS = 2000;
const BOPOMOFO_STROKE_MIN_MS = 720;
const BOPOMOFO_STROKE_MAX_MS = 1500;

const state = {
  lessons: loadLessons(),
  category: null,
  index: 0,
  drawing: false,
  editingId: null,
  search: "",
  settings: loadSettings(),
  backup: loadBackupState()
};

const els = {
  offlineStatus: document.querySelector("#offlineStatus"),
  categoryList: document.querySelector("#categoryList"),
  searchInput: document.querySelector("#searchInput"),
  itemTitle: document.querySelector("#itemTitle"),
  hintText: document.querySelector("#hintText"),
  meaningText: document.querySelector("#meaningText"),
  traceStage: document.querySelector("#traceStage"),
  traceText: document.querySelector("#traceText"),
  canvas: document.querySelector("#traceCanvas"),
  speakButton: document.querySelector("#speakButton"),
  clearButton: document.querySelector("#clearButton"),
  templateButton: document.querySelector("#templateButton"),
  gridButton: document.querySelector("#gridButton"),
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
  customHintLabel: document.querySelector("#customHintLabel"),
  customPinyin: document.querySelector("#customPinyin"),
  hanziExtraField: document.querySelector(".hanzi-extra-field"),
  customMeaning: document.querySelector("#customMeaning"),
  customMeaningLabel: document.querySelector("#customMeaningLabel"),
  customSpeak: document.querySelector("#customSpeak"),
  customList: document.querySelector("#customList"),
  backupStatus: document.querySelector("#backupStatus"),
  exportButton: document.querySelector("#exportButton"),
  importButton: document.querySelector("#importButton"),
  resetDefaultsButton: document.querySelector("#resetDefaultsButton"),
  importFileInput: document.querySelector("#importFileInput"),
  settingsButton: document.querySelector("#settingsButton"),
  settingsDialog: document.querySelector("#settingsDialog"),
  closeSettingsButton: document.querySelector("#closeSettingsButton"),
  autoPlayToggle: document.querySelector("#autoPlayToggle")
};
const ctx = els.canvas.getContext("2d");
let chineseVoiceWarningShown = false;
let hanziWriter = null;
let bopomofoStrokeTimer = null;
let hanziStrokeRenderToken = 0;

function normalizeLegacyLesson(item) {
  const category = item.category || (item.type === "bopomofo" ? "bopomofo" : item.type === "chinese" ? "hanzi" : "word");
  return { ...item, category, pinyin: item.pinyin || (category === "hanzi" ? HANZI_PINYIN[item.display] : undefined), lang: item.lang || (category === "word" || category === "letter" ? "en-US" : "zh-TW") };
}

function loadLessons() {
  const fixedLessons = BASE_LESSONS.filter((item) => item.category === "bopomofo" || item.category === "letter").map((item) => ({ ...item }));
  const editableDefaults = BASE_LESSONS.filter((item) => item.category === "hanzi" || item.category === "word");

  try {
    const saved = JSON.parse(localStorage.getItem(LESSONS_KEY) || "null");
    if (Array.isArray(saved)) {
      const editable = saved.map(normalizeLegacyLesson).filter(isEditableLesson);
      return [...fixedLessons, ...editable];
    }
  } catch {}

  return [...fixedLessons, ...editableDefaults.map((item) => normalizeLegacyLesson({ ...item }))];
}

function loadSettings() {
  try {
    const settings = { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
    if (!GRID_SIZES.includes(settings.gridSize)) settings.gridSize = DEFAULT_SETTINGS.gridSize;
    return settings;
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function loadBackupState() {
  try {
    return JSON.parse(localStorage.getItem(BACKUP_KEY) || "{}") || {};
  } catch {
    return {};
  }
}

function isValidLesson(item) {
  return item && CATEGORY_LABELS[item.category] && typeof item.display === "string" && item.display.trim();
}

function isEditableLesson(item) {
  return isValidLesson(item) && (item.category === "hanzi" || item.category === "word");
}

function saveLessons(options = {}) {
  localStorage.setItem(LESSONS_KEY, JSON.stringify(state.lessons.filter(isEditableLesson)));
  if (options.markDirty !== false) markBackupDirty();
}

function markBackupDirty() {
  state.backup.dirty = true;
  localStorage.setItem(BACKUP_KEY, JSON.stringify(state.backup));
  renderBackupStatus();
}

function markBackupClean() {
  state.backup = { dirty: false, exportedAt: new Date().toISOString() };
  localStorage.setItem(BACKUP_KEY, JSON.stringify(state.backup));
  renderBackupStatus();
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function activeCategory() {
  return state.category || currentItem().category;
}

function lessonsFor(category = activeCategory()) {
  return state.lessons.filter((item) => item.category === category);
}

function matchesSearch(lesson) {
  const query = state.search.trim().toLowerCase();
  if (!query) return true;
  return [lesson.display, lesson.hint, lesson.pinyin, lesson.meaning, lesson.speakText]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(query));
}

function visibleLessonsFor(category) {
  return lessonsFor(category).filter(matchesSearch);
}

function currentItem() {
  const category = state.category || state.lessons[0]?.category;
  const items = state.lessons.filter((item) => item.category === category);
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
    section.className = "category-section" + (state.category === category ? " is-open" : "");
    const header = document.createElement("button");
    header.className = `category-header${state.category === category ? " is-open" : ""}`;
    header.type = "button";
    header.textContent = `${CATEGORY_LABELS[category]} (${visibleLessonsFor(category).length})`;
    header.addEventListener("click", () => {
      if (state.category === category) {
        state.category = null;
        renderCurrent();
        return;
      }
      state.category = category;
      state.index = 0;
      renderCurrent({ autoSpeak: true });
    });
    section.append(header);

    if (state.category === category) {
      const list = document.createElement("div");
      list.className = "category-items";
      visibleLessonsFor(category).forEach((lesson) => {
        const index = lessonsFor(category).findIndex((item) => item.id === lesson.id);
        const button = document.createElement("button");
        button.className = "card-row " + category + (lesson.id === current.id ? " is-active" : "");
        button.type = "button";
        button.dataset.lessonId = lesson.id;
        button.append(
          makeSpan(`card-symbol ${category}`, lesson.display),
          makeSpan("card-copy", lesson.hint || lesson.meaning || lesson.display)
        );
        button.addEventListener("click", () => {
          state.index = index;
          renderCurrent({ autoSpeak: true, keepCategoryList: true });
        });
        list.append(button);
      });
      section.append(list);
    }
    els.categoryList.append(section);
  });
}

function updateCategorySelection() {
  const current = currentItem();
  els.categoryList.querySelectorAll(".card-row").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lessonId === current.id);
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
    const actions = document.createElement("div");
    actions.className = "manage-actions";

    const edit = document.createElement("button");
    edit.className = "secondary-button mini";
    edit.type = "button";
    edit.textContent = "編輯";
    edit.addEventListener("click", () => startEdit(lesson.id));

    const remove = document.createElement("button");
    remove.className = "secondary-button mini danger";
    remove.type = "button";
    remove.textContent = "刪除";
    remove.addEventListener("click", () => deleteLesson(lesson.id));

    actions.append(edit, remove);
    row.append(info, actions);
    els.customList.append(row);
  });
}

function renderSettings() {
  els.autoPlayToggle.checked = state.settings.autoPlay;
  els.traceStage.classList.toggle("template-hidden", !state.settings.showTemplate);
  els.traceStage.dataset.grid = String(state.settings.gridSize);
  els.templateButton.classList.toggle("is-active", state.settings.showTemplate);
  els.gridButton.textContent = "田";
  els.gridButton.title = `切換格線密度：目前 ${state.settings.gridSize}×${state.settings.gridSize}`;
}

function renderBackupStatus() {
  if (!els.backupStatus) return;
  if (state.backup.dirty) {
    els.backupStatus.textContent = "有未匯出的教材變更";
    return;
  }
  if (state.backup.exportedAt) {
    els.backupStatus.textContent = `已匯出：${new Date(state.backup.exportedAt).toLocaleString()}`;
    return;
  }
  els.backupStatus.textContent = "本機教材尚未匯出";
}

function makeInfoField(label, value, className = "") {
  const field = document.createElement("div");
  field.className = `info-field${className ? ` ${className}` : ""}`;
  const labelEl = document.createElement("span");
  labelEl.className = "info-label";
  labelEl.textContent = label;
  const valueEl = document.createElement("strong");
  valueEl.className = "info-value";
  valueEl.textContent = value || "-";
  field.append(labelEl, valueEl);
  return field;
}

function renderInfoDetail(item) {
  els.hintText.replaceChildren();
  els.meaningText.textContent = "";
  els.meaningText.classList.add("is-hidden");

  if (item.category === "bopomofo") {
    els.hintText.className = "info-grid empty-info";
    return;
  }

  if (item.category === "letter") {
    els.hintText.className = "info-grid single-info";
    els.hintText.append(makeInfoField("提示", item.hint || item.display));
    return;
  }

  if (item.category === "hanzi") {
    els.hintText.className = "info-grid hanzi-info";
    els.hintText.append(
      makeInfoField("注音", item.hint || item.display),
      makeInfoField("羅馬拼音", item.pinyin || "-"),
      makeInfoField("英文解釋", item.meaning || CATEGORY_LABELS[item.category], "wide")
    );
    return;
  }

  els.hintText.className = "info-grid compact-info";
  els.hintText.append(
    makeInfoField("KK", item.hint || item.display),
    makeInfoField("中文意思", item.meaning || CATEGORY_LABELS[item.category], "wide")
  );
}

function renderFormMode() {
  const editing = Boolean(state.editingId);
  els.formTitle.textContent = editing ? "編輯字卡" : "新增字卡";
  els.saveLessonButton.textContent = editing ? "儲存修改" : "新增";
  els.cancelEditButton.classList.toggle("is-hidden", !editing);
  updateFormLabels();
}

function updateFormLabels() {
  const isWord = els.customCategory.value === "word";
  els.customHintLabel.textContent = isWord ? "KK 音標" : "注音";
  els.customHint.placeholder = isWord ? "例如 [ˋæpəl]" : "例如 ㄨㄛˇ";
  els.hanziExtraField.classList.toggle("is-hidden", isWord);
  els.customMeaningLabel.textContent = isWord ? "中文意思" : "意思";
  els.customMeaning.placeholder = isWord ? "例如 蘋果" : "例如 I / me";
  els.customSpeak.placeholder = isWord ? "留空使用英文單字" : "留空使用國字";
}

function stopHanziStrokePlayback() {
  hanziStrokeRenderToken += 1;
  if (hanziWriter) hanziWriter.pauseAnimation()?.catch(() => {});
  if (bopomofoStrokeTimer) window.clearTimeout(bopomofoStrokeTimer);
  hanziWriter = null;
  bopomofoStrokeTimer = null;
}

function singleHanziForStroke(item) {
  const chars = Array.from(item.display || "");
  if (item.category !== "hanzi" || chars.length !== 1) return null;
  return /\p{Script=Han}/u.test(chars[0]) ? chars[0] : null;
}

function hanziCacheUrl(char) {
  return `/hanzi-writer-data/${encodeURIComponent(char)}.json`;
}

function hanziCdnUrl(char) {
  return `${HANZI_DATA_CDN}/${encodeURIComponent(char)}.json`;
}

async function readCachedHanziData(char) {
  if (!("caches" in window)) return null;
  const cache = await caches.open(HANZI_DATA_CACHE);
  const cached = await cache.match(hanziCacheUrl(char));
  return cached ? cached.json() : null;
}

async function fetchAndCacheHanziData(char) {
  if (!navigator.onLine || !("caches" in window)) return null;
  const response = await fetch(hanziCdnUrl(char), { mode: "cors" });
  if (!response.ok) return null;
  const data = await response.clone().json();
  const cache = await caches.open(HANZI_DATA_CACHE);
  await cache.put(
    hanziCacheUrl(char),
    new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } })
  );
  return data;
}

async function loadHanziStrokeData(char) {
  const cached = await readCachedHanziData(char);
  if (cached) return cached;
  return fetchAndCacheHanziData(char);
}

function bopomofoStrokeDataUrl(item) {
  return item.category === "bopomofo" ? `${BOPOMOFO_STROKE_DATA_BASE}/${encodeURIComponent(item.display)}.json?v=${BOPOMOFO_STROKE_DATA_VERSION}` : null;
}

async function loadBopomofoStrokeData(item) {
  const url = bopomofoStrokeDataUrl(item);
  if (!url) return null;
  const response = await fetch(url);
  if (!response.ok) return null;
  const data = await response.json();
  return Array.isArray(data.strokes) && data.strokes.length ? data : null;
}

function createBopomofoStrokeSvg(data) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "bopomofo-stroke-svg");
  svg.setAttribute("viewBox", data.viewBox || "0 0 2048 2048");
  svg.setAttribute("aria-hidden", "true");

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("transform", data.transform || "translate(0,2048) scale(1,-1)");

  data.strokes.forEach((stroke) => {
    const trail = document.createElementNS("http://www.w3.org/2000/svg", "path");
    trail.setAttribute("class", "bopomofo-stroke-trail");
    trail.setAttribute("d", stroke.track);
    trail.setAttribute("fill", "none");
    trail.setAttribute("stroke", "#15736a");
    trail.setAttribute("stroke-linecap", "round");
    trail.setAttribute("stroke-linejoin", "round");
    trail.setAttribute("stroke-width", String(Math.max(140, Number(stroke.width || 150) * 1.18)));
    trail.style.opacity = "0";

    const track = document.createElementNS("http://www.w3.org/2000/svg", "path");
    track.setAttribute("class", "bopomofo-stroke-track-path");
    track.setAttribute("d", stroke.track);
    track.setAttribute("fill", "none");
    track.setAttribute("stroke", "transparent");
    track.setAttribute("pointer-events", "none");

    group.append(trail, track);
  });

  const pen = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  pen.setAttribute("class", "bopomofo-stroke-pen");
  pen.setAttribute("r", "70");
  group.append(pen);

  svg.append(group);
  return svg;
}

function resetBopomofoStrokeSvg(svg) {
  svg.querySelectorAll(".bopomofo-stroke-trail").forEach((path) => {
    path.style.opacity = "0";
    path.style.strokeDasharray = "1";
    path.style.strokeDashoffset = "1";
  });
  const pen = svg.querySelector(".bopomofo-stroke-pen");
  if (pen) pen.classList.remove("is-active");
}

function playBopomofoStrokeSvg(svg, token) {
  const trails = Array.from(svg.querySelectorAll(".bopomofo-stroke-trail"));
  const tracks = Array.from(svg.querySelectorAll(".bopomofo-stroke-track-path"));
  const pen = svg.querySelector(".bopomofo-stroke-pen");
  if (!trails.length || !tracks.length || !pen || token !== hanziStrokeRenderToken) return;
  resetBopomofoStrokeSvg(svg);

  const showStroke = (index) => {
    if (token !== hanziStrokeRenderToken) return;
    if (index >= trails.length) {
      bopomofoStrokeTimer = window.setTimeout(() => playBopomofoStrokeSvg(svg, token), BOPOMOFO_STROKE_LOOP_PAUSE_MS);
      return;
    }

    const trail = trails[index];
    const track = tracks[index];
    const length = track.getTotalLength();
    const duration = Math.max(BOPOMOFO_STROKE_MIN_MS, Math.min(BOPOMOFO_STROKE_MAX_MS, length * 0.42));
    const startedAt = performance.now();
    trail.style.strokeDasharray = String(length);
    trail.style.strokeDashoffset = String(length);
    pen.classList.add("is-active");

    trail.style.opacity = "0.7";

    const step = (now) => {
      if (token !== hanziStrokeRenderToken) return;
      const progress = Math.min(1, (now - startedAt) / duration);
      const point = track.getPointAtLength(length * progress);
      trail.style.strokeDashoffset = String(length * (1 - progress));
      pen.setAttribute("cx", String(point.x));
      pen.setAttribute("cy", String(point.y));
      if (progress < 1) {
        window.requestAnimationFrame(step);
        return;
      }
      trail.style.strokeDashoffset = "0";
      trail.style.opacity = "0.86";
      pen.classList.remove("is-active");
      bopomofoStrokeTimer = window.setTimeout(() => showStroke(index + 1), 140);
    };

    window.requestAnimationFrame(step);
  };

  showStroke(0);
}

async function renderBopomofoStrokeOrder(item, token) {
  if (item.category !== "bopomofo") return false;
  try {
    const data = await loadBopomofoStrokeData(item);
    if (token !== hanziStrokeRenderToken || !data) return false;
    els.itemTitle.classList.remove("has-stroke-order");
    els.itemTitle.classList.add("has-bopomofo-stroke");
    els.itemTitle.setAttribute("aria-label", item.display);
    const svg = createBopomofoStrokeSvg(data);
    els.itemTitle.replaceChildren(svg);
    playBopomofoStrokeSvg(svg, token);
    return true;
  } catch (error) {
    if (token === hanziStrokeRenderToken) setTextTitle(item);
    return false;
  }
}

function setTextTitle(item) {
  els.itemTitle.replaceChildren(document.createTextNode(item.display));
  els.itemTitle.classList.remove("has-stroke-order", "has-bopomofo-stroke");
  els.itemTitle.removeAttribute("aria-label");
}

function createHanziWriterTarget(item) {
  els.itemTitle.classList.add("has-stroke-order");
  els.itemTitle.setAttribute("aria-label", item.display);
  const target = document.createElement("span");
  target.className = "hanzi-writer-target";
  target.setAttribute("aria-hidden", "true");
  els.itemTitle.replaceChildren(target);
  return target;
}

function targetSize(target) {
  const rect = target.getBoundingClientRect();
  return Math.max(86, Math.round(Math.min(rect.width || 112, rect.height || 112)));
}

async function renderInfoStrokeOrder(item, token) {
  const char = singleHanziForStroke(item);
  if (!char || !window.HanziWriter) return;

  try {
    const data = await loadHanziStrokeData(char);
    if (token !== hanziStrokeRenderToken || !data) return;
    const target = createHanziWriterTarget(item);
    const size = targetSize(target);
    hanziWriter = window.HanziWriter.create(target, char, {
      width: size,
      height: size,
      padding: 5,
      showOutline: true,
      showCharacter: false,
      strokeAnimationSpeed: 0.35,
      delayBetweenStrokes: 80,
      delayBetweenLoops: 2000,
      strokeColor: "#15736a",
      outlineColor: "#d8d0c1",
      charDataLoader: (requestedChar, onComplete) => {
        if (requestedChar === char) onComplete(data);
      }
    });
    hanziWriter.loopCharacterAnimation();
  } catch (error) {
    if (token === hanziStrokeRenderToken) setTextTitle(item);
  }
}

function renderCurrent(options = {}) {
  const item = currentItem();
  stopHanziStrokePlayback();
  const strokeToken = hanziStrokeRenderToken;
  setTextTitle(item);
  renderBopomofoStrokeOrder(item, strokeToken).then((shown) => {
    if (!shown) renderInfoStrokeOrder(item, strokeToken);
  });
  renderInfoDetail(item);
  els.traceText.textContent = item.display;
  els.traceText.className = `trace-text ${item.category}`;
  renderSettings();
  renderBackupStatus();
  if (options.keepCategoryList) updateCategorySelection();
  else renderCategoryList();
  renderCustomList();
  clearCanvas();
  if (options.autoSpeak && state.settings.autoPlay) window.setTimeout(speakCurrent, 120);
}

function selectRelative(direction) {
  const items = lessonsFor();
  if (!items.length) return;
  state.index = (state.index + direction + items.length) % items.length;
  renderCurrent({ autoSpeak: true, keepCategoryList: true });
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

function needsChineseVoice(item) {
  return item.category === "hanzi";
}

function notifyChineseVoiceUnavailable() {
  if (chineseVoiceWarningShown) return;
  chineseVoiceWarningShown = true;
  window.alert("此裝置沒有可用中文語音");
}

function findVoiceForItem(item) {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (needsChineseVoice(item)) {
    return voices.find((voice) => voice.lang === "zh-TW")
      || voices.find((voice) => voice.lang === "zh-Hant-TW")
      || voices.find((voice) => voice.lang.startsWith("zh-Hant"))
      || voices.find((voice) => voice.lang.startsWith("zh"))
      || null;
  }
  const lang = item.lang || (item.category === "word" || item.category === "letter" ? "en-US" : "zh-TW");
  return voices.find((voice) => voice.lang === lang)
    || voices.find((voice) => voice.lang.startsWith(lang.split("-")[0]))
    || null;
}

function speakWithTts(item, retried = false) {
  if (!("speechSynthesis" in window)) {
    if (needsChineseVoice(item)) notifyChineseVoiceUnavailable();
    return;
  }

  const voice = findVoiceForItem(item);
  if (needsChineseVoice(item) && !voice) {
    if (!retried && window.speechSynthesis.getVoices().length === 0) {
      window.setTimeout(() => speakWithTts(item, true), 350);
      return;
    }
    notifyChineseVoiceUnavailable();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(item.speakText || item.display);
  utterance.lang = item.lang || (item.category === "word" || item.category === "letter" ? "en-US" : "zh-TW");
  if (voice) utterance.voice = voice;
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
    pinyin: category === "hanzi" ? (els.customPinyin.value.trim() || HANZI_PINYIN[display] || "") : undefined,
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
  els.customPinyin.value = lesson.pinyin || "";
  els.customMeaning.value = lesson.meaning || "";
  els.customSpeak.value = lesson.speakText || "";
  renderFormMode();
  els.customText.focus();
}

function exportLessons() {
  const payload = {
    app: "bula-teach",
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    lessons: state.lessons.filter(isEditableLesson)
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "bula-teach-lessons.json";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  markBackupClean();
}

function importLessonsFromFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const source = Array.isArray(parsed) ? parsed : parsed.lessons;
      if (!Array.isArray(source)) throw new Error("Invalid lessons payload");
      const imported = source.map(normalizeLegacyLesson).filter(isEditableLesson);
      const fixed = state.lessons.filter((item) => !isEditableLesson(item));
      state.lessons = [...fixed, ...imported];
      saveLessons({ markDirty: false });
      markBackupClean();
      state.category = imported[0]?.category || "hanzi";
      state.index = 0;
      resetForm();
      renderCurrent();
      window.alert(`已匯入 ${imported.length} 張可編輯字卡。`);
    } catch {
      window.alert("匯入失敗，請確認檔案是 Bula Teach 教材 JSON。");
    } finally {
      els.importFileInput.value = "";
    }
  };
  reader.readAsText(file);
}

function resetEditableDefaults() {
  if (!window.confirm("載入預設國字與英文單字？目前編輯過的國字與英文單字會被取代。")) return;
  const fixed = state.lessons.filter((item) => !isEditableLesson(item));
  const defaults = BASE_LESSONS.filter(isEditableLesson).map((item) => normalizeLegacyLesson({ ...item }));
  state.lessons = [...fixed, ...defaults];
  saveLessons();
  state.category = "hanzi";
  state.index = 0;
  resetForm();
  renderCurrent();
}

function deleteLesson(id) {
  const lesson = state.lessons.find((item) => item.id === id);
  if (!isEditableLesson(lesson)) return;
  if (!window.confirm(`刪除「${lesson.display}」？`)) return;

  const wasCurrent = currentItem().id === id;
  state.lessons = state.lessons.filter((item) => item.id !== id);
  saveLessons();
  if (state.editingId === id) resetForm();

  if (wasCurrent || !lessonsFor(state.category).length) {
    const nextCategory = CATEGORY_ORDER.find((category) => lessonsFor(category).length);
    state.category = nextCategory || null;
    state.index = 0;
  } else {
    state.index = Math.min(state.index, lessonsFor(state.category).length - 1);
  }

  renderCurrent();
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

function cycleGridSize() {
  const index = GRID_SIZES.indexOf(state.settings.gridSize);
  state.settings.gridSize = GRID_SIZES[(index + 1) % GRID_SIZES.length];
  saveSettings();
  renderSettings();
}

function updateOnlineStatus() {
  els.offlineStatus.textContent = navigator.onLine ? "可離線使用" : "離線中";
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("../sw.js").then(updateOnlineStatus).catch(() => {
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
els.gridButton.addEventListener("click", cycleGridSize);
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
els.exportButton.addEventListener("click", exportLessons);
els.importButton.addEventListener("click", () => els.importFileInput.click());
els.resetDefaultsButton.addEventListener("click", resetEditableDefaults);
els.importFileInput.addEventListener("change", () => importLessonsFromFile(els.importFileInput.files?.[0]));
els.customCategory.addEventListener("change", updateFormLabels);
els.searchInput.addEventListener("input", () => {
  state.search = els.searchInput.value;
  renderCategoryList();
});
window.addEventListener("resize", () => { resizeCanvas(); clearCanvas(); });
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

resizeCanvas();
renderFormMode();
renderCurrent();
updateOnlineStatus();
registerServiceWorker();
