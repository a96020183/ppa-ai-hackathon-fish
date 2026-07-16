import React from 'react'
import { categories, categoryRadars, pet } from '../data.js'
import { PhoneHeader, PrimaryButton, Card, PetAvatar, Coin } from '../components/ui.jsx'

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

        {/* 大榜：個人挑戰 ladder（單人連勝 · 總題庫） */}
        <Card className="p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-bold">個人挑戰 · 單人連勝</span>
            <button onClick={() => go('leaderboard')} className="text-pporange">看排行榜 ›</button>
          </div>
          <div className="mb-2 text-[11px] text-white/55">題目來自「總題庫」跨分類混合，連勝越多、獎勵越高</div>
          <div className="flex items-center justify-between">
            {ladder.map((l, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${i < 2 ? 'bg-pporange text-[#231600]' : 'bg-white/10 text-white/60'}`}>P</div>
                <div className="mt-1 text-[8px] text-white/50">{l.win}連勝</div>
                <div className="text-[8px] text-pporange">{l.pt}點</div>
              </div>
            ))}
          </div>
          <div className="mt-3"><PrimaryButton onClick={() => go('quiz', 'solo')}>免費挑戰（單人連勝）</PrimaryButton></div>
        </Card>

        {/* 六大分類：跟人 PK，各自累積分類雷達 */}
        <div className="px-1 text-[12px] font-bold text-white/70">分類對戰（跟人 PK · 各自累積雷達）</div>
        {categories.map((c) => {
          const r = categoryRadars[c.key]
          const unlocked = r.played >= r.unlockAt
          return (
            <Card key={c.key} tone={c.tone} className="p-3">
              <div className="flex items-center justify-between gap-2">
                {/* 點主區 = 開始 PK 對戰 */}
                <button onClick={() => go('quiz', 'pk')} className="flex-1 text-left">
                  <div className="text-sm font-bold">{c.name} {c.icon}</div>
                  <div className="flex items-center gap-1 text-[11px] opacity-70">
                    開始 PK 對戰 · 入場費 {c.fee} <Coin size={12} />
                  </div>
                </button>
                {/* 看雷達 = 獨立按鈕（解鎖後才出現） */}
                <div className="shrink-0 text-right">
                  {unlocked ? (
                    <button
                      onClick={() => go('radar')}
                      className="rounded-lg bg-black/10 px-2 py-1 text-[11px] font-bold hover:bg-black/20"
                    >
                      🔓 看雷達 · {r.total}
                    </button>
                  ) : (
                    <div className="text-[11px] opacity-70">🔒 再玩 {r.unlockAt - r.played} 場<br/>解鎖雷達</div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}

      </div>
    </div>
  )
}
