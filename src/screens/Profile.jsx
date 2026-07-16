import React, { useState } from 'react'
import { categoryRadars, radarOrder, pet, badges, petMeta } from '../data.js'
import { PhoneHeader, Card, Chip, PetAvatar, HexBadge, GhostButton } from '../components/ui.jsx'
import RadarChart from '../components/RadarChart.jsx'

// ⑦ 個人主頁：全分類雷達總覽 + 精靈身分卡 + 展示徽章
export default function Profile({ go }) {
  const displayed = badges.filter((b) => b.displayed)
  const [sel, setSel] = useState(radarOrder.find((k) => categoryRadars[k].played >= categoryRadars[k].unlockAt) || 'invest')
  const cat = categoryRadars[sel]
  const unlocked = cat.played >= cat.unlockAt

  return (
    <div>
      <PhoneHeader title="個人主頁" />
      <div className="px-4 pb-6">
        {/* 身分卡：精靈 + 展示徽章 */}
        <Card className="mt-2 flex items-center gap-3 p-3">
          <PetAvatar form={pet.primaryForm} size={64} />
          <div className="flex-1">
            <div className="text-sm font-bold">Ho Wa Chui <span className="ml-1 rounded bg-white/15 px-1 text-[10px]">Lv.{pet.level}</span></div>
            <div className="text-[11px] text-ppcyan">{pet.title}・{pet.formLabel}</div>
            <div className="mt-1.5 flex items-center gap-1.5">
              {displayed.map((b) => (
                <HexBadge key={b.id} badge={b} size={26} compact />
              ))}
              <button onClick={() => go('pet')} className="ml-1 text-[10px] text-white/40">編輯 ›</button>
            </div>
          </div>
        </Card>

        {/* 分類雷達總覽（6 格，未解鎖顯示鎖） */}
        <div className="mt-3 px-1 text-[12px] font-bold text-white/70">六大分類・實力雷達</div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {radarOrder.map((k) => {
            const r = categoryRadars[k]
            const ok = r.played >= r.unlockAt
            return (
              <button key={k} onClick={() => setSel(k)}
                className={`rounded-xl border p-2 text-center transition ${sel === k ? 'border-pporange bg-pporange/10' : 'border-white/10 bg-white/5'}`}>
                <div className="text-lg">{r.icon}</div>
                <div className="text-[11px] font-semibold">{r.name}</div>
                <div className={`text-[10px] ${ok ? 'text-pporange' : 'text-white/40'}`}>{ok ? `總分 ${r.total}` : `🔒 ${r.played}/${r.unlockAt}`}</div>
              </button>
            )
          })}
        </div>

        {/* 選中的雷達 */}
        <Card className="mt-3 p-3">
          <div className="mb-1 flex items-center justify-between">
            <div className="text-[13px] font-bold">{cat.icon} {cat.name} 雷達</div>
            {unlocked ? <Chip color="orange">總分 {cat.total}</Chip> : <Chip color="gray">未解鎖</Chip>}
          </div>
          {unlocked ? (
            <div className="flex justify-center"><RadarChart dims={cat.dims} weakest={cat.weakest} size={210} /></div>
          ) : (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="text-4xl">🔒</div>
              <div className="mt-2 text-[12px] text-white/60">再玩 <b className="text-pporange">{cat.unlockAt - cat.played}</b> 場「{cat.name}」解鎖雷達</div>
              <div className="mt-3 w-full"><GhostButton onClick={() => go('quiz')}>去挑戰</GhostButton></div>
            </div>
          )}
        </Card>

        <div className="mt-4"><GhostButton onClick={() => go('pet')}>前往知識精靈 + 戰隊 →</GhostButton></div>
      </div>
    </div>
  )
}
