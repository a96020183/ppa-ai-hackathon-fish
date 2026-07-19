// 所有數字來自我們實跑官方 Dataset 的結果（可複現），或畫面示意用假資料。

// 知識 PK 擂台的六大分類（來自官方 UI 截圖）
export const categories = [
  { key: 'invest', name: '投資理財', fee: 5, tone: 'warm', icon: '📈' },
  { key: 'english', name: '英文學習', fee: 5, tone: 'cool', icon: '🔤' },
  { key: 'japanese', name: '日文領域', fee: 5, tone: 'warm', icon: '🈶' },
  { key: 'baking', name: '烘焙料理', fee: 5, tone: 'cool', icon: '🍳' },
  { key: 'fitness', name: '健康健身', fee: 5, tone: 'warm', icon: '🚴' },
  { key: 'life', name: '生活品味', fee: 5, tone: 'cool', icon: '🍸' },
]

// 知識挑戰真實分類分布（實跑 47 位會員 / 9057 次挑戰）
export const challengeDist = [
  { name: '烘焙料理', pct: 22.5 },
  { name: '健康健身', pct: 16.9 },
  { name: '生活品味', pct: 16.3 },
  { name: '投資理財', pct: 15.4 },
  { name: '職場技能', pct: 12.4 },
  { name: '語言學習', pct: 12.2 },
  { name: '藝文娛樂', pct: 2.4 },
  { name: '日文', pct: 1.9 },
]

// 實跑資料集挖到的「斷點鐵證」
export const insights = {
  singleTurnPct: 39.6,      // % 對話用戶只問一次就走
  avgMsgs: 6.68,            // 平均每段對話訊息數
  avgRounds: 3.4,           // 約幾個來回
  learningPct: 13.2,        // 行為進入「學習中」
  wanderPct: 20.5,          // 停在「其他」漫遊
  purchasePct: 2.5,         // 購買轉換
  categoryCount: 145,       // 課程分類數（長尾）
}

// 官方數據
export const official = {
  aiViewLift: 700,          // 影片觀看次 +700%
  sessionLift: 84,
  activeDaysLift: 52,
  dauFrom: 29,
  dauTo: 10,                // <10%
  aiPenetration: 11.7,
  gamePenetration: 42,
}

// 範例挑戰：心理學挑戰結算（對應計畫書咒語）
export const radarSample = {
  title: '心理學挑戰結算',
  badge: '情緒勒索免疫大師',
  beatPct: 88,
  dims: [
    { label: '職場溝通', value: 42 },   // 偏低 → AI 診斷切入點
    { label: '戀愛心理', value: 78 },
    { label: '消費行為', value: 65 },
    { label: '自我覺察', value: 83 },
    { label: '情緒邊界', value: 71 },
  ],
  weakest: '職場溝通',
  teacher: '孫治華',
}

// 45 秒軟著陸的精華錨點（模組②）
export const anchor = {
  courseTitle: '職場溝通力：讓人挺你的說話術',
  teacher: '孫治華',
  clipStart: '12:05',
  clipLen: 45,
  hook: '90% 的人一開口就把天聊死——關鍵在這三秒的「開場承接」…',
}

// AI 助教推薦（模組③：去重 + 熱門加乘）
export const recommendations = [
  { id: 'C1', title: '科學化跑步訓練｜體能重整優化', cat: '健康健身', views7d: 1239, hot: true, watched: false },
  { id: 'C2', title: '陳重銘 X 吳淡如｜培養富腦袋的理財必修課', cat: '投資理財', views7d: 95, hot: false, watched: false },
  { id: 'C3', title: '躺平記多益單字：45天強迫取分', cat: '英文/證照', views7d: 330, hot: false, watched: true },  // 已看 → 被去重
]

// 知識精靈能力值（模組④：EXP 綁定看課 / 用 AI）
export const pet = {
  name: 'PiPi',
  level: 5,
  exp: 320,
  expNext: 500,
  form: '西裝 PiPi（投資理財傾向）',
  abilities: [
    { label: '投資理財', value: 63, max: 100 },
    { label: '烘焙料理', value: 40, max: 100 },
    { label: '健康健身', value: 55, max: 100 },
    { label: '語言學習', value: 30, max: 100 },
  ],
}

export const squad = {
  name: 'KTV Lab 學習戰隊',
  members: [
    { name: '你', pet: 'PiPi Lv.5', progress: 80 },
    { name: 'Alex', pet: '廚師 PP Lv.4', progress: 60 },
    { name: 'Wei', pet: '書蟲 PP Lv.6', progress: 100 },
  ],
  quest: '本週共同任務：一起看完《高效溝通》3 個章節',
  questDone: 2,
  questTotal: 3,
}

// 模組導覽（給評審一步步走的順序）
export const flow = [
  { id: 'arena', label: '① 知識 PK 擂台', hint: '入口 / 六大分類 / 精靈' },
  { id: 'quiz', label: '② 挑戰答題', hint: '倒數 · 二選一' },
  { id: 'softland', label: '③ 答錯 → 45秒軟著陸', hint: '模組B 動態懸念' },
  { id: 'radar', label: '④ AI 主動診斷雷達', hint: '模組A 主線 · 下一步' },
  { id: 'recommend', label: '⑤ AI 助教推薦', hint: '模組C 去重+熱門加乘' },
  { id: 'pet', label: '⑥ 知識精靈養成', hint: '模組A 養成+戰隊' },
  { id: 'multimodal', label: '⑦ 多模態學習', hint: '模組D 電子書/Podcast' },
  { id: 'metrics', label: '⑧ 成效衡量儀表板', hint: '斷點數據 + A/B' },
]
