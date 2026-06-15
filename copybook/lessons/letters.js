(() => {
  const lessons = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").flatMap((letter) => [
    { id: `letter_upper_${letter.toLowerCase()}`, category: "letter", display: letter, hint: "大寫", meaning: `uppercase ${letter}`, speakText: letter, lang: "en-US" },
    { id: `letter_lower_${letter.toLowerCase()}`, category: "letter", display: letter.toLowerCase(), hint: "小寫", meaning: `lowercase ${letter.toLowerCase()}`, speakText: letter.toLowerCase(), lang: "en-US" }
  ]);
  window.BulaTeachLessonData = {
    ...(window.BulaTeachLessonData || {}),
    letters: lessons
  };
})();
