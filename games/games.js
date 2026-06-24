const STORAGE_KEY = "bula-games-memory-v1";
const THEMES = {
  bopomofo: ["ㄅ", "ㄆ", "ㄇ", "ㄈ", "ㄉ", "ㄊ", "ㄋ", "ㄌ"],
  numbers: ["1", "2", "3", "4", "5", "6", "7", "8"],
  shapes: ["●", "■", "▲", "◆", "★", "♥", "⬟", "⬢"],
};

const els = {
  pairCount: document.getElementById("pairCount"),
  deckTheme: document.getElementById("deckTheme"),
  newGameButton: document.getElementById("newGameButton"),
  memoryGrid: document.getElementById("memoryGrid"),
  moveCount: document.getElementById("moveCount"),
  matchCount: document.getElementById("matchCount"),
  bestScore: document.getElementById("bestScore"),
  gameMessage: document.getElementById("gameMessage"),
};

const state = {
  cards: [],
  openCards: [],
  moves: 0,
  matches: 0,
  locked: false,
  pairCount: 6,
  theme: "bopomofo",
  best: loadBestScores(),
};

function loadBestScores() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function saveBestScores() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.best));
}

function shuffle(items) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function currentBestKey() {
  return `${state.theme}-${state.pairCount}`;
}

function buildDeck() {
  const values = THEMES[state.theme].slice(0, state.pairCount);
  return shuffle(values.flatMap((value, index) => [
    { id: `${value}-${index}-a`, value, matched: false },
    { id: `${value}-${index}-b`, value, matched: false },
  ]));
}

function renderStats() {
  els.moveCount.textContent = String(state.moves);
  els.matchCount.textContent = `${state.matches} / ${state.pairCount}`;
  els.bestScore.textContent = state.best[currentBestKey()] ? `${state.best[currentBestKey()]} 次` : "--";
}

function renderBoard() {
  els.memoryGrid.textContent = "";
  state.cards.forEach((card, index) => {
    const button = document.createElement("button");
    button.className = "memory-card";
    button.type = "button";
    button.textContent = card.value;
    button.dataset.index = String(index);
    button.setAttribute("aria-label", card.matched ? `已配對 ${card.value}` : "未翻開的卡片");
    if (card.matched) button.classList.add("is-matched");
    if (state.openCards.includes(index)) button.classList.add("is-open");
    button.disabled = card.matched;
    els.memoryGrid.appendChild(button);
  });
}

function startGame() {
  state.pairCount = Number(els.pairCount.value);
  state.theme = els.deckTheme.value;
  state.cards = buildDeck();
  state.openCards = [];
  state.moves = 0;
  state.matches = 0;
  state.locked = false;
  els.gameMessage.textContent = "翻開兩張相同卡片完成配對";
  renderStats();
  renderBoard();
}

function finishGame() {
  const key = currentBestKey();
  if (!state.best[key] || state.moves < state.best[key]) {
    state.best[key] = state.moves;
    saveBestScores();
    els.gameMessage.textContent = `完成，新的最佳紀錄 ${state.moves} 次`;
  } else {
    els.gameMessage.textContent = `完成，共翻牌 ${state.moves} 次`;
  }
}

function finishMatch(firstIndex, secondIndex) {
  const first = state.cards[firstIndex];
  const second = state.cards[secondIndex];
  if (first.value === second.value) {
    first.matched = true;
    second.matched = true;
    state.matches += 1;
    state.openCards = [];
    els.gameMessage.textContent = "配對成功";
    if (state.matches === state.pairCount) finishGame();
    renderStats();
    renderBoard();
    state.locked = false;
    return;
  }

  els.gameMessage.textContent = "再試一次";
  setTimeout(() => {
    state.openCards = [];
    state.locked = false;
    renderBoard();
  }, 700);
}

function handleCardClick(event) {
  const button = event.target.closest(".memory-card");
  if (!button || state.locked) return;

  const index = Number(button.dataset.index);
  const card = state.cards[index];
  if (!card || card.matched || state.openCards.includes(index)) return;

  state.openCards.push(index);
  if (state.openCards.length === 2) {
    state.locked = true;
    state.moves += 1;
    renderStats();
    renderBoard();
    finishMatch(state.openCards[0], state.openCards[1]);
    return;
  }

  renderBoard();
}

els.newGameButton.addEventListener("click", startGame);
els.pairCount.addEventListener("change", startGame);
els.deckTheme.addEventListener("change", startGame);
els.memoryGrid.addEventListener("click", handleCardClick);

startGame();
