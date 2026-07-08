const STATS_KEY = "bula-math-stats-v1";

const els = {
  modes: [...document.querySelectorAll(".mode")],
  modeHeads: [...document.querySelectorAll(".mode .mode-head")],
  generateButtons: [...document.querySelectorAll(".generate-mode")],
  problemArea: document.querySelector("#problemArea"),
  paperCanvas: document.querySelector("#paperCanvas"),
  mathWorkspace: document.querySelector("#mathWorkspace"),
  eraserCursor: document.querySelector("#eraserCursor"),
  erase: document.querySelector("#eraseButton"),
  finish: document.querySelector("#finishButton"),
  result: document.querySelector("#resultBox"),
  resultText: document.querySelector("#resultText"),
  next: document.querySelector("#nextButton"),
  addDigits: document.querySelector("#addDigits"),
  subDigits: document.querySelector("#subDigits"),
  mulLeftDigits: document.querySelector("#mulLeftDigits"),
  mulRightDigits: document.querySelector("#mulRightDigits"),
  divQuotientDigits: document.querySelector("#divQuotientDigits"),
  divisorDigits: document.querySelector("#divisorDigits"),
  mixedDigits: document.querySelector("#mixedDigits"),
  mixedTerms: document.querySelector("#mixedTerms"),
  settingsToggle: document.querySelector("#settingsToggle"),
  settingsBody: document.querySelector("#settingsBody"),
  statsBox: document.querySelector("#statsBox"),
  clearStats: document.querySelector("#clearStatsButton"),
  mathTabs: [...document.querySelectorAll(".math-tab")],
  practiceControls: document.querySelector("#practiceControls"),
  tableControls: document.querySelector("#tableControls"),
  practiceBottom: document.querySelector("#practiceBottom"),
  paper: document.querySelector("#paper"),
  timesView: document.querySelector("#timesView"),
  topFactors: document.querySelector("#topFactors"),
  sideFactors: document.querySelector("#sideFactors"),
  productDisplay: document.querySelector("#productDisplay")
};

let currentMode = "add";
let currentView = "practice";
let selectedLeftFactor = 9;
let selectedTopFactor = 9;
let currentProblem = null;
let currentAnswered = false;
let toolMode = "pen";
let erasePressStartedAt = 0;
let erasePressTimer = null;
let erasePointerHandledAt = 0;
let stats = loadStats();

function loadStats() {
  try {
    return { total: 0, correct: 0, wrong: 0, ...JSON.parse(localStorage.getItem(STATS_KEY) || "{}") };
  } catch {
    return { total: 0, correct: 0, wrong: 0 };
  }
}

function saveStats() {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function renderStats() {
  els.statsBox.textContent = "已作答 " + stats.total + " 題 · 正確 " + stats.correct + " · 錯誤 " + stats.wrong;
}

function renderProductDisplay() {
  els.productDisplay.textContent = "";

  const expression = document.createElement("div");
  expression.className = "product-expression";
  expression.textContent = selectedLeftFactor + " × " + selectedTopFactor;

  const value = document.createElement("strong");
  value.textContent = String(selectedLeftFactor * selectedTopFactor);

  els.productDisplay.append(expression, value);
}

function makeFactorButton(value, axis) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "axis-factor";
  const isActive = axis === "left" ? value === selectedLeftFactor : value === selectedTopFactor;
  button.classList.toggle("is-active", isActive);
  button.textContent = String(value);
  button.addEventListener("click", () => {
    if (axis === "left") selectedLeftFactor = value;
    else selectedTopFactor = value;
    renderMultiplicationPicker();
  });
  return button;
}

function renderMultiplicationPicker() {
  els.topFactors.textContent = "";
  els.sideFactors.textContent = "";

  for (let value = 1; value <= 9; value += 1) {
    els.topFactors.append(makeFactorButton(value, "top"));
    els.sideFactors.append(makeFactorButton(value, "left"));
  }

  renderProductDisplay();
}

function setMathView(view) {
  currentView = view;
  const showPractice = view === "practice";

  els.mathTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });
  els.practiceControls.classList.toggle("is-hidden", !showPractice);
  els.tableControls.classList.toggle("is-hidden", showPractice);
  els.practiceBottom.classList.toggle("is-hidden", !showPractice);
  els.paper.classList.toggle("is-hidden", !showPractice);
  els.timesView.classList.toggle("is-hidden", showPractice);
  els.erase.classList.toggle("is-hidden", !showPractice);
  els.finish.classList.toggle("is-hidden", !showPractice);
  els.result.classList.remove("is-visible");

  if (showPractice) {
    window.requestAnimationFrame(() => {
      resizePaperCanvas();
      clearPaperCanvas();
    });
  } else {
    renderMultiplicationPicker();
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clampNumber(input, min, max, fallback) {
  const value = Number(input.value) || fallback;
  const clamped = Math.max(min, Math.min(max, value));
  input.value = clamped;
  return clamped;
}

function rangeForDigits(digits) {
  if (digits <= 1) return [1, 9];
  return [10 ** (digits - 1), 10 ** digits - 1];
}

function numberWithDigits(digits) {
  const [min, max] = rangeForDigits(digits);
  return randomInt(min, max);
}

function makeAdd() {
  const digits = clampNumber(els.addDigits, 1, 4, 2);
  const a = numberWithDigits(digits);
  const b = numberWithDigits(digits);
  return { expression: `${a} + ${b} =`, answer: a + b };
}

function makeSub() {
  const digits = clampNumber(els.subDigits, 1, 4, 2);
  const a = numberWithDigits(digits);
  const b = numberWithDigits(digits);
  const big = Math.max(a, b);
  const small = Math.min(a, b);
  return { expression: `${big} - ${small} =`, answer: big - small };
}

function makeMul() {
  const leftDigits = clampNumber(els.mulLeftDigits, 1, 3, 2);
  const rightDigits = clampNumber(els.mulRightDigits, 1, 3, 1);
  const a = numberWithDigits(leftDigits);
  const b = numberWithDigits(rightDigits);
  return { expression: `${a} × ${b} =`, answer: a * b };
}

function makeDiv() {
  const quotientDigits = clampNumber(els.divQuotientDigits, 1, 3, 2);
  const divisorDigits = clampNumber(els.divisorDigits, 1, 2, 1);
  const quotient = numberWithDigits(quotientDigits);
  const divisor = numberWithDigits(divisorDigits);
  const dividend = quotient * divisor;
  return { expression: `${dividend} ÷ ${divisor} =`, answer: quotient };
}

function makeMixed() {
  const digits = clampNumber(els.mixedDigits, 1, 3, 1);
  const terms = clampNumber(els.mixedTerms, 3, 6, 4);
  const ops = ["+", "-", "×", "÷"];
  let value = numberWithDigits(digits);
  const parts = [String(value)];

  for (let i = 1; i < terms; i += 1) {
    const op = ops[randomInt(0, ops.length - 1)];
    if (op === "+") {
      const n = numberWithDigits(digits);
      value += n;
      parts.push("+", String(n));
    } else if (op === "-") {
      const n = randomInt(1, Math.max(1, Math.min(value, 10 ** digits - 1)));
      value -= n;
      parts.push("-", String(n));
    } else if (op === "×") {
      const n = randomInt(2, Math.min(9, 10 ** digits - 1));
      value *= n;
      parts.push("×", String(n));
    } else {
      const divisors = [];
      for (let d = 2; d <= 9; d += 1) {
        if (value % d === 0) divisors.push(d);
      }
      const n = divisors.length ? divisors[randomInt(0, divisors.length - 1)] : 1;
      value = Math.trunc(value / n);
      parts.push("÷", String(n));
    }
  }

  return { expression: `${parts.join(" ")} =`, answer: value };
}

function makeProblem(mode) {
  if (mode === "add") return makeAdd();
  if (mode === "sub") return makeSub();
  if (mode === "mul") return makeMul();
  if (mode === "div") return makeDiv();
  return makeMixed();
}

function preventNonDigitInput(event) {
  if (!event.data) return;
  if (/\D/.test(event.data)) event.preventDefault();
}

function keepDigitsOnly(input) {
  const cleaned = input.value.replace(/\D/g, "");
  if (input.value !== cleaned) input.value = cleaned;
}

function attachDigitOnlyInput(input) {
  input.inputMode = "numeric";
  input.pattern = "[0-9]*";
  input.addEventListener("beforeinput", preventNonDigitInput);
  input.addEventListener("input", () => keepDigitsOnly(input));
}

function renderProblem() {
  els.problemArea.innerHTML = "";
  els.result.classList.remove("is-visible");
  els.resultText.textContent = "";

  const expression = document.createElement("span");
  expression.className = "expression";
  expression.textContent = currentProblem.expression;

  const answerWrap = document.createElement("label");
  answerWrap.className = "answer-wrap";
  const input = document.createElement("input");
  input.className = "answer-input";
  input.type = "text";
  input.inputMode = "numeric";
  input.autocomplete = "off";
  input.pattern = "[0-9]*";
  input.setAttribute("aria-label", "答案");
  attachDigitOnlyInput(input);
  answerWrap.append(input);

  const mark = document.createElement("span");
  mark.className = "mark";
  mark.setAttribute("aria-hidden", "true");

  els.problemArea.append(expression, answerWrap, mark);
  window.requestAnimationFrame(() => {
    resizePaperCanvas();
    clearPaperCanvas();
  });
}

function generate(mode = currentMode) {
  currentMode = mode;
  currentProblem = makeProblem(mode);
  currentAnswered = false;
  renderProblem();
}

function setOpenMode(mode) {
  currentMode = mode;
  els.modes.forEach((section) => {
    section.classList.toggle("is-open", section.dataset.mode === mode);
  });
}

function clearAnswerMark() {
  const mark = els.problemArea.querySelector(".mark");
  if (mark) {
    mark.textContent = "";
    mark.className = "mark";
  }
  els.result.classList.remove("is-visible");
}

function finish() {
  const input = els.problemArea.querySelector(".answer-input");
  const mark = els.problemArea.querySelector(".mark");
  if (!input || !currentProblem) return;
  const normalized = input.value.trim().replace(/,/g, "");
  const value = Number(normalized);
  const ok = normalized !== "" && Number.isFinite(value) && value === currentProblem.answer;
  mark.textContent = ok ? "✓" : "✕";
  mark.className = `mark ${ok ? "ok" : "bad"}`;
  els.resultText.textContent = ok ? "答對了" : `再試試，答案是 ${currentProblem.answer}`;
  els.result.classList.add("is-visible");

  if (!currentAnswered) {
    stats.total += 1;
    if (ok) stats.correct += 1;
    else stats.wrong += 1;
    currentAnswered = true;
    saveStats();
    renderStats();
  }
}

const paperCtx = els.paperCanvas.getContext("2d");
const ERASER_SIZE = 30;
let paperDrawing = false;

function resizePaperCanvas() {
  const rect = els.paperCanvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  els.paperCanvas.width = Math.max(1, Math.floor(rect.width * ratio));
  els.paperCanvas.height = Math.max(1, Math.floor(rect.height * ratio));
  paperCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
  setCanvasTool();
}

function setCanvasTool() {
  paperCtx.lineCap = "round";
  paperCtx.lineJoin = "round";
  if (toolMode === "eraser") {
    paperCtx.globalCompositeOperation = "destination-out";
    paperCtx.lineWidth = ERASER_SIZE;
    paperCtx.strokeStyle = "rgba(0,0,0,1)";
  } else {
    paperCtx.globalCompositeOperation = "source-over";
    paperCtx.lineWidth = 4;
    paperCtx.strokeStyle = "#174b45";
  }
}

function renderToolMode() {
  const isEraser = toolMode === "eraser";
  els.erase.classList.toggle("is-active", isEraser);
  els.paper.classList.toggle("is-eraser", isEraser);
  els.paperCanvas.classList.toggle("is-eraser", isEraser);
  els.mathWorkspace.classList.toggle("is-eraser", isEraser);
  els.erase.title = isEraser ? "橡皮擦模式，長按清空" : "切換橡皮擦，長按清空";
  if (isEraser) showEraserCursorAtCanvasCenter();
  else hideEraserCursor();
}

function hideEraserCursor() {
  els.eraserCursor.classList.remove("is-visible");
}

function showEraserCursorAtCanvasCenter() {
  const workspaceRect = els.mathWorkspace.getBoundingClientRect();
  els.eraserCursor.style.left = workspaceRect.width / 2 + "px";
  els.eraserCursor.style.top = workspaceRect.height / 2 + "px";
  els.eraserCursor.style.width = ERASER_SIZE + "px";
  els.eraserCursor.style.height = ERASER_SIZE + "px";
  els.eraserCursor.classList.add("is-visible");
}

function updateEraserCursor(event) {
  if (toolMode !== "eraser") return;
  const workspaceRect = els.mathWorkspace.getBoundingClientRect();
  const insideCanvas = event.clientX >= workspaceRect.left && event.clientX <= workspaceRect.right && event.clientY >= workspaceRect.top && event.clientY <= workspaceRect.bottom;
  const localX = event.clientX - workspaceRect.left;
  const localY = event.clientY - workspaceRect.top;
  els.eraserCursor.style.left = localX + "px";
  els.eraserCursor.style.top = localY + "px";
  els.eraserCursor.style.width = ERASER_SIZE + "px";
  els.eraserCursor.style.height = ERASER_SIZE + "px";
  els.eraserCursor.classList.toggle("is-visible", insideCanvas);
}

function clearPaperCanvas() {
  const rect = els.paperCanvas.getBoundingClientRect();
  paperCtx.clearRect(0, 0, rect.width, rect.height);
}

function paperPoint(event) {
  const rect = els.paperCanvas.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

els.paperCanvas.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  updateEraserCursor(event);
  paperDrawing = true;
  els.paperCanvas.setPointerCapture(event.pointerId);
  setCanvasTool();
  const p = paperPoint(event);
  paperCtx.beginPath();
  paperCtx.moveTo(p.x, p.y);
});

els.paperCanvas.addEventListener("pointermove", (event) => {
  event.preventDefault();
  updateEraserCursor(event);
  if (!paperDrawing) return;
  const p = paperPoint(event);
  paperCtx.lineTo(p.x, p.y);
  paperCtx.stroke();
});

function stopPaperDrawing(event) {
  if (!paperDrawing) return;
  paperDrawing = false;
  els.paperCanvas.releasePointerCapture(event.pointerId);
  if (event.type === "pointercancel") hideEraserCursor();
  else updateEraserCursor(event);
}

window.addEventListener("pointermove", updateEraserCursor);
els.paperCanvas.addEventListener("pointerenter", updateEraserCursor);
els.paperCanvas.addEventListener("pointerleave", () => {
  if (!paperDrawing) hideEraserCursor();
});
els.paperCanvas.addEventListener("pointerup", stopPaperDrawing);
els.paperCanvas.addEventListener("pointercancel", stopPaperDrawing);
window.addEventListener("resize", () => {
  window.requestAnimationFrame(() => {
    if (currentView !== "practice") return;
    resizePaperCanvas();
    clearPaperCanvas();
  });
});

els.mathTabs.forEach((button) => {
  button.addEventListener("click", () => setMathView(button.dataset.view));
});

els.modeHeads.forEach((button) => {
  button.addEventListener("click", () => setOpenMode(button.closest(".mode").dataset.mode));
});

els.generateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setOpenMode(button.dataset.generate);
    generate(button.dataset.generate);
  });
});


function toggleEraser() {
  toolMode = toolMode === "eraser" ? "pen" : "eraser";
  setCanvasTool();
  renderToolMode();
}

function startEraseButtonPress(event) {
  event.preventDefault();
  erasePressStartedAt = Date.now();
  erasePressTimer = window.setTimeout(() => {
    clearPaperCanvas();
    erasePressStartedAt = 0;
  }, 800);
}

function endEraseButtonPress(event) {
  event.preventDefault();
  window.clearTimeout(erasePressTimer);
  if (erasePressStartedAt && Date.now() - erasePressStartedAt < 800) toggleEraser();
  erasePointerHandledAt = Date.now();
  erasePressStartedAt = 0;
}

function cancelEraseButtonPress() {
  window.clearTimeout(erasePressTimer);
  erasePressStartedAt = 0;
}
els.problemArea.addEventListener("input", clearAnswerMark);
[els.addDigits, els.subDigits, els.mulLeftDigits, els.mulRightDigits, els.divQuotientDigits, els.divisorDigits, els.mixedDigits, els.mixedTerms].forEach(attachDigitOnlyInput);
els.erase.addEventListener("pointerdown", startEraseButtonPress);
els.erase.addEventListener("pointerup", endEraseButtonPress);
els.erase.addEventListener("pointercancel", cancelEraseButtonPress);
els.erase.addEventListener("pointerleave", cancelEraseButtonPress);
els.erase.addEventListener("click", (event) => {
  event.preventDefault();
  if (Date.now() - erasePointerHandledAt < 600) return;
  toggleEraser();
});
els.finish.addEventListener("click", finish);
els.next.addEventListener("click", () => generate(currentMode));
els.settingsToggle.addEventListener("click", () => els.settingsBody.classList.toggle("is-open"));
els.clearStats.addEventListener("click", () => {
  if (!window.confirm("清除作答統計？")) return;
  stats = { total: 0, correct: 0, wrong: 0 };
  saveStats();
  renderStats();
});

resizePaperCanvas();
renderToolMode();
renderStats();
generate("add");
