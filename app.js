const BOPOMOFO_BASE = [
  ["ㄅ", "F1.WAV"], ["ㄆ", "F2.WAV"], ["ㄇ", "F3.WAV"], ["ㄈ", "F4.WAV"],
  ["ㄉ", "F5.WAV"], ["ㄊ", "F6.WAV"], ["ㄋ", "F7.WAV"], ["ㄌ", "F8.WAV"],
  ["ㄍ", "F9.WAV"], ["ㄎ", "F10.WAV"], ["ㄏ", "F11.WAV"], ["ㄐ", "F12.WAV"],
  ["ㄑ", "F13.WAV"], ["ㄒ", "F14.WAV"], ["ㄓ", "F15.WAV"], ["ㄔ", "F16.WAV"],
  ["ㄕ", "F17.WAV"], ["ㄖ", "F18.WAV"], ["ㄗ", "F19.WAV"], ["ㄘ", "F20.WAV"],
  ["ㄙ", "F21.WAV"], ["ㄧ", "F22.WAV"], ["ㄨ", "F23.WAV"], ["ㄩ", "F24.WAV"],
  ["ㄚ", "F25.WAV"], ["ㄛ", "F26.WAV"], ["ㄜ", "F27.WAV"], ["ㄝ", "F28.WAV"],
  ["ㄞ", "F29.WAV"], ["ㄟ", "F30.WAV"], ["ㄠ", "F31.WAV"], ["ㄡ", "F32.WAV"],
  ["ㄢ", "F33.WAV"], ["ㄣ", "F34.WAV"], ["ㄤ", "F35.WAV"], ["ㄥ", "F36.WAV"],
  ["ㄦ", "F37.WAV"]
].map(([symbol, file], index) => ({
  id: `bpmf_${index + 1}`,
  category: "bopomofo",
  display: symbol,
  hint: symbol,
  meaning: "教育部注音發音",
  speakText: symbol,
  lang: "zh-TW",
  audioUrl: `./assets/audio/bopomofo/${file}`
}));

const LETTER_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").flatMap((letter) => [
  { id: `letter_upper_${letter.toLowerCase()}`, category: "letter", display: letter, hint: "大寫", meaning: `uppercase ${letter}`, speakText: letter, lang: "en-US" },
  { id: `letter_lower_${letter.toLowerCase()}`, category: "letter", display: letter.toLowerCase(), hint: "小寫", meaning: `lowercase ${letter.toLowerCase()}`, speakText: letter.toLowerCase(), lang: "en-US" }
]);

const BASE_LESSONS = [
  ...BOPOMOFO_BASE,
  ...LETTER_BASE,
  { id: "hanzi_wo", category: "hanzi", display: "我", hint: "ㄨㄛˇ", meaning: "I / me", speakText: "我", lang: "zh-TW" },
  { id: "hanzi_ni", category: "hanzi", display: "你", hint: "ㄋㄧˇ", meaning: "you", speakText: "你", lang: "zh-TW" },
  { id: "hanzi_ta_m", category: "hanzi", display: "他", hint: "ㄊㄚ", meaning: "he", speakText: "他", lang: "zh-TW" },
  { id: "hanzi_ta_f", category: "hanzi", display: "她", hint: "ㄊㄚ", meaning: "she", speakText: "她", lang: "zh-TW" },
  { id: "hanzi_shi", category: "hanzi", display: "是", hint: "ㄕˋ", meaning: "to be", speakText: "是", lang: "zh-TW" },
  { id: "hanzi_bu", category: "hanzi", display: "不", hint: "ㄅㄨˋ", meaning: "not", speakText: "不", lang: "zh-TW" },
  { id: "hanzi_you", category: "hanzi", display: "有", hint: "ㄧㄡˇ", meaning: "have", speakText: "有", lang: "zh-TW" },
  { id: "hanzi_zai", category: "hanzi", display: "在", hint: "ㄗㄞˋ", meaning: "at / in", speakText: "在", lang: "zh-TW" },
  { id: "hanzi_ren", category: "hanzi", display: "人", hint: "ㄖㄣˊ", meaning: "person", speakText: "人", lang: "zh-TW" },
  { id: "hanzi_da", category: "hanzi", display: "大", hint: "ㄉㄚˋ", meaning: "big", speakText: "大", lang: "zh-TW" },
  { id: "hanzi_xiao", category: "hanzi", display: "小", hint: "ㄒㄧㄠˇ", meaning: "small", speakText: "小", lang: "zh-TW" },
  { id: "hanzi_shang", category: "hanzi", display: "上", hint: "ㄕㄤˋ", meaning: "up", speakText: "上", lang: "zh-TW" },
  { id: "hanzi_xia", category: "hanzi", display: "下", hint: "ㄒㄧㄚˋ", meaning: "down", speakText: "下", lang: "zh-TW" },
  { id: "hanzi_zhong", category: "hanzi", display: "中", hint: "ㄓㄨㄥ", meaning: "middle", speakText: "中", lang: "zh-TW" },
  { id: "hanzi_tian", category: "hanzi", display: "天", hint: "ㄊㄧㄢ", meaning: "sky / day", speakText: "天", lang: "zh-TW" },
  { id: "hanzi_di", category: "hanzi", display: "地", hint: "ㄉㄧˋ", meaning: "ground", speakText: "地", lang: "zh-TW" },
  { id: "hanzi_ri", category: "hanzi", display: "日", hint: "ㄖˋ", meaning: "sun / day", speakText: "日", lang: "zh-TW" },
  { id: "hanzi_yue", category: "hanzi", display: "月", hint: "ㄩㄝˋ", meaning: "moon / month", speakText: "月", lang: "zh-TW" },
  { id: "hanzi_shan", category: "hanzi", display: "山", hint: "ㄕㄢ", meaning: "mountain", speakText: "山", lang: "zh-TW" },
  { id: "hanzi_shui", category: "hanzi", display: "水", hint: "ㄕㄨㄟˇ", meaning: "water", speakText: "水", lang: "zh-TW" },
  { id: "hanzi_huo", category: "hanzi", display: "火", hint: "ㄏㄨㄛˇ", meaning: "fire", speakText: "火", lang: "zh-TW" },
  { id: "hanzi_mu", category: "hanzi", display: "木", hint: "ㄇㄨˋ", meaning: "wood / tree", speakText: "木", lang: "zh-TW" },
  { id: "hanzi_tu", category: "hanzi", display: "土", hint: "ㄊㄨˇ", meaning: "soil", speakText: "土", lang: "zh-TW" },
  { id: "hanzi_jin", category: "hanzi", display: "金", hint: "ㄐㄧㄣ", meaning: "gold / metal", speakText: "金", lang: "zh-TW" },
  { id: "hanzi_kou", category: "hanzi", display: "口", hint: "ㄎㄡˇ", meaning: "mouth", speakText: "口", lang: "zh-TW" },
  { id: "hanzi_shou", category: "hanzi", display: "手", hint: "ㄕㄡˇ", meaning: "hand", speakText: "手", lang: "zh-TW" },
  { id: "hanzi_mu_eye", category: "hanzi", display: "目", hint: "ㄇㄨˋ", meaning: "eye", speakText: "目", lang: "zh-TW" },
  { id: "hanzi_er", category: "hanzi", display: "耳", hint: "ㄦˇ", meaning: "ear", speakText: "耳", lang: "zh-TW" },
  { id: "hanzi_zu", category: "hanzi", display: "足", hint: "ㄗㄨˊ", meaning: "foot", speakText: "足", lang: "zh-TW" },
  { id: "hanzi_xin", category: "hanzi", display: "心", hint: "ㄒㄧㄣ", meaning: "heart", speakText: "心", lang: "zh-TW" },
  { id: "hanzi_men", category: "hanzi", display: "門", hint: "ㄇㄣˊ", meaning: "door", speakText: "門", lang: "zh-TW" },
  { id: "hanzi_che", category: "hanzi", display: "車", hint: "ㄔㄜ", meaning: "car", speakText: "車", lang: "zh-TW" },
  { id: "hanzi_ma", category: "hanzi", display: "馬", hint: "ㄇㄚˇ", meaning: "horse", speakText: "馬", lang: "zh-TW" },
  { id: "hanzi_niao", category: "hanzi", display: "鳥", hint: "ㄋㄧㄠˇ", meaning: "bird", speakText: "鳥", lang: "zh-TW" },
  { id: "hanzi_yu_fish", category: "hanzi", display: "魚", hint: "ㄩˊ", meaning: "fish", speakText: "魚", lang: "zh-TW" },
  { id: "hanzi_chong", category: "hanzi", display: "蟲", hint: "ㄔㄨㄥˊ", meaning: "bug", speakText: "蟲", lang: "zh-TW" },
  { id: "hanzi_hua", category: "hanzi", display: "花", hint: "ㄏㄨㄚ", meaning: "flower", speakText: "花", lang: "zh-TW" },
  { id: "hanzi_cao", category: "hanzi", display: "草", hint: "ㄘㄠˇ", meaning: "grass", speakText: "草", lang: "zh-TW" },
  { id: "hanzi_mi", category: "hanzi", display: "米", hint: "ㄇㄧˇ", meaning: "rice", speakText: "米", lang: "zh-TW" },
  { id: "hanzi_fan", category: "hanzi", display: "飯", hint: "ㄈㄢˋ", meaning: "meal / rice", speakText: "飯", lang: "zh-TW" },
  { id: "hanzi_guo", category: "hanzi", display: "果", hint: "ㄍㄨㄛˇ", meaning: "fruit", speakText: "果", lang: "zh-TW" },
  { id: "hanzi_ai", category: "hanzi", display: "愛", hint: "ㄞˋ", meaning: "love", speakText: "愛", lang: "zh-TW" },
  { id: "hanzi_hao", category: "hanzi", display: "好", hint: "ㄏㄠˇ", meaning: "good", speakText: "好", lang: "zh-TW" },
  { id: "hanzi_lai", category: "hanzi", display: "來", hint: "ㄌㄞˊ", meaning: "come", speakText: "來", lang: "zh-TW" },
  { id: "hanzi_qu", category: "hanzi", display: "去", hint: "ㄑㄩˋ", meaning: "go", speakText: "去", lang: "zh-TW" },
  { id: "hanzi_kan", category: "hanzi", display: "看", hint: "ㄎㄢˋ", meaning: "look", speakText: "看", lang: "zh-TW" },
  { id: "hanzi_ting", category: "hanzi", display: "聽", hint: "ㄊㄧㄥ", meaning: "listen", speakText: "聽", lang: "zh-TW" },
  { id: "hanzi_shuo", category: "hanzi", display: "說", hint: "ㄕㄨㄛ", meaning: "speak", speakText: "說", lang: "zh-TW" },
  { id: "hanzi_xie", category: "hanzi", display: "寫", hint: "ㄒㄧㄝˇ", meaning: "write", speakText: "寫", lang: "zh-TW" },
  { id: "hanzi_du", category: "hanzi", display: "讀", hint: "ㄉㄨˊ", meaning: "read", speakText: "讀", lang: "zh-TW" },
  { id: "hanzi_xue", category: "hanzi", display: "學", hint: "ㄒㄩㄝˊ", meaning: "learn", speakText: "學", lang: "zh-TW" },
  { id: "hanzi_wen", category: "hanzi", display: "問", hint: "ㄨㄣˋ", meaning: "ask", speakText: "問", lang: "zh-TW" },
  { id: "hanzi_xiao_school", category: "hanzi", display: "校", hint: "ㄒㄧㄠˋ", meaning: "school", speakText: "校", lang: "zh-TW" },
  { id: "hanzi_jia", category: "hanzi", display: "家", hint: "ㄐㄧㄚ", meaning: "home", speakText: "家", lang: "zh-TW" },
  { id: "hanzi_ba", category: "hanzi", display: "爸", hint: "ㄅㄚˋ", meaning: "dad", speakText: "爸", lang: "zh-TW" },
  { id: "hanzi_ma_mom", category: "hanzi", display: "媽", hint: "ㄇㄚ", meaning: "mom", speakText: "媽", lang: "zh-TW" },
  { id: "hanzi_ge", category: "hanzi", display: "哥", hint: "ㄍㄜ", meaning: "older brother", speakText: "哥", lang: "zh-TW" },
  { id: "hanzi_jie", category: "hanzi", display: "姐", hint: "ㄐㄧㄝˇ", meaning: "older sister", speakText: "姐", lang: "zh-TW" },
  { id: "hanzi_di_bro", category: "hanzi", display: "弟", hint: "ㄉㄧˋ", meaning: "younger brother", speakText: "弟", lang: "zh-TW" },
  { id: "hanzi_mei", category: "hanzi", display: "妹", hint: "ㄇㄟˋ", meaning: "younger sister", speakText: "妹", lang: "zh-TW" },
  { id: "hanzi_peng", category: "hanzi", display: "朋", hint: "ㄆㄥˊ", meaning: "friend part", speakText: "朋", lang: "zh-TW" },
  { id: "hanzi_you_friend", category: "hanzi", display: "友", hint: "ㄧㄡˇ", meaning: "friend", speakText: "友", lang: "zh-TW" },
  { id: "hanzi_nian", category: "hanzi", display: "年", hint: "ㄋㄧㄢˊ", meaning: "year", speakText: "年", lang: "zh-TW" },
  { id: "hanzi_jin_today", category: "hanzi", display: "今", hint: "ㄐㄧㄣ", meaning: "today part", speakText: "今", lang: "zh-TW" },
  { id: "hanzi_ming", category: "hanzi", display: "明", hint: "ㄇㄧㄥˊ", meaning: "bright / tomorrow part", speakText: "明", lang: "zh-TW" },
  { id: "hanzi_zao", category: "hanzi", display: "早", hint: "ㄗㄠˇ", meaning: "morning", speakText: "早", lang: "zh-TW" },
  { id: "hanzi_wan", category: "hanzi", display: "晚", hint: "ㄨㄢˇ", meaning: "evening", speakText: "晚", lang: "zh-TW" },
  { id: "hanzi_qi", category: "hanzi", display: "七", hint: "ㄑㄧ", meaning: "seven", speakText: "七", lang: "zh-TW" },
  { id: "hanzi_yi", category: "hanzi", display: "一", hint: "ㄧ", meaning: "one", speakText: "一", lang: "zh-TW" },
  { id: "hanzi_er_two", category: "hanzi", display: "二", hint: "ㄦˋ", meaning: "two", speakText: "二", lang: "zh-TW" },
  { id: "hanzi_san", category: "hanzi", display: "三", hint: "ㄙㄢ", meaning: "three", speakText: "三", lang: "zh-TW" },
  { id: "hanzi_si", category: "hanzi", display: "四", hint: "ㄙˋ", meaning: "four", speakText: "四", lang: "zh-TW" },
  { id: "hanzi_wu", category: "hanzi", display: "五", hint: "ㄨˇ", meaning: "five", speakText: "五", lang: "zh-TW" },
  { id: "hanzi_liu", category: "hanzi", display: "六", hint: "ㄌㄧㄡˋ", meaning: "six", speakText: "六", lang: "zh-TW" },
  { id: "hanzi_ba_eight", category: "hanzi", display: "八", hint: "ㄅㄚ", meaning: "eight", speakText: "八", lang: "zh-TW" },
  { id: "hanzi_jiu", category: "hanzi", display: "九", hint: "ㄐㄧㄡˇ", meaning: "nine", speakText: "九", lang: "zh-TW" },
  { id: "hanzi_shi_ten", category: "hanzi", display: "十", hint: "ㄕˊ", meaning: "ten", speakText: "十", lang: "zh-TW" },
  { id: "hanzi_bai", category: "hanzi", display: "百", hint: "ㄅㄞˇ", meaning: "hundred", speakText: "百", lang: "zh-TW" },
  { id: "hanzi_qian", category: "hanzi", display: "千", hint: "ㄑㄧㄢ", meaning: "thousand", speakText: "千", lang: "zh-TW" },
  { id: "hanzi_duo", category: "hanzi", display: "多", hint: "ㄉㄨㄛ", meaning: "many", speakText: "多", lang: "zh-TW" },
  { id: "hanzi_shao", category: "hanzi", display: "少", hint: "ㄕㄠˇ", meaning: "few", speakText: "少", lang: "zh-TW" },
  { id: "hanzi_chang", category: "hanzi", display: "長", hint: "ㄔㄤˊ", meaning: "long", speakText: "長", lang: "zh-TW" },
  { id: "hanzi_duan", category: "hanzi", display: "短", hint: "ㄉㄨㄢˇ", meaning: "short", speakText: "短", lang: "zh-TW" },
  { id: "hanzi_gao", category: "hanzi", display: "高", hint: "ㄍㄠ", meaning: "tall", speakText: "高", lang: "zh-TW" },
  { id: "hanzi_di_low", category: "hanzi", display: "低", hint: "ㄉㄧ", meaning: "low", speakText: "低", lang: "zh-TW" },
  { id: "hanzi_hong", category: "hanzi", display: "紅", hint: "ㄏㄨㄥˊ", meaning: "red", speakText: "紅", lang: "zh-TW" },
  { id: "hanzi_bai_white", category: "hanzi", display: "白", hint: "ㄅㄞˊ", meaning: "white", speakText: "白", lang: "zh-TW" },
  { id: "hanzi_he_black", category: "hanzi", display: "黑", hint: "ㄏㄟ", meaning: "black", speakText: "黑", lang: "zh-TW" },
  { id: "hanzi_lan", category: "hanzi", display: "藍", hint: "ㄌㄢˊ", meaning: "blue", speakText: "藍", lang: "zh-TW" },
  { id: "hanzi_lv", category: "hanzi", display: "綠", hint: "ㄌㄩˋ", meaning: "green", speakText: "綠", lang: "zh-TW" },
  { id: "hanzi_yu_rain", category: "hanzi", display: "雨", hint: "ㄩˇ", meaning: "rain", speakText: "雨", lang: "zh-TW" },
  { id: "hanzi_feng", category: "hanzi", display: "風", hint: "ㄈㄥ", meaning: "wind", speakText: "風", lang: "zh-TW" },
  { id: "hanzi_lai_surname", category: "hanzi", display: "賴", hint: "ㄌㄞˋ", pinyin: "lài", meaning: "surname Lai", speakText: "賴", lang: "zh-TW" },
  { id: "hanzi_pin", category: "hanzi", display: "品", hint: "ㄆㄧㄣˇ", pinyin: "pǐn", meaning: "item / character", speakText: "品", lang: "zh-TW" },
  { id: "hanzi_wei_jade", category: "hanzi", display: "瑋", hint: "ㄨㄟˇ", pinyin: "wěi", meaning: "precious jade / name", speakText: "瑋", lang: "zh-TW" },
  { id: "hanzi_an", category: "hanzi", display: "安", hint: "ㄢ", pinyin: "ān", meaning: "safe / peace", speakText: "安", lang: "zh-TW" },
  { id: "hanzi_yun_cloud", category: "hanzi", display: "雲", hint: "ㄩㄣˊ", pinyin: "yún", meaning: "cloud", speakText: "雲", lang: "zh-TW" },
  { id: "hanzi_que", category: "hanzi", display: "確", hint: "ㄑㄩㄝˋ", pinyin: "què", meaning: "certain / correct", speakText: "確", lang: "zh-TW" },
  { id: "hanzi_ding", category: "hanzi", display: "定", hint: "ㄉㄧㄥˋ", pinyin: "dìng", meaning: "decide / set", speakText: "定", lang: "zh-TW" },
  { id: "hanzi_zhi", category: "hanzi", display: "知", hint: "ㄓ", pinyin: "zhī", meaning: "know", speakText: "知", lang: "zh-TW" },
  { id: "hanzi_dao_way", category: "hanzi", display: "道", hint: "ㄉㄠˋ", pinyin: "dào", meaning: "way / road", speakText: "道", lang: "zh-TW" },
  { id: "hanzi_ming_name", category: "hanzi", display: "名", hint: "ㄇㄧㄥˊ", pinyin: "míng", meaning: "name", speakText: "名", lang: "zh-TW" },
  { id: "hanzi_zi", category: "hanzi", display: "字", hint: "ㄗˋ", pinyin: "zì", meaning: "character / word", speakText: "字", lang: "zh-TW" },
  { id: "hanzi_ke", category: "hanzi", display: "課", hint: "ㄎㄜˋ", pinyin: "kè", meaning: "lesson / class", speakText: "課", lang: "zh-TW" },
  { id: "hanzi_shu", category: "hanzi", display: "書", hint: "ㄕㄨ", pinyin: "shū", meaning: "book", speakText: "書", lang: "zh-TW" },
  { id: "hanzi_ben", category: "hanzi", display: "本", hint: "ㄅㄣˇ", pinyin: "běn", meaning: "book / root", speakText: "本", lang: "zh-TW" },
  { id: "hanzi_bi", category: "hanzi", display: "筆", hint: "ㄅㄧˇ", pinyin: "bǐ", meaning: "pen / pencil", speakText: "筆", lang: "zh-TW" },
  { id: "hanzi_zhi_paper", category: "hanzi", display: "紙", hint: "ㄓˇ", pinyin: "zhǐ", meaning: "paper", speakText: "紙", lang: "zh-TW" },
  { id: "hanzi_zhuo", category: "hanzi", display: "桌", hint: "ㄓㄨㄛ", pinyin: "zhuō", meaning: "table / desk", speakText: "桌", lang: "zh-TW" },
  { id: "hanzi_yi_chair", category: "hanzi", display: "椅", hint: "ㄧˇ", pinyin: "yǐ", meaning: "chair", speakText: "椅", lang: "zh-TW" },
  { id: "hanzi_qian_front", category: "hanzi", display: "前", hint: "ㄑㄧㄢˊ", pinyin: "qián", meaning: "front / before", speakText: "前", lang: "zh-TW" },
  { id: "hanzi_hou", category: "hanzi", display: "後", hint: "ㄏㄡˋ", pinyin: "hòu", meaning: "back / after", speakText: "後", lang: "zh-TW" },
  { id: "hanzi_zuo_left", category: "hanzi", display: "左", hint: "ㄗㄨㄛˇ", pinyin: "zuǒ", meaning: "left", speakText: "左", lang: "zh-TW" },
  { id: "hanzi_you_right", category: "hanzi", display: "右", hint: "ㄧㄡˋ", pinyin: "yòu", meaning: "right", speakText: "右", lang: "zh-TW" },
  { id: "hanzi_li", category: "hanzi", display: "裡", hint: "ㄌㄧˇ", pinyin: "lǐ", meaning: "inside", speakText: "裡", lang: "zh-TW" },
  { id: "hanzi_wai", category: "hanzi", display: "外", hint: "ㄨㄞˋ", pinyin: "wài", meaning: "outside", speakText: "外", lang: "zh-TW" },
  { id: "hanzi_nan", category: "hanzi", display: "男", hint: "ㄋㄢˊ", pinyin: "nán", meaning: "boy / male", speakText: "男", lang: "zh-TW" },
  { id: "hanzi_nv", category: "hanzi", display: "女", hint: "ㄋㄩˇ", pinyin: "nǚ", meaning: "girl / female", speakText: "女", lang: "zh-TW" },
  { id: "hanzi_zi_child", category: "hanzi", display: "子", hint: "ㄗˇ", pinyin: "zǐ", meaning: "child / son", speakText: "子", lang: "zh-TW" },
  { id: "hanzi_er_child", category: "hanzi", display: "兒", hint: "ㄦˊ", pinyin: "ér", meaning: "child", speakText: "兒", lang: "zh-TW" },
  { id: "hanzi_laoshi_lao", category: "hanzi", display: "老", hint: "ㄌㄠˇ", pinyin: "lǎo", meaning: "old / teacher part", speakText: "老", lang: "zh-TW" },
  { id: "hanzi_shi_teacher", category: "hanzi", display: "師", hint: "ㄕ", pinyin: "shī", meaning: "teacher", speakText: "師", lang: "zh-TW" },
  { id: "hanzi_sheng", category: "hanzi", display: "生", hint: "ㄕㄥ", pinyin: "shēng", meaning: "life / student part", speakText: "生", lang: "zh-TW" },
  { id: "hanzi_ban", category: "hanzi", display: "班", hint: "ㄅㄢ", pinyin: "bān", meaning: "class", speakText: "班", lang: "zh-TW" },
  { id: "hanzi_tong", category: "hanzi", display: "同", hint: "ㄊㄨㄥˊ", pinyin: "tóng", meaning: "same", speakText: "同", lang: "zh-TW" },
  { id: "hanzi_men_plural", category: "hanzi", display: "們", hint: "ㄇㄣ˙", pinyin: "men", meaning: "plural marker", speakText: "們", lang: "zh-TW" },
  { id: "hanzi_zhe", category: "hanzi", display: "這", hint: "ㄓㄜˋ", pinyin: "zhè", meaning: "this", speakText: "這", lang: "zh-TW" },
  { id: "hanzi_na", category: "hanzi", display: "那", hint: "ㄋㄚˋ", pinyin: "nà", meaning: "that", speakText: "那", lang: "zh-TW" },
  { id: "hanzi_na_which", category: "hanzi", display: "哪", hint: "ㄋㄚˇ", pinyin: "nǎ", meaning: "which", speakText: "哪", lang: "zh-TW" },
  { id: "hanzi_shei", category: "hanzi", display: "誰", hint: "ㄕㄟˊ", pinyin: "shéi", meaning: "who", speakText: "誰", lang: "zh-TW" },
  { id: "hanzi_shen", category: "hanzi", display: "什", hint: "ㄕㄣˊ", pinyin: "shén", meaning: "what part", speakText: "什", lang: "zh-TW" },
  { id: "hanzi_me", category: "hanzi", display: "麼", hint: "ㄇㄜ˙", pinyin: "me", meaning: "what particle", speakText: "麼", lang: "zh-TW" },
  { id: "hanzi_wei_because", category: "hanzi", display: "為", hint: "ㄨㄟˋ", pinyin: "wèi", meaning: "for / because", speakText: "為", lang: "zh-TW" },
  { id: "hanzi_yin", category: "hanzi", display: "因", hint: "ㄧㄣ", pinyin: "yīn", meaning: "cause", speakText: "因", lang: "zh-TW" },
  { id: "hanzi_suo", category: "hanzi", display: "所", hint: "ㄙㄨㄛˇ", pinyin: "suǒ", meaning: "place / that which", speakText: "所", lang: "zh-TW" },
  { id: "hanzi_yi_also", category: "hanzi", display: "也", hint: "ㄧㄝˇ", pinyin: "yě", meaning: "also", speakText: "也", lang: "zh-TW" },
  { id: "hanzi_dou", category: "hanzi", display: "都", hint: "ㄉㄡ", pinyin: "dōu", meaning: "all", speakText: "都", lang: "zh-TW" },
  { id: "hanzi_hen", category: "hanzi", display: "很", hint: "ㄏㄣˇ", pinyin: "hěn", meaning: "very", speakText: "很", lang: "zh-TW" },
  { id: "hanzi_zhen", category: "hanzi", display: "真", hint: "ㄓㄣ", pinyin: "zhēn", meaning: "true / really", speakText: "真", lang: "zh-TW" },
  { id: "hanzi_xiang", category: "hanzi", display: "想", hint: "ㄒㄧㄤˇ", pinyin: "xiǎng", meaning: "think / want", speakText: "想", lang: "zh-TW" },
  { id: "hanzi_yao", category: "hanzi", display: "要", hint: "ㄧㄠˋ", pinyin: "yào", meaning: "want / need", speakText: "要", lang: "zh-TW" },
  { id: "hanzi_hui", category: "hanzi", display: "會", hint: "ㄏㄨㄟˋ", pinyin: "huì", meaning: "can / will", speakText: "會", lang: "zh-TW" },
  { id: "hanzi_neng", category: "hanzi", display: "能", hint: "ㄋㄥˊ", pinyin: "néng", meaning: "able", speakText: "能", lang: "zh-TW" },
  { id: "hanzi_mai", category: "hanzi", display: "買", hint: "ㄇㄞˇ", pinyin: "mǎi", meaning: "buy", speakText: "買", lang: "zh-TW" },
  { id: "hanzi_mai_sell", category: "hanzi", display: "賣", hint: "ㄇㄞˋ", pinyin: "mài", meaning: "sell", speakText: "賣", lang: "zh-TW" },
  { id: "hanzi_qing", category: "hanzi", display: "請", hint: "ㄑㄧㄥˇ", pinyin: "qǐng", meaning: "please", speakText: "請", lang: "zh-TW" },
  { id: "hanzi_xie_thanks", category: "hanzi", display: "謝", hint: "ㄒㄧㄝˋ", pinyin: "xiè", meaning: "thank", speakText: "謝", lang: "zh-TW" },
  { id: "hanzi_dui", category: "hanzi", display: "對", hint: "ㄉㄨㄟˋ", pinyin: "duì", meaning: "correct / toward", speakText: "對", lang: "zh-TW" },
  { id: "hanzi_cuo", category: "hanzi", display: "錯", hint: "ㄘㄨㄛˋ", pinyin: "cuò", meaning: "wrong", speakText: "錯", lang: "zh-TW" },
  { id: "hanzi_kai", category: "hanzi", display: "開", hint: "ㄎㄞ", pinyin: "kāi", meaning: "open", speakText: "開", lang: "zh-TW" },
  { id: "hanzi_guan", category: "hanzi", display: "關", hint: "ㄍㄨㄢ", pinyin: "guān", meaning: "close", speakText: "關", lang: "zh-TW" },
  { id: "hanzi_xin_new", category: "hanzi", display: "新", hint: "ㄒㄧㄣ", pinyin: "xīn", meaning: "new", speakText: "新", lang: "zh-TW" },
  { id: "hanzi_jiu_old", category: "hanzi", display: "舊", hint: "ㄐㄧㄡˋ", pinyin: "jiù", meaning: "old", speakText: "舊", lang: "zh-TW" },
  { id: "word_apple", category: "word", display: "apple", hint: "[ˋæpəl]", meaning: "蘋果", speakText: "apple", lang: "en-US" },
  { id: "word_book", category: "word", display: "book", hint: "[bʊk]", meaning: "書", speakText: "book", lang: "en-US" },
  { id: "word_cat", category: "word", display: "cat", hint: "[kæt]", meaning: "貓", speakText: "cat", lang: "en-US" },
  { id: "word_dog", category: "word", display: "dog", hint: "[dɔg]", meaning: "狗", speakText: "dog", lang: "en-US" },
  { id: "word_bag", category: "word", display: "bag", hint: "[bæg]", meaning: "書包 / 袋子", speakText: "bag", lang: "en-US" },
  { id: "word_pen", category: "word", display: "pen", hint: "[pɛn]", meaning: "筆", speakText: "pen", lang: "en-US" },
  { id: "word_pencil", category: "word", display: "pencil", hint: "[ˋpɛnsəl]", meaning: "鉛筆", speakText: "pencil", lang: "en-US" },
  { id: "word_ruler", category: "word", display: "ruler", hint: "[ˋrulɚ]", meaning: "尺", speakText: "ruler", lang: "en-US" },
  { id: "word_eraser", category: "word", display: "eraser", hint: "[ɪˋresɚ]", meaning: "橡皮擦", speakText: "eraser", lang: "en-US" },
  { id: "word_school", category: "word", display: "school", hint: "[skul]", meaning: "學校", speakText: "school", lang: "en-US" },
  { id: "word_teacher", category: "word", display: "teacher", hint: "[ˋtitʃɚ]", meaning: "老師", speakText: "teacher", lang: "en-US" },
  { id: "word_student", category: "word", display: "student", hint: "[ˋstudənt]", meaning: "學生", speakText: "student", lang: "en-US" },
  { id: "word_friend", category: "word", display: "friend", hint: "[frɛnd]", meaning: "朋友", speakText: "friend", lang: "en-US" },
  { id: "word_family", category: "word", display: "family", hint: "[ˋfæməlɪ]", meaning: "家人", speakText: "family", lang: "en-US" },
  { id: "word_mother", category: "word", display: "mother", hint: "[ˋmʌðɚ]", meaning: "媽媽", speakText: "mother", lang: "en-US" },
  { id: "word_father", category: "word", display: "father", hint: "[ˋfɑðɚ]", meaning: "爸爸", speakText: "father", lang: "en-US" },
  { id: "word_brother", category: "word", display: "brother", hint: "[ˋbrʌðɚ]", meaning: "兄弟", speakText: "brother", lang: "en-US" },
  { id: "word_sister", category: "word", display: "sister", hint: "[ˋsɪstɚ]", meaning: "姐妹", speakText: "sister", lang: "en-US" },
  { id: "word_home", category: "word", display: "home", hint: "[hom]", meaning: "家", speakText: "home", lang: "en-US" },
  { id: "word_house", category: "word", display: "house", hint: "[haʊs]", meaning: "房子", speakText: "house", lang: "en-US" },
  { id: "word_room", category: "word", display: "room", hint: "[rum]", meaning: "房間", speakText: "room", lang: "en-US" },
  { id: "word_door", category: "word", display: "door", hint: "[dɔr]", meaning: "門", speakText: "door", lang: "en-US" },
  { id: "word_window", category: "word", display: "window", hint: "[ˋwɪndo]", meaning: "窗戶", speakText: "window", lang: "en-US" },
  { id: "word_table", category: "word", display: "table", hint: "[ˋtebəl]", meaning: "桌子", speakText: "table", lang: "en-US" },
  { id: "word_chair", category: "word", display: "chair", hint: "[tʃɛr]", meaning: "椅子", speakText: "chair", lang: "en-US" },
  { id: "word_bed", category: "word", display: "bed", hint: "[bɛd]", meaning: "床", speakText: "bed", lang: "en-US" },
  { id: "word_ball", category: "word", display: "ball", hint: "[bɔl]", meaning: "球", speakText: "ball", lang: "en-US" },
  { id: "word_bike", category: "word", display: "bike", hint: "[baɪk]", meaning: "腳踏車", speakText: "bike", lang: "en-US" },
  { id: "word_car", category: "word", display: "car", hint: "[kɑr]", meaning: "車", speakText: "car", lang: "en-US" },
  { id: "word_bus", category: "word", display: "bus", hint: "[bʌs]", meaning: "公車", speakText: "bus", lang: "en-US" },
  { id: "word_train", category: "word", display: "train", hint: "[tren]", meaning: "火車", speakText: "train", lang: "en-US" },
  { id: "word_water", category: "word", display: "water", hint: "[ˋwɔtɚ]", meaning: "水", speakText: "water", lang: "en-US" },
  { id: "word_milk", category: "word", display: "milk", hint: "[mɪlk]", meaning: "牛奶", speakText: "milk", lang: "en-US" },
  { id: "word_juice", category: "word", display: "juice", hint: "[dʒus]", meaning: "果汁", speakText: "juice", lang: "en-US" },
  { id: "word_rice", category: "word", display: "rice", hint: "[raɪs]", meaning: "飯", speakText: "rice", lang: "en-US" },
  { id: "word_bread", category: "word", display: "bread", hint: "[brɛd]", meaning: "麵包", speakText: "bread", lang: "en-US" },
  { id: "word_egg", category: "word", display: "egg", hint: "[ɛg]", meaning: "蛋", speakText: "egg", lang: "en-US" },
  { id: "word_fish", category: "word", display: "fish", hint: "[fɪʃ]", meaning: "魚", speakText: "fish", lang: "en-US" },
  { id: "word_chicken", category: "word", display: "chicken", hint: "[ˋtʃɪkən]", meaning: "雞肉 / 小雞", speakText: "chicken", lang: "en-US" },
  { id: "word_banana", category: "word", display: "banana", hint: "[bəˋnænə]", meaning: "香蕉", speakText: "banana", lang: "en-US" },
  { id: "word_orange", category: "word", display: "orange", hint: "[ˋɔrɪndʒ]", meaning: "橘子", speakText: "orange", lang: "en-US" },
  { id: "word_cake", category: "word", display: "cake", hint: "[kek]", meaning: "蛋糕", speakText: "cake", lang: "en-US" },
  { id: "word_happy", category: "word", display: "happy", hint: "[ˋhæpɪ]", meaning: "快樂", speakText: "happy", lang: "en-US" },
  { id: "word_sad", category: "word", display: "sad", hint: "[sæd]", meaning: "難過", speakText: "sad", lang: "en-US" },
  { id: "word_big", category: "word", display: "big", hint: "[bɪg]", meaning: "大的", speakText: "big", lang: "en-US" },
  { id: "word_small", category: "word", display: "small", hint: "[smɔl]", meaning: "小的", speakText: "small", lang: "en-US" },
  { id: "word_tall", category: "word", display: "tall", hint: "[tɔl]", meaning: "高的", speakText: "tall", lang: "en-US" },
  { id: "word_short", category: "word", display: "short", hint: "[ʃɔrt]", meaning: "短的 / 矮的", speakText: "short", lang: "en-US" },
  { id: "word_long", category: "word", display: "long", hint: "[lɔŋ]", meaning: "長的", speakText: "long", lang: "en-US" },
  { id: "word_fast", category: "word", display: "fast", hint: "[fæst]", meaning: "快的", speakText: "fast", lang: "en-US" },
  { id: "word_slow", category: "word", display: "slow", hint: "[slo]", meaning: "慢的", speakText: "slow", lang: "en-US" },
  { id: "word_hot", category: "word", display: "hot", hint: "[hɑt]", meaning: "熱的", speakText: "hot", lang: "en-US" },
  { id: "word_cold", category: "word", display: "cold", hint: "[kold]", meaning: "冷的", speakText: "cold", lang: "en-US" },
  { id: "word_red", category: "word", display: "red", hint: "[rɛd]", meaning: "紅色", speakText: "red", lang: "en-US" },
  { id: "word_blue", category: "word", display: "blue", hint: "[blu]", meaning: "藍色", speakText: "blue", lang: "en-US" },
  { id: "word_green", category: "word", display: "green", hint: "[grin]", meaning: "綠色", speakText: "green", lang: "en-US" },
  { id: "word_yellow", category: "word", display: "yellow", hint: "[ˋjɛlo]", meaning: "黃色", speakText: "yellow", lang: "en-US" },
  { id: "word_black", category: "word", display: "black", hint: "[blæk]", meaning: "黑色", speakText: "black", lang: "en-US" },
  { id: "word_white", category: "word", display: "white", hint: "[hwaɪt]", meaning: "白色", speakText: "white", lang: "en-US" },
  { id: "word_one", category: "word", display: "one", hint: "[wʌn]", meaning: "一", speakText: "one", lang: "en-US" },
  { id: "word_two", category: "word", display: "two", hint: "[tu]", meaning: "二", speakText: "two", lang: "en-US" },
  { id: "word_three", category: "word", display: "three", hint: "[θri]", meaning: "三", speakText: "three", lang: "en-US" },
  { id: "word_four", category: "word", display: "four", hint: "[fɔr]", meaning: "四", speakText: "four", lang: "en-US" },
  { id: "word_five", category: "word", display: "five", hint: "[faɪv]", meaning: "五", speakText: "five", lang: "en-US" },
  { id: "word_six", category: "word", display: "six", hint: "[sɪks]", meaning: "六", speakText: "six", lang: "en-US" },
  { id: "word_seven", category: "word", display: "seven", hint: "[ˋsɛvən]", meaning: "七", speakText: "seven", lang: "en-US" },
  { id: "word_eight", category: "word", display: "eight", hint: "[et]", meaning: "八", speakText: "eight", lang: "en-US" },
  { id: "word_nine", category: "word", display: "nine", hint: "[naɪn]", meaning: "九", speakText: "nine", lang: "en-US" },
  { id: "word_ten", category: "word", display: "ten", hint: "[tɛn]", meaning: "十", speakText: "ten", lang: "en-US" },
  { id: "word_run", category: "word", display: "run", hint: "[rʌn]", meaning: "跑", speakText: "run", lang: "en-US" },
  { id: "word_jump", category: "word", display: "jump", hint: "[dʒʌmp]", meaning: "跳", speakText: "jump", lang: "en-US" },
  { id: "word_walk", category: "word", display: "walk", hint: "[wɔk]", meaning: "走路", speakText: "walk", lang: "en-US" },
  { id: "word_read", category: "word", display: "read", hint: "[rid]", meaning: "讀", speakText: "read", lang: "en-US" },
  { id: "word_write", category: "word", display: "write", hint: "[raɪt]", meaning: "寫", speakText: "write", lang: "en-US" },
  { id: "word_look", category: "word", display: "look", hint: "[lʊk]", meaning: "看", speakText: "look", lang: "en-US" },
  { id: "word_listen", category: "word", display: "listen", hint: "[ˋlɪsən]", meaning: "聽", speakText: "listen", lang: "en-US" },
  { id: "word_sing", category: "word", display: "sing", hint: "[sɪŋ]", meaning: "唱", speakText: "sing", lang: "en-US" },
  { id: "word_play", category: "word", display: "play", hint: "[ple]", meaning: "玩", speakText: "play", lang: "en-US" },
  { id: "word_eat", category: "word", display: "eat", hint: "[it]", meaning: "吃", speakText: "eat", lang: "en-US" },
  { id: "word_drink", category: "word", display: "drink", hint: "[drɪŋk]", meaning: "喝", speakText: "drink", lang: "en-US" },
  { id: "word_sleep", category: "word", display: "sleep", hint: "[slip]", meaning: "睡覺", speakText: "sleep", lang: "en-US" },
  { id: "word_like", category: "word", display: "like", hint: "[laɪk]", meaning: "喜歡", speakText: "like", lang: "en-US" },
  { id: "word_go", category: "word", display: "go", hint: "[go]", meaning: "去", speakText: "go", lang: "en-US" },
  { id: "word_come", category: "word", display: "come", hint: "[kʌm]", meaning: "來", speakText: "come", lang: "en-US" },
  { id: "word_sun", category: "word", display: "sun", hint: "[sʌn]", meaning: "太陽", speakText: "sun", lang: "en-US" },
  { id: "word_moon", category: "word", display: "moon", hint: "[mun]", meaning: "月亮", speakText: "moon", lang: "en-US" },
  { id: "word_star", category: "word", display: "star", hint: "[stɑr]", meaning: "星星", speakText: "star", lang: "en-US" },
  { id: "word_rain", category: "word", display: "rain", hint: "[ren]", meaning: "雨", speakText: "rain", lang: "en-US" },
  { id: "word_tree", category: "word", display: "tree", hint: "[tri]", meaning: "樹", speakText: "tree", lang: "en-US" },
  { id: "word_flower", category: "word", display: "flower", hint: "[ˋflaʊɚ]", meaning: "花", speakText: "flower", lang: "en-US" },
  { id: "word_bird", category: "word", display: "bird", hint: "[bɝd]", meaning: "鳥", speakText: "bird", lang: "en-US" },
  { id: "word_duck", category: "word", display: "duck", hint: "[dʌk]", meaning: "鴨子", speakText: "duck", lang: "en-US" },
  { id: "word_patrick", category: "word", display: "Patrick", hint: "[ˋpætrɪk]", meaning: "派翠克 / 人名", speakText: "Patrick", lang: "en-US" },
  { id: "word_name", category: "word", display: "name", hint: "[nem]", meaning: "名字", speakText: "name", lang: "en-US" },
  { id: "word_hello", category: "word", display: "hello", hint: "[həˋlo]", meaning: "你好", speakText: "hello", lang: "en-US" },
  { id: "word_goodbye", category: "word", display: "goodbye", hint: "[ˌgʊdˋbaɪ]", meaning: "再見", speakText: "goodbye", lang: "en-US" },
  { id: "word_thank", category: "word", display: "thank", hint: "[θæŋk]", meaning: "感謝", speakText: "thank", lang: "en-US" },
  { id: "word_please", category: "word", display: "please", hint: "[pliz]", meaning: "請", speakText: "please", lang: "en-US" },
  { id: "word_yes", category: "word", display: "yes", hint: "[jɛs]", meaning: "是 / 好", speakText: "yes", lang: "en-US" },
  { id: "word_no", category: "word", display: "no", hint: "[no]", meaning: "不 / 沒有", speakText: "no", lang: "en-US" },
  { id: "word_today", category: "word", display: "today", hint: "[təˋde]", meaning: "今天", speakText: "today", lang: "en-US" },
  { id: "word_tomorrow", category: "word", display: "tomorrow", hint: "[təˋmɔro]", meaning: "明天", speakText: "tomorrow", lang: "en-US" },
  { id: "word_yesterday", category: "word", display: "yesterday", hint: "[ˋjɛstɚde]", meaning: "昨天", speakText: "yesterday", lang: "en-US" },
  { id: "word_morning", category: "word", display: "morning", hint: "[ˋmɔrnɪŋ]", meaning: "早上", speakText: "morning", lang: "en-US" },
  { id: "word_night", category: "word", display: "night", hint: "[naɪt]", meaning: "晚上 / 夜晚", speakText: "night", lang: "en-US" },
  { id: "word_day", category: "word", display: "day", hint: "[de]", meaning: "日 / 天", speakText: "day", lang: "en-US" },
  { id: "word_week", category: "word", display: "week", hint: "[wik]", meaning: "星期", speakText: "week", lang: "en-US" },
  { id: "word_year", category: "word", display: "year", hint: "[jɪr]", meaning: "年", speakText: "year", lang: "en-US" },
  { id: "word_time", category: "word", display: "time", hint: "[taɪm]", meaning: "時間", speakText: "time", lang: "en-US" },
  { id: "word_clock", category: "word", display: "clock", hint: "[klɑk]", meaning: "時鐘", speakText: "clock", lang: "en-US" },
  { id: "word_box", category: "word", display: "box", hint: "[bɑks]", meaning: "盒子", speakText: "box", lang: "en-US" },
  { id: "word_cup", category: "word", display: "cup", hint: "[kʌp]", meaning: "杯子", speakText: "cup", lang: "en-US" },
  { id: "word_spoon", category: "word", display: "spoon", hint: "[spun]", meaning: "湯匙", speakText: "spoon", lang: "en-US" },
  { id: "word_fork", category: "word", display: "fork", hint: "[fɔrk]", meaning: "叉子", speakText: "fork", lang: "en-US" },
  { id: "word_plate", category: "word", display: "plate", hint: "[plet]", meaning: "盤子", speakText: "plate", lang: "en-US" },
  { id: "word_shoe", category: "word", display: "shoe", hint: "[ʃu]", meaning: "鞋子", speakText: "shoe", lang: "en-US" },
  { id: "word_sock", category: "word", display: "sock", hint: "[sɑk]", meaning: "襪子", speakText: "sock", lang: "en-US" },
  { id: "word_hat", category: "word", display: "hat", hint: "[hæt]", meaning: "帽子", speakText: "hat", lang: "en-US" },
  { id: "word_coat", category: "word", display: "coat", hint: "[kot]", meaning: "外套", speakText: "coat", lang: "en-US" },
  { id: "word_shirt", category: "word", display: "shirt", hint: "[ʃɝt]", meaning: "襯衫", speakText: "shirt", lang: "en-US" },
  { id: "word_pants", category: "word", display: "pants", hint: "[pænts]", meaning: "褲子", speakText: "pants", lang: "en-US" },
  { id: "word_head", category: "word", display: "head", hint: "[hɛd]", meaning: "頭", speakText: "head", lang: "en-US" },
  { id: "word_eye", category: "word", display: "eye", hint: "[aɪ]", meaning: "眼睛", speakText: "eye", lang: "en-US" },
  { id: "word_ear", category: "word", display: "ear", hint: "[ɪr]", meaning: "耳朵", speakText: "ear", lang: "en-US" },
  { id: "word_nose", category: "word", display: "nose", hint: "[noz]", meaning: "鼻子", speakText: "nose", lang: "en-US" },
  { id: "word_mouth", category: "word", display: "mouth", hint: "[maʊθ]", meaning: "嘴巴", speakText: "mouth", lang: "en-US" },
  { id: "word_hand", category: "word", display: "hand", hint: "[hænd]", meaning: "手", speakText: "hand", lang: "en-US" },
  { id: "word_foot", category: "word", display: "foot", hint: "[fʊt]", meaning: "腳", speakText: "foot", lang: "en-US" },
  { id: "word_leg", category: "word", display: "leg", hint: "[lɛg]", meaning: "腿", speakText: "leg", lang: "en-US" },
  { id: "word_arm", category: "word", display: "arm", hint: "[ɑrm]", meaning: "手臂", speakText: "arm", lang: "en-US" },
  { id: "word_baby", category: "word", display: "baby", hint: "[ˋbebɪ]", meaning: "寶寶", speakText: "baby", lang: "en-US" },
  { id: "word_boy", category: "word", display: "boy", hint: "[bɔɪ]", meaning: "男孩", speakText: "boy", lang: "en-US" },
  { id: "word_girl", category: "word", display: "girl", hint: "[gɝl]", meaning: "女孩", speakText: "girl", lang: "en-US" },
  { id: "word_man", category: "word", display: "man", hint: "[mæn]", meaning: "男人", speakText: "man", lang: "en-US" },
  { id: "word_woman", category: "word", display: "woman", hint: "[ˋwʊmən]", meaning: "女人", speakText: "woman", lang: "en-US" },
  { id: "word_people", category: "word", display: "people", hint: "[ˋpipəl]", meaning: "人們", speakText: "people", lang: "en-US" },
  { id: "word_city", category: "word", display: "city", hint: "[ˋsɪtɪ]", meaning: "城市", speakText: "city", lang: "en-US" },
  { id: "word_park", category: "word", display: "park", hint: "[pɑrk]", meaning: "公園", speakText: "park", lang: "en-US" },
  { id: "word_zoo", category: "word", display: "zoo", hint: "[zu]", meaning: "動物園", speakText: "zoo", lang: "en-US" },
  { id: "word_store", category: "word", display: "store", hint: "[stɔr]", meaning: "商店", speakText: "store", lang: "en-US" },
  { id: "word_library", category: "word", display: "library", hint: "[ˋlaɪbrɛrɪ]", meaning: "圖書館", speakText: "library", lang: "en-US" },
  { id: "word_hospital", category: "word", display: "hospital", hint: "[ˋhɑspɪtəl]", meaning: "醫院", speakText: "hospital", lang: "en-US" },
  { id: "word_doctor", category: "word", display: "doctor", hint: "[ˋdɑktɚ]", meaning: "醫生", speakText: "doctor", lang: "en-US" },
  { id: "word_nurse", category: "word", display: "nurse", hint: "[nɝs]", meaning: "護士", speakText: "nurse", lang: "en-US" },
  { id: "word_police", category: "word", display: "police", hint: "[pəˋlis]", meaning: "警察", speakText: "police", lang: "en-US" },
  { id: "word_farmer", category: "word", display: "farmer", hint: "[ˋfɑrmɚ]", meaning: "農夫", speakText: "farmer", lang: "en-US" },
  { id: "word_cookie", category: "word", display: "cookie", hint: "[ˋkʊkɪ]", meaning: "餅乾", speakText: "cookie", lang: "en-US" },
  { id: "word_candy", category: "word", display: "candy", hint: "[ˋkændɪ]", meaning: "糖果", speakText: "candy", lang: "en-US" },
  { id: "word_pizza", category: "word", display: "pizza", hint: "[ˋpitsə]", meaning: "披薩", speakText: "pizza", lang: "en-US" },
  { id: "word_noodle", category: "word", display: "noodle", hint: "[ˋnudəl]", meaning: "麵條", speakText: "noodle", lang: "en-US" },
  { id: "word_soup", category: "word", display: "soup", hint: "[sup]", meaning: "湯", speakText: "soup", lang: "en-US" },];

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
  itemType: document.querySelector("#itemType"),
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
    section.className = "category-section";
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
        button.className = `card-row${lesson.id === current.id ? " is-active" : ""}`;
        button.type = "button";
        button.append(
          makeSpan(`card-symbol ${category}`, lesson.display),
          makeSpan("card-copy", lesson.hint || lesson.meaning || lesson.display)
        );
        button.addEventListener("click", () => {
          state.index = index;
          renderCurrent({ autoSpeak: true });
        });
        list.append(button);
      });
      section.append(list);
    }
    els.categoryList.append(section);
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

function formatHint(item) {
  if (item.category === "hanzi" && item.pinyin) return `${item.hint || item.display} · ${item.pinyin}`;
  return item.hint || item.display;
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

function renderCurrent(options = {}) {
  const item = currentItem();
  els.itemType.textContent = CATEGORY_LABELS[item.category];
  els.itemTitle.textContent = item.display;
  els.hintText.textContent = formatHint(item);
  els.meaningText.textContent = item.meaning || CATEGORY_LABELS[item.category];
  els.traceText.textContent = item.display;
  els.traceText.className = `trace-text ${item.category}`;
  renderSettings();
  renderBackupStatus();
  renderCategoryList();
  renderCustomList();
  clearCanvas();
  if (options.autoSpeak && state.settings.autoPlay) window.setTimeout(speakCurrent, 120);
}

function selectRelative(direction) {
  const items = lessonsFor();
  if (!items.length) return;
  state.index = (state.index + direction + items.length) % items.length;
  renderCurrent({ autoSpeak: true });
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

function speakWithTts(item) {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(item.speakText || item.display);
  utterance.lang = item.lang || (item.category === "word" || item.category === "letter" ? "en-US" : "zh-TW");
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
  navigator.serviceWorker.register("./sw.js").then(updateOnlineStatus).catch(() => {
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
