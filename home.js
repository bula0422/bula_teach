const offlineStatus = document.querySelector("#offlineStatus");
const launcherGrid = document.querySelector(".launcher-grid");
const previousButton = document.querySelector(".carousel-button-prev");
const nextButton = document.querySelector(".carousel-button-next");

function updateCarouselButtons() {
  if (!launcherGrid || !previousButton || !nextButton) return;
  const maximumScroll = launcherGrid.scrollWidth - launcherGrid.clientWidth;
  previousButton.disabled = launcherGrid.scrollLeft <= 2;
  nextButton.disabled = launcherGrid.scrollLeft >= maximumScroll - 2;
}

function moveCarousel(direction) {
  if (!launcherGrid) return;
  const firstCard = launcherGrid.querySelector(".launcher-card");
  if (!firstCard) return;
  const gap = parseFloat(getComputedStyle(launcherGrid).columnGap) || 0;
  launcherGrid.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: "smooth" });
}

function updateOnlineStatus() {
  if (!offlineStatus) return;
  offlineStatus.textContent = navigator.onLine ? "可離線使用" : "離線中";
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("./sw.js").then(updateOnlineStatus).catch(() => {
    if (offlineStatus) offlineStatus.textContent = "離線快取尚未啟用";
  });
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
previousButton?.addEventListener("click", () => moveCarousel(-1));
nextButton?.addEventListener("click", () => moveCarousel(1));
launcherGrid?.addEventListener("scroll", updateCarouselButtons, { passive: true });
window.addEventListener("resize", updateCarouselButtons);
updateOnlineStatus();
updateCarouselButtons();
registerServiceWorker();
