# PressPlay AI 智慧學習生態系 — Hackathon Demo（團隊 fish）

AWS Summit Taipei 2026 ×  PressPlay Academy 黑客松「百工百業瘋 AI」參賽作品。

**命題：** 從對話到多元應用 — 打造具備主動進化與多維賦能的 AI 智慧對話助教。

## 這是什麼
一個手機版 Web 互動原型（React + Vite + Tailwind），示範五大核心模組如何把「被動 AI 助教」升級為「主動、多維、跨場景」的學習引擎，並正面回應官方對「遊戲化能否帶動看課」的質疑。

## 五大模組
- **模組 A（主線）** AI 主動診斷與「下一步」引擎（雷達結算頁）
- **模組 B** 動態懸念剪輯與 45 秒軟著陸
- **模組 C** AI 記憶去重 + 熱門加乘推薦
- **模組 D** 多模態學習（影音 / 電子書 / Podcast）
- **模組 A 延伸** 知識精靈養成 + 學習戰隊（EXP 綁定看課）

## 本地執行
```bash
npm install
npm run dev      # 開發模式，開 http://localhost:5173/
npm run build    # 產生 dist/ 正式版
```

## 目錄
- `src/screens/` 八個畫面（對應五大模組 + 入口 + 成效儀表板）
- `src/components/` UI 元件與純 SVG 雷達圖
- `src/data.js` 展示資料（含實跑官方 Dataset 的可複現統計）
- `docs/` 計畫書（Markdown / Word）

## 資料說明
展示用的統計數字（如對話單次即離 39.6%、知識挑戰烘焙 22.5% 等）來自對官方 Dataset 的實際分析結果，屬**彙總統計**。
> ⚠️ 官方原始資料集（Dataset / 機密簡報）**不包含在本 repo**，請勿上傳。
