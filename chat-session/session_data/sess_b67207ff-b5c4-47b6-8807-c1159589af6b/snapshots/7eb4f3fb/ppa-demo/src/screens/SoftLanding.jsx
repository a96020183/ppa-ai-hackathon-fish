import React, { useEffect, useState } from 'react'
import { anchor } from '../data.js'
import { PhoneHeader, PrimaryButton, Chip } from '../components/ui.jsx'

// 模組 B：動態懸念剪輯與「45 秒軟著陸」
export default function SoftLanding({ go }) {
  const [t, setT] = useState(0)
  const [ended, setEnded] = useState(false)
  useEffect(() => {
    if (ended) return
    if (t >= anchor.clipLen) { setEnded(true); return }
    const id = setTimeout(() => setT((x) => x + 1), 60) // 加速播放示意
    return () => clearTimeout(id)
  }, [t, ended])

  const pct = Math.min(100, (t / anchor.clipLen) * 100)

  return (
    <div>
      <PhoneHeader title="AI 助教 · 主動攔截" />
      <div className="px-4 pb-6">
        <div className="mt-2 flex flex-wrap gap-2">
          <Chip color="orange">模組B · 動態懸念</Chip>
          <Chip>不撞付費牆</Chip>
        </div>

        <div className="mt-3 rounded-2xl bg-ppcard p-3 shadow-card">
          <div className="text-[13px] text-white/80">
            別氣餒！我從 <b className="text-white">{anchor.teacher}</b> 老師的
            《{anchor.courseTitle}》抓了一段 <b className="text-pporange">45 秒精華</b> 幫你補強 👇
          </div>

          {/* video mock */}
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
                <div className="mt-2 text-pporange font-bold pulse-ring rounded-full px-3 py-1 text-sm">…（懸念截斷）</div>
              </div>
            )}
          </div>

          {/* progress */}
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <div className="bar-fill h-full bg-pporange" style={{ width: pct + '%' }} />
          </div>
          <div className="mt-1 flex justify-between text-[11px] text-white/50">
            <span>{Math.min(anchor.clipLen, t)}s / {anchor.clipLen}s</span>
            <span>{ended ? '關鍵就在下一句…' : '播放中…'}</span>
          </div>
        </div>

        {ended && (
          <div className="mt-4 space-y-2">
            <PrimaryButton onClick={() => go('radar')}>看完整課程・解鎖完整解法</PrimaryButton>
            <button onClick={() => go('radar')} className="w-full rounded-xl border border-white/20 py-2.5 text-sm text-white/80">
              非會員？看完 45 秒後加入會員（＝擴大 AI 觸及池）
            </button>
          </div>
        )}
        {!ended && (
          <div className="mt-4 text-center text-[11px] text-white/40">45 秒後在最高潮處截斷，引發解鎖渴望</div>
        )}
      </div>
    </div>
  )
}
