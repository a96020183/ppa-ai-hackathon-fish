import React, { useState } from 'react'
import { pet, squad, badges as allBadges, petMeta } from '../data.js'
import { PhoneHeader, PrimaryButton, GhostButton, Card, Chip, Bar, PetAvatar, HexBadge } from '../components/ui.jsx'

// 知識精靈養成 + 六角徽章 + 學習戰隊（敲朋友）
export default function Pet({ go }) {
  const [gained, setGained] = useState(false)
  const [exp, setExp] = useState(320)
  const expNext = 500
  const feed = () => { if (!gained) { setExp((e) => Math.min(expNext, e + 40)); setGained(true) } }
  const pct = Math.round((exp / expNext) * 100)

  // 徽章：最多選 3 個展示
  const [displayed, setDisplayed] = useState(allBadges.filter((b) => b.displayed).map((b) => b.id))
  const toggle = (b) => {
    if (b.tier === 'locked') return
    setDisplayed((cur) => cur.includes(b.id) ? cur.filter((x) => x !== b.id) : cur.length >= 3 ? cur : [...cur, b.id])
  }

  const [toast, setToast] = useState('')
  const poke = (name) => { setToast(squad.pokeMsg('你', name)); setTimeout(() => setToast(''), 2600) }

  return (
    <div>
      <PhoneHeader title={`知識精靈 · ${pet.name}`} />
      <div className="px-4 pb-6">
        {/* pet + MBTI 風稱號 */}
        <div className="mt-2 rounded-2xl p-4 text-center shadow-card" style={{ background: 'linear-gradient(180deg,#1a366b,#0e2143)' }}>
          <div className="animate-floaty flex justify-center"><PetAvatar form={pet.primaryForm} size={120} /></div>
          <div className="mt-1 text-lg font-extrabold">{pet.name} <span className="text-[12px] font-normal text-white/60">Lv.{pet.level}</span></div>
          <div className="mt-1 inline-block rounded-full bg-pporange/20 px-3 py-0.5 text-[14px] font-bold text-pporange">{pet.title}</div>
          <div className="mt-1 text-[11px] text-white/65">{pet.titleDesc}</div>
          <div className="mt-0.5 text-[11px] text-ppcyan">{pet.formLabel}</div>
          <div className="mx-auto mt-3 max-w-[240px]">
            <Bar value={exp} max={expNext} color="#F7A81B" />
            <div className="mt-1 flex justify-between text-[11px] text-white/60"><span>總經驗值</span><span>{exp} / {expNext}（{pct}%）</span></div>
          </div>
          {gained && <div className="mt-2 text-[12px] text-ppgreen">✨ 剛剛看課 +40 經驗值！</div>}
        </div>

        {/* 進化外型圖鑑（每個外型＝分類雷達總分前二的組合） */}
        <Card className="mt-3 p-3">
          <div className="mb-2 text-[12px] font-bold text-white/80">外型圖鑑</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {petMeta.gallery.map((g, i) => {
              const isCurrent = g.form === pet.primaryForm
              const locked = g.form === 'lock'
              return (
                <div key={i} className={`rounded-xl p-2 ${isCurrent ? 'bg-pporange/15 ring-1 ring-pporange' : 'bg-white/5'}`}>
                  <div className="flex justify-center"><PetAvatar form={g.form} lock={locked} size={48} lockVariant={(i % 3) + 1} /></div>
                  <div className="mt-1 text-[10px] font-semibold text-white/80">{g.label}</div>
                  <div className="text-[9px] leading-tight text-white/45">{g.combo}</div>
                  {isCurrent && <div className="mt-0.5 text-[8px] font-bold text-pporange">目前外型</div>}
                </div>
              )
            })}
          </div>
          <div className="mt-2 text-[10px] text-white/45">人人從素顏 PiPi 出發；兩項分類實力最高 → 決定裝扮組合</div>
        </Card>

        {/* 能力值 */}
        <Card className="mt-3 p-3">
          <div className="mb-1 text-[12px] font-bold text-white/80">分類能力值</div>
          <div className="mb-2 text-[10px] text-white/45">{pet.abilityRule}</div>
          <div className="space-y-2">
            {pet.abilities.map((a) => (
              <div key={a.cat}>
                <div className="flex justify-between text-[11px] text-white/70"><span>{a.cat}</span><span>{a.value}</span></div>
                <Bar value={a.value} max={100} />
              </div>
            ))}
          </div>
        </Card>

        {/* 六角徽章：選 3 個展示 */}
        <Card className="mt-3 p-3">
          <div className="mb-1 flex items-center justify-between">
            <div className="text-[12px] font-bold text-white/80">🏅 徽章牆</div>
            <span className="text-[10px] text-white/50">已選 {displayed.length}/3 展示</span>
          </div>
          <div className="mb-2 text-[10px] text-white/45">點徽章選擇要展示在個人主頁的 3 個</div>
          <div className="grid grid-cols-4 gap-y-3">
            {allBadges.map((b) => (
              <HexBadge key={b.id} badge={b} size={58} selected={displayed.includes(b.id)} onClick={() => toggle(b)} />
            ))}
          </div>
        </Card>

        {/* 學習戰隊：隊友寵物 + 敲一下 */}
        <Card className="mt-3 p-3">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-bold text-white/80">🛡️ {squad.name}</div>
            <Chip color="green">{squad.questDone}/{squad.questTotal} 任務</Chip>
          </div>
          <div className="mt-1 text-[11px] text-white/60">{squad.quest}</div>
          <div className="mt-3 space-y-2">
            {squad.members.map((m) => (
              <div key={m.name} className="flex items-center gap-2">
                <PetAvatar form={m.form} size={34} />
                <div className="flex-1">
                  <div className="flex justify-between text-[11px]">
                    <span className={m.isMe ? 'font-bold text-pporange' : 'text-white/80'}>{m.name}・{m.petName} Lv.{m.level}</span>
                    <span className="text-white/50">{m.progress}%</span>
                  </div>
                  <Bar value={m.progress} color={m.isMe ? '#F7A81B' : '#3DDC97'} />
                </div>
                {!m.isMe && (
                  <button onClick={() => poke(m.name)} className="shrink-0 rounded-lg bg-ppcyan/15 px-2 py-1 text-[11px] text-ppcyan">👉 敲一下</button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-4 space-y-2">
          <PrimaryButton onClick={feed}>去看課餵養 PiPi（+EXP）</PrimaryButton>
          <GhostButton onClick={() => go('multimodal')}>前往多模態學習 →</GhostButton>
        </div>
      </div>

      {/* poke toast */}
      {toast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-6">
          <div className="rounded-xl bg-black/85 px-4 py-2 text-center text-[12px] text-white shadow-card">{toast}</div>
        </div>
      )}
    </div>
  )
}
