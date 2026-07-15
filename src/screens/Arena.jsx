import React from 'react'
import { categories, pet } from '../data.js'
import { PhoneHeader, PrimaryButton, Card, Chip } from '../components/ui.jsx'

export default function Arena({ go }) {
  const ladder = [
    { win: 5, pt: 10 }, { win: 10, pt: 50 }, { win: 20, pt: 100 },
    { win: 30, pt: 150 }, { win: 40, pt: 200 }, { win: 50, pt: 300 },
  ]
  return (
    <div>
      <PhoneHeader title="知識PK擂台 🚀" />
      <div className="px-4 pb-6 space-y-3">
        {/* user + pet entry */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-ppcyan to-pporange" />
            <div>
              <div className="text-sm font-bold">Ho Wa Chui <span className="ml-1 rounded bg-white/15 px-1 text-[10px]">Lv.5</span></div>
              <div className="text-[11px] text-white/60">勝場數 3｜勝率 100%</div>
            </div>
          </div>
          <button onClick={() => go('pet')} className="flex items-center gap-1 rounded-xl bg-ppcyan/15 px-2 py-1 text-[11px] text-ppcyan">
            🐣 我的 {pet.name}
          </button>
        </div>

        {/* 個人挑戰 ladder */}
        <Card className="p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-bold">個人挑戰</span>
            <span className="text-white/60">本月最高紀錄：2 階</span>
          </div>
          <div className="flex items-center justify-between">
            {ladder.map((l, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${i < 2 ? 'bg-pporange text-[#231600]' : 'bg-white/10 text-white/60'}`}>P</div>
                <div className="mt-1 text-[8px] text-white/50">{l.win}連勝</div>
                <div className="text-[8px] text-pporange">{l.pt}點</div>
              </div>
            ))}
          </div>
          <div className="mt-3"><PrimaryButton onClick={() => go('quiz')}>免費挑戰</PrimaryButton></div>
        </Card>

        {/* 六大分類 */}
        {categories.map((c) => (
          <button key={c.key} onClick={() => go('quiz')} className="w-full text-left">
            <Card tone={c.tone} className="flex items-center justify-between p-3">
              <div>
                <div className="text-sm font-bold">{c.name}</div>
                <div className="text-[11px] opacity-70">入場費 {c.fee} 🪙</div>
              </div>
              <div className="text-2xl">{c.icon}</div>
            </Card>
          </button>
        ))}

        <div className="pt-1 text-center text-[11px] text-white/40">
          點任一分類即可體驗完整 AI 助教流程
        </div>
      </div>
    </div>
  )
}
