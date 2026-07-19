import React from 'react'
import { recommendations } from '../data.js'
import { PhoneHeader, PrimaryButton, Chip } from '../components/ui.jsx'

// 模組 C：AI 記憶去重與熱門加乘
export default function Recommend({ go }) {
  return (
    <div>
      <PhoneHeader title="AI 助教 · 智慧推薦" />
      <div className="px-4 pb-6">
        <div className="mt-1 flex flex-wrap gap-2">
          <Chip color="orange">模組C</Chip>
          <Chip>記憶去重</Chip>
          <Chip color="green">熱門加乘</Chip>
        </div>

        <div className="mt-3 space-y-3">
          {recommendations.map((r) => (
            <div key={r.id} className={`rounded-2xl p-3 shadow-card ${r.watched ? 'bg-white/5 opacity-60' : 'bg-ppcard'}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-bold leading-snug">{r.title}</div>
                  <div className="mt-1 text-[11px] text-white/55">{r.cat}｜近 7 天 {r.views7d} 次觀看</div>
                </div>
                <div className="shrink-0 space-y-1 text-right">
                  {r.hot && <Chip color="orange">🔥 熱門 ×1.5 EXP</Chip>}
                  {r.watched && <div className="text-[11px] text-white/50">已看 · 已去重</div>}
                </div>
              </div>
              {!r.watched ? (
                <div className="mt-2"><PrimaryButton onClick={() => go('multimodal')}>開始學習</PrimaryButton></div>
              ) : (
                <div className="mt-2 rounded-lg border border-white/10 bg-black/20 p-2 text-[11px] text-white/50">
                  你已觀看 &gt; 80%，AI 自動排除，改推未看過的優質內容 ✔
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-ppcyan/30 bg-ppcyan/10 p-3 text-[12px] text-ppcyan/90">
          <b>去重邏輯：</b>Bedrock RAG 撈最匹配 3 堂，於 DynamoDB 過濾掉已看 &gt;80% 的內容 ID，
          徹底解決 Beta 版「每次推薦都一樣」的敷衍感。
        </div>

        <div className="mt-3"><button onClick={() => go('pet')} className="w-full rounded-xl border border-white/20 py-2.5 text-sm text-white/80">看看學習如何餵養我的 PiPi →</button></div>
      </div>
    </div>
  )
}
