import React from 'react'
import { radarSample } from '../data.js'
import { PhoneHeader, PrimaryButton, Chip } from '../components/ui.jsx'
import RadarChart from '../components/RadarChart.jsx'

// 模組 A（主線）：AI 主動診斷與「下一步」引擎
export default function RadarResult({ go }) {
  const s = radarSample
  return (
    <div>
      <PhoneHeader title={s.title} />
      <div className="px-4 pb-6">
        <div className="mt-1 flex flex-wrap gap-2">
          <Chip color="orange">模組A · 主動進化</Chip>
          <Chip color="green">主線</Chip>
        </div>

        {/* badge */}
        <div className="mt-3 flex flex-col items-center">
          <div className="animate-floaty text-5xl">🏅</div>
          <div className="mt-1 text-lg font-extrabold text-pporange">恭喜獲得：{s.badge}</div>
          <div className="text-[12px] text-ppcyan">你擊敗了 {s.beatPct}% 的挑戰者！</div>
        </div>

        {/* radar */}
        <div className="mt-2 flex justify-center">
          <RadarChart dims={s.dims} weakest={s.weakest} />
        </div>

        {/* AI 主動診斷對話框 */}
        <div className="mt-2 rounded-2xl bg-gradient-to-br from-[#153163] to-[#0e2143] p-3 shadow-card">
          <div className="flex items-center gap-2 text-[12px] font-bold text-ppcyan">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ppcyan/20">✦</span> AI 助教主動診斷
          </div>
          <div className="mt-2 text-[13px] leading-relaxed text-white/90">
            你的『<b className="text-pporange">{s.weakest}</b>』分數偏低喔！我已經幫你從 {s.teacher} 老師的課程中，
            抓出一段 <b>45 秒精華錨點</b>。要不要現在補強，然後我幫你排下一步？
          </div>
        </div>

        {/* 下一步（主動進化的核心） */}
        <div className="mt-3 rounded-2xl bg-ppcard p-3">
          <div className="text-[12px] font-bold text-white/80">AI 為你排好的「下一步」</div>
          <div className="mt-2 space-y-2 text-[13px]">
            <div className="flex items-center gap-2"><span className="text-ppcyan">1.</span> 看 45 秒《職場溝通》精華補強</div>
            <div className="flex items-center gap-2"><span className="text-ppcyan">2.</span> 加碼《高效表達》第 2 章（同儕熱看）</div>
            <div className="flex items-center gap-2"><span className="text-ppcyan">3.</span> 完成後 PiPi 獲得 +40 溝通經驗值</div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <PrimaryButton onClick={() => go('recommend')}>立即觀看免費 AI 補強短影</PrimaryButton>
          <button onClick={() => go('recommend')} className="w-full rounded-xl border border-white/20 py-2.5 text-sm text-white/80">查看 AI 推薦清單</button>
        </div>

        <div className="mt-3 rounded-xl border border-pporange/30 bg-pporange/10 p-2 text-[11px] text-pporange/90">
          解決斷點：資料顯示 39.6% 對話「問一次就走」。這裡 AI 主動接住，不讓對話冷掉。
        </div>
      </div>
    </div>
  )
}
