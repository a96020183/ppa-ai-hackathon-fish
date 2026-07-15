import React, { useState } from 'react'
import { leaderboards } from '../data.js'
import { PhoneHeader, Card, Chip, PetAvatar } from '../components/ui.jsx'

const TABS = [
  { key: 'daily', label: '日榜' },
  { key: 'weekly', label: '週榜' },
  { key: 'monthly', label: '月榜' },
  { key: 'total', label: '總榜' },
]

// ② 排行榜：日/週/月/總 → 降低門檻，讓新玩家也能上榜
export default function Leaderboard({ go }) {
  const [tab, setTab] = useState('daily')
  const board = leaderboards[tab]
  const podiumOrder = [board.top.find(t => t.rank === 2), board.top.find(t => t.rank === 1), board.top.find(t => t.rank === 3)]
  const toneBg = { warm: 'bg-[#FBEED0] text-[#3a2c0d]', cool: 'bg-[#DCE7FB] text-[#17284a]', pink: 'bg-[#FBDCE7] text-[#4a1729]' }

  return (
    <div>
      <PhoneHeader title="排行榜 🏆" />
      <div className="px-4 pb-6">
        {/* tabs */}
        <div className="mt-1 flex gap-1 rounded-xl bg-white/5 p-1">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 rounded-lg py-1.5 text-[12px] font-semibold transition ${tab === t.key ? 'bg-pporange text-[#231600]' : 'text-white/60'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* 榜單說明 */}
        <div className={`mt-2 rounded-xl border p-2 text-[11px] ${tab === 'total' ? 'border-red-400/40 bg-red-500/10 text-red-200' : 'border-ppgreen/30 bg-ppgreen/10 text-ppgreen/90'}`}>
          {board.note}
        </div>

        {/* 獎台 top3 */}
        <div className="mt-3 flex items-end justify-center gap-2">
          {podiumOrder.map((p, i) => {
            const isFirst = p.rank === 1
            return (
              <div key={p.rank} className={`flex flex-1 flex-col items-center rounded-2xl p-2 ${toneBg[p.tone]} ${isFirst ? '-mt-3 pb-4' : ''}`}>
                <div className="relative">
                  <PetAvatar form={isFirst ? 'chef' : i === 0 ? 'suit' : 'scholar'} size={isFirst ? 52 : 42} />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-1.5 text-[9px] font-bold text-white">Lv.{p.lv}</span>
                </div>
                <div className={`mt-1.5 text-[13px] font-black ${isFirst ? 'text-pporange' : ''}`}>{isFirst ? '🥇' : p.rank === 2 ? '🥈' : '🥉'} {p.rank}</div>
                <div className="text-[12px] font-bold leading-tight">{p.name}</div>
                <div className="text-[10px] opacity-70">勝 {p.wins}｜{p.rate}%</div>
              </div>
            )
          })}
        </div>

        {/* 4~n 名 */}
        <div className="mt-3 space-y-2">
          {board.list.map((r) => (
            <Card key={r.rank} className="flex items-center gap-3 p-2.5">
              <div className="w-5 text-center text-[13px] font-bold text-white/60">{r.rank}</div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-ppcyan to-pporange" />
              <div className="flex-1">
                <div className="text-[13px] font-semibold">{r.name} <span className="ml-1 rounded bg-white/15 px-1 text-[9px]">Lv.{r.lv}</span></div>
                <div className="text-[10px] text-white/50">勝場數 {r.wins}｜勝率 {r.rate}%</div>
              </div>
            </Card>
          ))}
        </div>

        {/* 我的排名（黏在下方） */}
        <div className="mt-3 rounded-2xl border-2 border-pporange bg-pporange/10 p-2.5">
          <div className="flex items-center gap-3">
            <div className="w-8 text-center text-[13px] font-black text-pporange">{board.me.rank}</div>
            <PetAvatar form="suit" size={34} />
            <div className="flex-1">
              <div className="text-[13px] font-bold">{board.me.name} <span className="ml-1 rounded bg-white/15 px-1 text-[9px]">Lv.{board.me.lv}</span></div>
              <div className="text-[10px] text-white/60">勝場數 {board.me.wins}｜勝率 {board.me.rate}%</div>
            </div>
            <Chip color="orange">我</Chip>
          </div>
        </div>

        {/* 痛點對照說明 */}
        <div className="mt-3 rounded-xl border border-ppcyan/30 bg-ppcyan/10 p-3 text-[12px] text-ppcyan/90">
          <b>為什麼要日/週/月榜？</b><br />
          總榜老玩家累積上萬場，新人排到 <b className="text-white">99+</b> 直接放棄。
          切到「日榜」你就從 <b className="text-white">第 6 名</b>起跑 → 每天都有上榜的希望，回訪動機大增。
        </div>

        <div className="mt-3"><button onClick={() => go('quiz')} className="w-full rounded-xl bg-pporange py-3 font-bold text-[#231600]">立即挑戰衝日榜</button></div>
      </div>
    </div>
  )
}
