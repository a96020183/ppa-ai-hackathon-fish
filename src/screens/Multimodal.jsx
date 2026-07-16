import React, { useState } from 'react'
import { PhoneHeader } from '../components/ui.jsx'

// 模組 D：多模態學習與權限分級
const MODES = [
  { key: 'video', label: '🎬 短影音', free: true },
  { key: 'text', label: '📖 全文本電子書', free: false },
  { key: 'podcast', label: '🎧 純聲 Podcast', free: false },
]

export default function Multimodal({ go }) {
  const [mode, setMode] = useState('video')
  const [member, setMember] = useState(false)

  return (
    <div>
      <PhoneHeader title="多模態學習 · 展開看更多" />
      <div className="px-4 pb-6">
        <div className="mt-1 flex items-center">
          <button onClick={() => setMember((m) => !m)} className="ml-auto rounded-full border border-white/20 px-2 py-0.5 text-[11px]">
            身分：{member ? '付費會員 ✅' : '免費用戶'}（點我切換）
          </button>
        </div>

        <div className="mt-3 rounded-2xl bg-ppcard p-3 shadow-card">
          <div className="text-sm font-bold">《職場溝通力：讓人挺你的說話術》</div>
          <div className="text-[11px] text-white/55">孫治華 · 第 2 章</div>

          <div className="mt-3 flex gap-2">
            {MODES.map((m) => (
              <button key={m.key} onClick={() => setMode(m.key)}
                className={`flex-1 rounded-xl border px-2 py-2 text-[12px] ${mode === m.key ? 'border-pporange bg-pporange/15 text-pporange' : 'border-white/15 text-white/70'}`}>
                {m.label}
              </button>
            ))}
          </div>

          <div className="mt-3 rounded-xl bg-black/25 p-3 text-[13px] leading-relaxed min-h-[150px]">
            {mode === 'video' && (
              <div>
                <div className="mb-2 aspect-video rounded-lg bg-gradient-to-br from-[#1c3767] to-[#0c1d3c] flex items-center justify-center text-2xl">▶</div>
                <div className="text-white/80">免費片段：本節重點的前 45 秒精華…</div>
              </div>
            )}
            {mode !== 'video' && !member && (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="text-3xl">🔒</div>
                <div className="mt-2 text-white/80">{mode === 'text' ? '全文本電子書' : '純聲 Podcast'} 為會員專屬</div>
                <button onClick={() => setMember(true)} className="mt-3 rounded-xl bg-pporange px-4 py-2 text-[13px] font-bold text-[#231600]">加入會員解鎖</button>
              </div>
            )}
            {mode === 'text' && member && (
              <div className="text-white/85">
                <p className="mb-2 font-bold">AI 轉換的全文本電子書：</p>
                <p>「溝通的第一步不是表達，而是<strong className="text-pporange">承接</strong>。當對方情緒上來時，先用一句『我理解你現在很在意這件事』穩住場面，再切入你的立場……」</p>
                <p className="mt-2 text-white/60">（AI 自動過濾口語冗詞、加上重點標記）</p>
              </div>
            )}
            {mode === 'podcast' && member && (
              <div className="flex flex-col items-center py-4">
                <div className="text-3xl">🎧</div>
                <div className="mt-2 w-full max-w-[220px]">
                  <div className="h-2 w-full rounded-full bg-white/15"><div className="h-full w-1/3 rounded-full bg-ppcyan" /></div>
                  <div className="mt-1 flex justify-between text-[11px] text-white/50"><span>03:12</span><span>09:40</span></div>
                </div>
                <div className="mt-2 text-white/75 text-center">AI 去冗言贅字的純聲版，通勤也能學</div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4"><button onClick={() => go('profile')} className="w-full rounded-xl border border-white/20 py-2.5 text-sm text-white/80">看我的個人主頁 →</button></div>
      </div>
    </div>
  )
}
