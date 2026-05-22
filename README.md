# Bula Teach

離線描紅與發音練習 PWA。這個版本是純靜態網站，不需要後端、不需要帳號，也不需要 build step。

## 本機測試

```bash
python3 -m http.server 5173
```

開啟：

```text
http://localhost:5173/
```

## Cloudflare Pages 部署

建議設定：

```text
Framework preset: None
Build command: 留空
Build output directory: /
Root directory: /
```

部署完成後，用 iPad Safari 開啟 Cloudflare Pages 的 HTTPS 網址，例如：

```text
https://your-project.pages.dev/
```

然後使用 Safari 的分享選單，選「加入主畫面」。第一次開啟需要網路，之後已快取的 app 可離線使用。

## 更新教材

教材目前在 `app.js` 的 `LESSONS` 陣列內。每一筆資料格式如下：

```js
{
  id: "zh_wo",
  type: "chinese",
  display: "我",
  hint: "ㄨㄛˇ",
  meaning: "I / me",
  speakText: "我",
  lang: "zh-TW"
}
```

`type` 可使用：

```text
chinese
bopomofo
english
```

`display` 是畫面上描紅的大字，`speakText` 是實際交給系統 TTS 念的文字。注音符號建議用「波、坡、摸」這類較容易被 TTS 正確念出的文字。

## 字型

目前沒有內嵌字型檔，使用 iPad 或系統內建字型做描紅底稿。這樣最簡單，也不需要處理字型授權。

如果之後需要每台裝置顯示完全一致，可以加入有授權的字型檔，再於 `styles.css` 使用 `@font-face`。


## App 內新增字卡

側邊欄可以直接新增字卡。新增的資料會存在同一台裝置的 `localStorage`，離線可用，但不會同步到其他裝置。清除瀏覽器網站資料會移除這些自訂字卡。

欄位：

- 新增字卡：畫面上要描紅的文字。
- 分類：中文、注音或英文，會影響字型和 TTS 語言。
- 提示：顯示在字卡上的提示，例如注音或中文意思。
- 發音文字：實際交給 TTS 念的文字，留空時使用提示或字卡文字。


## 設定與練習工具

主畫面工具列包含播放、清除、顯示/隱藏底稿、設定與完成。設定面板目前可調整：

- 切換字卡自動播放
- 顯示或隱藏描紅底稿

設定會存在同一台裝置的 `localStorage`。

## 自訂字卡編輯與刪除

自訂字卡會在清單右側顯示編輯與刪除按鈕。預設教材不可在 app 內刪除，若要修改預設教材，請編輯 `app.js` 的 `DEFAULT_LESSONS`。

英文預設教材包含常用單字，以及 A-Z 大寫與 a-z 小寫字母練習。


## 注音發音素材

預設注音教材使用 `assets/audio/bopomofo/` 內的 37 個教育部注音發音 WAV 檔。播放注音時會優先使用音檔，不再依賴系統 TTS 用中文字替代發音。

素材授權與姓名標示保存在 `assets/THIRD_PARTY_NOTICES.md`：

- 2017 © 教育部，國語注音符號手冊-開放部件。
- 素材依創用 CC 姓名標示 4.0 國際版本釋出。
