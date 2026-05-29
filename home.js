const offlineStatus = document.querySelector("#offlineStatus");

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
updateOnlineStatus();
registerServiceWorker();
