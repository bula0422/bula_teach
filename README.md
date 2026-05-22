# Bula Teach

離線描紅與發音練習 PWA。這個版本是純靜態網站，不需要後端、不需要帳號，也不需要 build step。

## 功能

- iPad 觸控 / Apple Pencil 描紅練習
- 左側四種可收合字卡分類：注音、字母、國字、英文單字
- 注音使用教育部 37 個注音發音 WAV 音檔
- 字母與英文單字使用 Arial 描紅
- 國字與英文單字可新增、編輯、刪除
- 左側可搜尋字卡文字、提示、意思與發音文字
- 描寫區左右兩側懸浮上一張 / 下一張
- 描寫區右上角可清除筆跡、顯示 / 隱藏底稿
- 教材可匯出 / 匯入 JSON 備份
- PWA Service Worker 支援離線使用

## 本機測試

```bash
python3 -m http.server 5173
```

開啟：

```text
http://localhost:5173/
```

同一 Wi-Fi 的 iPad 可開：

```text
http://你的電腦區網IP:5173/
```

區網 HTTP 可測功能，但正式 PWA 離線安裝請使用 HTTPS 部署網址。

## 部署

目前專案是靜態檔案，可用 Cloudflare Pages 或 Workers/Assets 部署。

Cloudflare Pages 建議設定：

```text
Framework preset: None
Build command: 留空
Build output directory: /
Root directory: /
```

如果使用 Workers/Wrangler，部署命令通常是：

```bash
npx wrangler deploy
```

部署完成後，用 iPad Safari 開 HTTPS 網址，選「加入主畫面」。第一次開啟需要網路，之後已快取的 app 可離線使用。

## 預設教材

內建教材包含固定的 37 個注音、A-Z/a-z 字母，以及一組小學基礎入門國字與英文單字 starter set。這份 starter set 是為個人練習建立的常見基礎清單，不宣稱是完整官方年級字表。

## 資料分類

`app.js` 使用 `category` 區分教材：

```text
bopomofo  注音，固定教材，不可在 app 內編輯
letter    字母，固定教材，不可在 app 內編輯
hanzi     國字，可新增、編輯、刪除、匯入匯出
word      英文單字，可新增、編輯、刪除、匯入匯出
```

教材格式範例：

```js
{
  id: "hanzi_wo",
  category: "hanzi",
  display: "我",
  hint: "ㄨㄛˇ",
  meaning: "I / me",
  speakText: "我",
  lang: "zh-TW"
}
```

英文單字範例：

```js
{
  id: "word_apple",
  category: "word",
  display: "apple",
  hint: "[ˋæpəl]",
  meaning: "蘋果",
  speakText: "apple",
  lang: "en-US"
}
```

## 本機儲存

可編輯教材存在同一台裝置的 `localStorage`：

```text
bula-teach-lessons-v2
```

設定存在：

```text
bula-teach-settings-v1
```

備份狀態存在：

```text
bula-teach-backup-state-v1
```

清除 Safari 網站資料會移除本機編輯教材，所以建議定期在「教材管理」裡匯出備份。

## 匯入 / 匯出

「教材管理」提供：

- 匯出：下載 `bula-teach-lessons.json`
- 匯入：從 JSON 檔載入國字與英文單字
- 載入預設：用內建的小學基礎國字與英文單字 starter set 取代目前可編輯教材

匯出內容只包含可編輯的 `hanzi` 與 `word`，不包含固定的注音與字母。

iPad 上下載位置取決於：

```text
設定 > Safari > 下載項目
```

## 注音發音素材

預設注音教材使用 `assets/audio/bopomofo/` 內的 37 個教育部注音發音 WAV 檔。播放注音時優先使用音檔，不依賴系統 TTS。

素材授權與姓名標示保存在 `assets/THIRD_PARTY_NOTICES.md`：

- 2017 © 教育部，國語注音符號手冊-開放部件。
- 素材依創用 CC 姓名標示 4.0 國際版本釋出。

## 字型

目前沒有內嵌字型檔，中文與注音使用系統字型，字母與英文單字使用 Arial / Helvetica fallback。若之後需要每台裝置完全一致，可加入有授權的字型檔並於 `styles.css` 使用 `@font-face`。

## 更新流程

修改後建議先檢查：

```bash
node --check app.js
node --check sw.js
```

提交並推送：

```bash
git add .
git commit -m "Your change"
git push
```

如果 Cloudflare 已連 GitHub，push 後會自動部署；如果是手動 Wrangler 部署，需再執行部署命令。
