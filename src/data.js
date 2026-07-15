// 所有數字來自我們實跑官方 Dataset 的結果（可複現），或畫面示意用假資料。
// 寵物「PiPi 精靈」沿用 PPA 官方社群（IG）自稱的 PiPi 品牌人格，延伸成可養成的知識精靈。

// ── 六大分類（來自官方 UI 截圖）──
export const categories = [
  { key: 'invest', name: '投資理財', fee: 5, tone: 'warm', icon: '📈', outfit: 'suit' },
  { key: 'english', name: '英文學習', fee: 5, tone: 'cool', icon: '🔤', outfit: 'scholar' },
  { key: 'japanese', name: '日文領域', fee: 5, tone: 'warm', icon: '🈶', outfit: 'scholar' },
  { key: 'baking', name: '烘焙料理', fee: 5, tone: 'cool', icon: '🍳', outfit: 'chef' },
  { key: 'fitness', name: '健康健身', fee: 5, tone: 'warm', icon: '🚴', outfit: 'fitness' },
  { key: 'life', name: '生活品味', fee: 5, tone: 'cool', icon: '🍸', outfit: 'life' },
]

// ── 排行榜：日/週/月/總 四種榜（示範「總榜門檻高，日週月榜讓新人也能上榜」）──
// 每個榜的 top 是前三名（獎台），list 是 4~10 名，me 是「我」目前排名。
export const leaderboards = {
  daily: {
    label: '日榜',
    note: '每天 00:00 歸零 → 新玩家今天也能衝上榜！',
    me: { rank: 6, name: 'Ho Wa Chui', lv: 5, wins: 3, rate: 75 },
    top: [
      { rank: 2, name: 'CFL', lv: 154, wins: 12, rate: 92, tone: 'cool' },
      { rank: 1, name: 'Jujufufu', lv: 161, wins: 15, rate: 95, tone: 'warm' },
      { rank: 3, name: '瑪利歐', lv: 153, wins: 11, rate: 89, tone: 'pink' },
    ],
    list: [
      { rank: 4, name: 'yuki', lv: 152, wins: 9, rate: 96 },
      { rank: 5, name: 'Cody Chiu', lv: 149, wins: 5, rate: 98 },
    ],
  },
  weekly: {
    label: '週榜',
    note: '每週一歸零 → 一週努力就有機會擠進前段班',
    me: { rank: 23, name: 'Ho Wa Chui', lv: 5, wins: 21, rate: 78 },
    top: [
      { rank: 2, name: 'CFL', lv: 154, wins: 188, rate: 92, tone: 'cool' },
      { rank: 1, name: 'Jujufufu', lv: 161, wins: 205, rate: 95, tone: 'warm' },
      { rank: 3, name: '瑪利歐', lv: 153, wins: 176, rate: 89, tone: 'pink' },
    ],
    list: [
      { rank: 4, name: 'yuki', lv: 152, wins: 151, rate: 96 },
      { rank: 5, name: 'Cody Chiu', lv: 149, wins: 132, rate: 98 },
    ],
  },
  monthly: {
    label: '月榜',
    note: '每月歸零 → 中量級玩家也有舞台',
    me: { rank: 58, name: 'Ho Wa Chui', lv: 5, wins: 74, rate: 76 },
    top: [
      { rank: 2, name: 'CFL', lv: 154, wins: 921, rate: 92, tone: 'cool' },
      { rank: 1, name: 'Jujufufu', lv: 161, wins: 1051, rate: 95, tone: 'warm' },
      { rank: 3, name: '瑪利歐', lv: 153, wins: 864, rate: 89, tone: 'pink' },
    ],
    list: [
      { rank: 4, name: 'yuki', lv: 152, wins: 712, rate: 96 },
      { rank: 5, name: 'Cody Chiu', lv: 149, wins: 623, rate: 98 },
    ],
  },
  total: {
    label: '總榜',
    note: '⚠️ 老玩家累積上萬場 → 新人幾乎不可能上榜（這就是痛點）',
    me: { rank: '99+', name: 'Ho Wa Chui', lv: 5, wins: 3, rate: 75 },
    top: [
      { rank: 2, name: 'CFL', lv: 154, wins: 11388, rate: 92, tone: 'cool' },
      { rank: 1, name: 'Jujufufu', lv: 161, wins: 15751, rate: 95, tone: 'warm' },
      { rank: 3, name: '瑪利歐', lv: 153, wins: 11204, rate: 89, tone: 'pink' },
    ],
    list: [
      { rank: 4, name: 'yuki', lv: 152, wins: 9921, rate: 96 },
      { rank: 5, name: 'Cody Chiu', lv: 149, wins: 8132, rate: 98 },
      { rank: 6, name: 'lee47', lv: 141, wins: 6394, rate: 94 },
      { rank: 7, name: '呂璟延', lv: 140, wins: 5264, rate: 93 },
    ],
  },
}

// ── 分類雷達：雷達圖「跟著分類」，玩滿 5 場才解鎖 ──
// 每個分類雷達有 5 個子維度 + 一個總分（total）。總分最高的 2~3 個分類決定寵物外型。
export const categoryRadars = {
  invest: {
    name: '投資理財', icon: '📈', outfit: 'suit',
    played: 7, unlockAt: 5, total: 68,
    dims: [
      { label: '資產配置', value: 72 },
      { label: '風險控管', value: 58 },
      { label: '選股邏輯', value: 81 },
      { label: '總經判讀', value: 55 },
      { label: '心理紀律', value: 74 },
    ],
    weakest: '總經判讀', teacher: '陳重銘',
  },
  fitness: {
    name: '健康健身', icon: '🚴', outfit: 'fitness',
    played: 6, unlockAt: 5, total: 55,
    dims: [
      { label: '肌力訓練', value: 62 },
      { label: '有氧耐力', value: 48 },
      { label: '飲食營養', value: 40 },
      { label: '姿勢矯正', value: 66 },
      { label: '恢復睡眠', value: 59 },
    ],
    weakest: '飲食營養', teacher: '筋肉家族',
  },
  life: {
    name: '生活品味', icon: '🍸', outfit: 'life',
    played: 5, unlockAt: 5, total: 44,
    dims: [
      { label: '品酒', value: 38 },
      { label: '咖啡', value: 52 },
      { label: '攝影', value: 46 },
      { label: '穿搭', value: 41 },
      { label: '旅行', value: 43 },
    ],
    weakest: '品酒', teacher: '生活風格家',
  },
  baking: {
    name: '烘焙料理', icon: '🍳', outfit: 'chef',
    played: 2, unlockAt: 5, total: 0,
    dims: [
      { label: '麵團發酵', value: 0 },
      { label: '溫控', value: 0 },
      { label: '調味', value: 0 },
      { label: '擺盤', value: 0 },
      { label: '食材選擇', value: 0 },
    ],
    weakest: '', teacher: '烘焙老師',
  },
  english: {
    name: '英文學習', icon: '🔤', outfit: 'scholar',
    played: 0, unlockAt: 5, total: 0,
    dims: [
      { label: '單字量', value: 0 },
      { label: '聽力', value: 0 },
      { label: '口說', value: 0 },
      { label: '文法', value: 0 },
      { label: '閱讀', value: 0 },
    ],
    weakest: '', teacher: '英文老師',
  },
  japanese: {
    name: '日文領域', icon: '🈶', outfit: 'scholar',
    played: 0, unlockAt: 5, total: 0,
    dims: [
      { label: '五十音', value: 0 },
      { label: '單字', value: 0 },
      { label: '文法', value: 0 },
      { label: '聽解', value: 0 },
      { label: '會話', value: 0 },
    ],
    weakest: '', teacher: '日文老師',
  },
}

// 分類順序（給個人主頁的雷達總覽用）
export const radarOrder = ['invest', 'fitness', 'life', 'baking', 'english', 'japanese']

// ── AI 主動診斷用的「當前分類」雷達（沿用 invest 作示範）──
export const radarSample = {
  categoryKey: 'invest',
  title: '投資理財・實力雷達',
  badge: '投資紀律鐵人',
  beatPct: 88,
  played: 7, unlockAt: 5,
  get dims() { return categoryRadars.invest.dims },
  weakest: '總經判讀',
  teacher: '陳重銘',
}

// ── 45 秒軟著陸（模組 B）：內容農場式前導文字 + 懸念錨點 ──
export const anchor = {
  courseTitle: '存不了錢的陷阱｜從零開始的理財投資升級攻略',
  teacher: '陳重銘',
  clipStart: '03:10',
  clipLen: 45,
  // 內容農場式前導鉤子（引發疑問 → 想看短精華）
  clickbaitTitle: '90% 的人都在這一步把錢默默漏光…',
  clickbaitSub: '你以為是薪水太低？其實是這個「隱形消費習慣」在扯後腿。老師只用 45 秒就講破…',
  hook: '真正的關鍵，藏在你每天都做、卻從沒察覺的那件小事…',
  // 提醒：知識挑戰所有課程來源都要「另外購買」（即使已是訂閱會員）
  paidNote: '本題來源課程需單堂購買（訂閱會員亦需加購）',
}

// ── AI 助教推薦（模組 C：去重 + 熱門加乘）──
export const recommendations = [
  { id: 'C1', title: '3-1-0 存不了錢的陷阱', sub: '你也能成為千萬富翁｜理財投資升級攻略', cat: '投資理財', views7d: 1239, hot: true, watched: false, paid: true },
  { id: 'C2', title: '5-2 看懂格局：標準層平面圖、傢配圖', sub: '聰明買房的地產秘密課', cat: '投資理財', views7d: 95, hot: false, watched: false, paid: true },
  { id: 'C3', title: 'CH 2-1 產業', sub: '投資人必修選股全攻略｜白話波段淘金術', cat: '投資理財', views7d: 330, hot: false, watched: true, paid: true },
]

// ── 知識精靈 PiPi（模組 A 延伸）──
// 外型由「分類雷達總分」最高的 2~3 名決定；能力值由「已購課程時長」累積（1000 元＝1 點）。
export const petMeta = {
  species: 'PiPi 精靈',
  brandNote: '沿用 PPA 官方社群自稱的「PiPi」品牌人格',
  // 外型定義：key 對應 categoryRadars[*].outfit
  forms: {
    default: { emoji: '🥚', img: '/pets/pipi-default.png', label: '素顏 PiPi（新手）', desc: '尚未累積足夠分類實力' },
    suit: { emoji: '🤵', img: '/pets/pipi-suit.png', label: '西裝 PiPi', desc: '投資理財實力最高' },
    fitness: { emoji: '💪', img: '/pets/pipi-fitness.png', label: '健身 PiPi', desc: '健康健身實力突出' },
    chef: { emoji: '👨‍🍳', img: '/pets/pipi-chef.png', label: '主廚 PiPi', desc: '烘焙料理實力突出' },
    scholar: { emoji: '🤓', img: '/pets/pipi-scholar.png', label: '學者 PiPi', desc: '語言學習實力突出' },
    life: { emoji: '🎩', img: '/pets/pipi-life.png', label: '品味 PiPi', desc: '生活品味實力突出' },
  },
}

export const pet = {
  name: 'PiPi',
  level: 7,
  // 目前外型 = 分類雷達總分前二（invest 68 → suit、fitness 55 → fitness 元素）
  primaryForm: 'suit',
  secondaryForm: 'fitness',
  formLabel: '西裝健身 PiPi',
  formReason: '投資理財(68) + 健康健身(55) 兩項分類雷達總分最高',
  // 能力值：由已購課程時長累積（1000 元＝1 點）。純訂閱/免費課程不計入能力值（改導向戰隊）。
  abilities: [
    { cat: '投資理財', value: 63, spentNTD: 21000 },
    { cat: '健康健身', value: 40, spentNTD: 12000 },
    { cat: '烘焙料理', value: 18, spentNTD: 6000 },
    { cat: '語言學習', value: 9, spentNTD: 3000 },
  ],
  abilityRule: '能力值＝已購課程金額 ÷ 1000（訂閱/免費課程不計，改累積到戰隊貢獻）',
}

// ── 六角形徽章系統（放在寵物旁；玩家可選 3 個展示）──
// 把零散的小事件串成一個系統：上線時長、分類課程時長、大富翁、連勝…
export const badges = [
  { id: 'online', name: '在線時長', icon: '⏱️', level: 9, tier: 'gold', displayed: true, desc: '累積停留 PPA 的時間' },
  { id: 'social', name: '社交達人', icon: '👥', level: 12, tier: 'blue', displayed: true, desc: '戰隊互動、敲朋友次數' },
  { id: 'streak', name: '連勝王', icon: '🔥', level: 3, tier: 'gold', displayed: true, desc: '5 連勝 / 10 連勝里程碑' },
  { id: 'invest_course', name: '理財學徒', icon: '📈', level: 5, tier: 'silver', displayed: false, desc: '投資理財課程觀看時長' },
  { id: 'monopoly', name: '知識大富翁', icon: '🎲', level: 2, tier: 'bronze', displayed: false, desc: '大富翁活動格數' },
  { id: 'scholar', name: '學習達人', icon: '🎓', level: 4, tier: 'gold', displayed: false, desc: '完課數里程碑' },
  { id: 'checkin', name: '簽到鐵粉', icon: '📅', level: 0, tier: 'locked', displayed: false, desc: '連續每日簽到（未解鎖）' },
  { id: 'baking_course', name: '烘焙新手', icon: '🧁', level: 1, tier: 'bronze', displayed: false, desc: '烘焙料理課程時長' },
]

// ── 學習戰隊（顯示隊友寵物 + 敲一下提醒）──
export const squad = {
  name: 'KTV Lab 學習戰隊',
  quest: '本週共同任務：一起看完《高效溝通》3 個章節',
  questDone: 2,
  questTotal: 3,
  members: [
    { name: '你', form: 'suit', petName: 'PiPi', level: 7, progress: 80, isMe: true },
    { name: 'Alex', form: 'chef', petName: 'BaBa', level: 4, progress: 60 },
    { name: 'Wei', form: 'scholar', petName: 'WuWu', level: 6, progress: 100 },
    { name: '狗兒', form: 'fitness', petName: 'DoDo', level: 3, progress: 35 },
  ],
  pokeMsg: (from, to) => `已敲 ${to} 一下：「${from} 提醒你不要睡著，記得回來看課 👀」`,
}

// ── 官方 / 實跑數據（給 PPT / 說明用；成效儀表板已移出 Demo）──
export const insights = {
  singleTurnPct: 39.6,
  avgMsgs: 6.68,
  avgRounds: 3.4,
  learningPct: 13.2,
  wanderPct: 20.5,
  purchasePct: 2.5,
  categoryCount: 145,
}
export const official = {
  aiViewLift: 700, sessionLift: 84, activeDaysLift: 52,
  dauFrom: 29, dauTo: 10, aiPenetration: 11.7, gamePenetration: 42,
}
export const challengeDist = [
  { name: '烘焙料理', pct: 22.5 }, { name: '健康健身', pct: 16.9 },
  { name: '生活品味', pct: 16.3 }, { name: '投資理財', pct: 15.4 },
  { name: '職場技能', pct: 12.4 }, { name: '語言學習', pct: 12.2 },
  { name: '藝文娛樂', pct: 2.4 }, { name: '日文', pct: 1.9 },
]

// ── 模組導覽（給評審一步步走的順序；已移除成效儀表板）──
export const flow = [
  { id: 'arena', label: '① 知識 PK 擂台', hint: '入口 / 六大分類 / 精靈' },
  { id: 'leaderboard', label: '② 排行榜（日/週/月/總）', hint: '降低門檻讓新人也上榜' },
  { id: 'quiz', label: '③ 挑戰答題（PK）', hint: '倒數 · 對戰' },
  { id: 'softland', label: '④ 答錯 → 45秒軟著陸', hint: '模組B 內容農場鉤子' },
  { id: 'radar', label: '⑤ AI 主動診斷雷達', hint: '模組A 主線 · 依分類' },
  { id: 'recommend', label: '⑥ AI 助教推薦', hint: '模組C 去重+熱門加乘' },
  { id: 'profile', label: '⑦ 個人主頁', hint: '分類雷達總覽 + 精靈 + 徽章' },
  { id: 'pet', label: '⑧ 知識精靈 + 戰隊', hint: '模組A 養成/徽章/敲朋友' },
  { id: 'multimodal', label: '⑨ 多模態學習', hint: '模組D 電子書/Podcast' },
]
