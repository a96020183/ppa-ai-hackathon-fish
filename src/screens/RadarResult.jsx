import React from 'react'
import { radarSample, categoryRadars } from '../data.js'
import { PhoneHeader, PrimaryButton, GhostButton, Chip } from '../components/ui.jsx'
import RadarChart from '../components/RadarChart.jsx'

// 模組 A（主線）：AI 主動診斷與「下一步」引擎 —— 雷達圖「依分類」，玩滿 5 場解鎖
export default function RadarResult({ go }) {
  const cat = categoryRadars[radarSample.categoryKey]
  const unlocked = cat.played >= cat.unlockAt

  return (
    <div>
      <PhoneHeader title={radarSample.title} />
      <div className="px-4 pb-6">
        <div className="mt-1 flex flex-wrap gap-2">
          <Chip color="orange">模組A · 主動進化</Chip>
          <Chip color="green">主線</Chip>
          <Chip color="gray">{cat.icon} {cat.name}</Chip>
        </div>

        {!unlocked ? (
          // 未解鎖：玩滿 5 場才顯示雷達（資料才夠）
          <div className="mt-6 flex flex-col items-center rounded-2xl bg-ppcard p-6 text-center shadow-card">
            <div className="text-5xl">🔒</div>
            <div className="mt-3 text-sm font-bold">「{cat.name}」雷達尚未解鎖</div>
            <div className="mt-1 text-[12px] text-white/60">
              PK 對戰資料太少無法精準診斷。<br />再玩 <b className="text-pporange">{cat.unlockAt - cat.played}</b> 場「{cat.name}」挑戰即可解鎖你的實力雷達。
            </div>
            <div className="mt-3 w-full max-w-[220px]">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
                <div className="h-full bg-pporange" style={{ width: (cat.played / cat.unlockAt) * 100 + '%' }} />
              </div>
              <div className="mt-1 text-[11px] text-white/50">{cat.played} / {cat.unlockAt} 場</div>
            </div>
            <div className="mt-4 w-full"><PrimaryButton onClick={() => go('quiz')}>繼續挑戰</PrimaryButton></div>
          </div>
        ) : (
          <>
            {/* badge */}
            <div className="mt-3 flex flex-col items-center">
              <div className="animate-floaty text-5xl">🏅</div>
              <div className="mt-1 text-lg font-extrabold text-pporange">{radarSample.badge}</div>
              <div className="text-[12px] text-ppcyan">你的「{cat.name}」擊敗了 {radarSample.beatPct}% 的挑戰者！</div>
            </div>

            {/* radar */}
            <div className="mt-2 flex justify-center">
              <RadarChart dims={cat.dims} weakest={cat.weakest} />
            </div>
            <div className="text-center text-[11px] text-white/50">分類雷達總分 <b className="text-white">{cat.total}</b>（累積 {cat.played} 場，決定你的精靈外型）</div>

            {/* AI 主動診斷對話框 */}
            <div className="mt-2 rounded-2xl bg-gradient-to-br from-[#153163] to-[#0e2143] p-3 shadow-card">
              <div className="flex items-center gap-2 text-[12px] font-bold text-ppcyan">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ppcyan/20">✦</span> AI 助教主動診斷
              </div>
              <div className="mt-2 text-[13px] leading-relaxed text-white/90">
                你的『<b className="text-pporange">{cat.weakest}</b>』是這個分類最弱的一環！我從 {cat.teacher} 老師的課程抓了一段
                <b> 45 秒精華錨點</b>。要不要補強，然後我幫你排下一步？
              </div>
            </div>

            {/* 下一步 */}
            <div className="mt-3 rounded-2xl bg-ppcard p-3">
              <div className="text-[12px] font-bold text-white/80">AI 為你排好的「下一步」</div>
              <div className="mt-2 space-y-2 text-[13px]">
                <div className="flex items-center gap-2"><span className="text-ppcyan">1.</span> 看 45 秒《{cat.weakest}》精華補強</div>
                <div className="flex items-center gap-2"><span className="text-ppcyan">2.</span> 加碼同分類熱看課程（同儕熱看）</div>
                <div className="flex items-center gap-2"><span className="text-ppcyan">3.</span> 完成後 PiPi 獲得 +40 {cat.name} 經驗值</div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <PrimaryButton onClick={() => go('recommend')}>立即觀看免費 AI 補強短影</PrimaryButton>
              <GhostButton onClick={() => go('profile')}>看我的個人主頁（全分類雷達）→</GhostButton>
            </div>

            <div className="mt-3 rounded-xl border border-pporange/30 bg-pporange/10 p-2 text-[11px] text-pporange/90">
              解決斷點：39.6% 對話「問一次就走」。這裡 AI 主動接住，不讓對話冷掉。
            </div>
          </>
        )}
      </div>
    </div>
  )
}
