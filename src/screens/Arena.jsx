import React from 'react'
import { categories, categoryRadars, pet } from '../data.js'
import { PhoneHeader, PrimaryButton, Card, PetAvatar } from '../components/ui.jsx'

export default function Arena({ go }) {
  const ladder = [
    { win: 5, pt: 10 }, { win: 10, pt: 50 }, { win: 20, pt: 100 },
    { win: 30, pt: 150 }, { win: 40, pt: 200 }, { win: 50, pt: 300 },
  ]
  return (
    <div>
      <PhoneHeader title="知識PK擂台 🚀" />
      <div className="px-4 pb-6 space-y-3">
        {/* user + pet + profile entry */}
        <div className="flex items-center justify-between">
          <button onClick={() => go('profile')} className="flex items-center gap-2 text-left">
            <PetAvatar form={pet.primaryForm} size={38} />
            <div>
              <div className="text-sm font-bold">Ho Wa Chui <span className="ml-1 rounded bg-white/15 px-1 text-[10px]">Lv.{pet.level}</span></div>
              <div className="text-[11px] text-white/60">點我看個人主頁 ›</div>
            </div>
          </button>
          <button onClick={() => go('pet')} className="flex items-center gap-1 rounded-xl bg-ppcyan/15 px-2 py-1 text-[11px] text-ppcyan">
            🐣 我的 {pet.name}
          </button>
        </div>

        {/* 大榜：個人挑戰 ladder（多題連勝） */}
        <Card className="p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-bold">個人挑戰（連勝衝榜）</span>
            <button onClick={() => go('leaderboard')} className="text-pporange">看排行榜 ›</button>
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

        {/* 六大分類：跟人 PK，各自累積分類雷達 */}
        <div className="px-1 text-[12px] font-bold text-white/70">分類對戰（跟人 PK · 各自累積雷達）</div>
        {categories.map((c) => {
          const r = categoryRadars[c.key]
          const unlocked = r.played >= r.unlockAt
          return (
            <button key={c.key} onClick={() => go(unlocked ? 'radar' : 'quiz')} className="w-full text-left">
              <Card tone={c.tone} className="flex items-center justify-between p-3">
                <div>
                  <div className="text-sm font-bold">{c.name} {c.icon}</div>
                  <div className="text-[11px] opacity-70">
                    {unlocked
                      ? `雷達已解鎖 · 總分 ${r.total}`
                      : `再玩 ${r.unlockAt - r.played} 場解鎖雷達（${r.played}/${r.unlockAt}）`}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] opacity-60">入場費 {c.fee} 🪙</div>
                  <div className="text-[11px] font-bold">{unlocked ? '🔓 看雷達' : '🔒'}</div>
                </div>
              </Card>
            </button>
          )
        })}

        <div className="pt-1 text-center text-[11px] text-white/40">
          分類玩滿 5 場 → 解鎖該分類 AI 實力雷達；雷達總分決定 PiPi 外型
        </div>
      </div>
    </div>
  )
}
