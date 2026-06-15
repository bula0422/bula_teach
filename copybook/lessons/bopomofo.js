(() => {
  const lessons = [
    ["ㄅ", "F1.WAV"], ["ㄆ", "F2.WAV"], ["ㄇ", "F3.WAV"], ["ㄈ", "F4.WAV"],
    ["ㄉ", "F5.WAV"], ["ㄊ", "F6.WAV"], ["ㄋ", "F7.WAV"], ["ㄌ", "F8.WAV"],
    ["ㄍ", "F9.WAV"], ["ㄎ", "F10.WAV"], ["ㄏ", "F11.WAV"], ["ㄐ", "F12.WAV"],
    ["ㄑ", "F13.WAV"], ["ㄒ", "F14.WAV"], ["ㄓ", "F15.WAV"], ["ㄔ", "F16.WAV"],
    ["ㄕ", "F17.WAV"], ["ㄖ", "F18.WAV"], ["ㄗ", "F19.WAV"], ["ㄘ", "F20.WAV"],
    ["ㄙ", "F21.WAV"], ["ㄧ", "F35.WAV"], ["ㄨ", "F36.WAV"], ["ㄩ", "F37.WAV"],
    ["ㄚ", "F22.WAV"], ["ㄛ", "F23.WAV"], ["ㄜ", "F24.WAV"], ["ㄝ", "F25.WAV"],
    ["ㄞ", "F26.WAV"], ["ㄟ", "F27.WAV"], ["ㄠ", "F28.WAV"], ["ㄡ", "F29.WAV"],
    ["ㄢ", "F30.WAV"], ["ㄣ", "F31.WAV"], ["ㄤ", "F32.WAV"], ["ㄥ", "F33.WAV"],
    ["ㄦ", "F34.WAV"]
  ].map(([symbol, file], index) => ({
    id: `bpmf_${symbol}`,
    category: "bopomofo",
    display: symbol,
    hint: symbol,
    meaning: "教育部注音發音",
    speakText: symbol,
    lang: "zh-TW",
    audioUrl: `../assets/audio/bopomofo/${file}`
  }));
  window.BulaTeachLessonData = {
    ...(window.BulaTeachLessonData || {}),
    bopomofo: lessons
  };
})();
