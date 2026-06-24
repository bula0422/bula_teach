(() => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => ({
    id: "letter_lower_" + letter,
    category: "letter",
    display: letter,
    hint: "小寫",
    meaning: "lowercase " + letter,
    speakText: letter,
    lang: "en-US"
  }));
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => ({
    id: "letter_upper_" + letter.toLowerCase(),
    category: "letter",
    display: letter,
    hint: "大寫",
    meaning: "uppercase " + letter,
    speakText: letter,
    lang: "en-US"
  }));
  const lessons = [...lowercase, ...uppercase];
  window.BulaTeachLessonData = {
    ...(window.BulaTeachLessonData || {}),
    letters: lessons
  };
})();
