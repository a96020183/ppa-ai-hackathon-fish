import React, { useEffect, useState } from 'react'
import { anchor } from '../data.js'
import { PhoneHeader, PrimaryButton, GhostButton } from '../components/ui.jsx'

// 模組 B：動態懸念剪輯與「45 秒軟著陸」（內容農場式前導鉤子 + 兩個出口）
export default function SoftLanding({ go }) {
  const [started, setStarted] = useState(false)
  const [t, setT] = useState(0)
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    if (!started || ended) return
    if (t >= anchor.clipLen) { setEnded(true); return }
    const id = setTimeout(() => setT((x) => x + 1), 60) // 加速播放示意
    return () => clearTimeout(id)
  }, [started, t, ended])

  const pct = Math.min(100, (t / anchor.clipLen) * 100)

  return (
    <div>
      <PhoneHeader title="AI 助教 · 主動攔截" />
      <div className="px-4 pb-6">
        {/* 內容農場式前導鉤子（引發疑問 → 想看短精華） */}
        {!started && (
          <div className="mt-3 rounded-2xl bg-gradient-to-br from-[#2a1c3f] to-[#0e2143] p-4 shadow-card">
            <div className="text-[10px] font-bold text-pporange">🔥 AI 幫你精選 · 45 秒看懂</div>
            <div className="mt-2 text-[18px] font-black leading-snug text-white">
              {anchor.clickbaitTitle}
            </div>
            <div className="mt-2 text-[13px] leading-relaxed text-white/70">
              {anchor.clickbaitSub}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-white/50">
              <span className="rounded bg-white/10 px-2 py-0.5">👀 12,847 人已看</span>
              <span className="rounded bg-white/10 px-2 py-0.5">⏱️ 只要 45 秒</span>
            </div>
            <div className="mt-4"><PrimaryButton onClick={() => setStarted(true)}>▶ 我要看老師怎麼破解</PrimaryButton></div>
            <div className="mt-2 text-center text-[10px] text-white/40">{anchor.paidNote}</div>
          </div>
        )}

        {/* 播放中 / 結束 */}
        {started && (
          <div className="mt-3 rounded-2xl bg-ppcard p-3 shadow-card">
            <div className="text-[13px] text-white/80">
              擷取自 <b className="text-white">{anchor.teacher}</b> 老師的
              《{anchor.courseTitle}》 <b className="text-pporange">45 秒精華</b> 👇
            </div>

            <div className="relative mt-3 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-[#1c3767] to-[#0c1d3c]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-2xl">▶</div>
              </div>
              <div className="absolute left-3 top-3 rounded bg-black/40 px-2 py-0.5 text-[11px]">
                {anchor.clipStart} · 免費精華錨點
              </div>
              {ended && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 text-center">
                  <div className="text-sm text-white/90">「{anchor.hook}」</div>
                  <div className="mt-2 rounded-full bg-pporange/90 px-3 py-1 text-sm font-bold text-[#231600] pulse-ring">…（懸念截斷）</div>
                </div>
              )}
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <div className="bar-fill h-full bg-pporange" style={{ width: pct + '%' }} />
            </div>
            <div className="mt-1 flex justify-between text-[11px] text-white/50">
              <span>{Math.min(anchor.clipLen, t)}s / {anchor.clipLen}s</span>
              <span>{ended ? '關鍵就在完整課程裡…' : '播放中…'}</span>
            </div>
          </div>
        )}

        {/* 結束後兩個出口按鈕 */}
        {ended && (
          <div className="mt-4 space-y-2">
            <PrimaryButton onClick={() => go('recommend')}>看完整課程・解鎖完整解法</PrimaryButton>
            <GhostButton onClick={() => go('radar')}>先看我的 AI 實力雷達圖 →</GhostButton>
            <div className="text-center text-[10px] text-white/40">非會員看完 45 秒可加入會員，解鎖完整課程</div>
          </div>
        )}
      </div>
    </div>
  )
}
