import React, { useState } from 'react'
import { pet, squad, badges as allBadges, petMeta } from '../data.js'
import { PhoneHeader, PrimaryButton, GhostButton, Card, Chip, Bar, PetAvatar, HexBadge } from '../components/ui.jsx'

// ⑧ 知識精靈養成 + 六角徽章 + 學習戰隊（敲朋友）
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
        <div className="mt-1 flex flex-wrap gap-2">
          <Chip color="orange">模組A</Chip>
          <Chip color="green">EXP 綁定看課</Chip>
        </div>

        {/* pet + 外型來源說明 */}
        <div className="mt-3 rounded-2xl p-4 text-center shadow-card" style={{ background: 'linear-gradient(180deg,#1a366b,#0e2143)' }}>
          <div className="animate-floaty flex justify-center"><PetAvatar form={pet.primaryForm} size={120} /></div>
          <div className="mt-1 text-lg font-extrabold">{pet.name} <span className="text-[12px] font-normal text-white/60">Lv.{pet.level}</span></div>
          <div className="text-[12px] text-ppcyan">{pet.formLabel}</div>
          <div className="mx-auto mt-2 max-w-[260px] rounded-lg bg-black/25 p-2 text-[11px] text-white/70">
            外型來源：{pet.formReason}
          </div>
          <div className="mx-auto mt-3 max-w-[240px]">
            <Bar value={exp} max={expNext} color="#F7A81B" />
            <div className="mt-1 flex justify-between text-[11px] text-white/60"><span>EXP</span><span>{exp} / {expNext}（{pct}%）</span></div>
          </div>
          {gained && <div className="mt-2 text-[12px] text-ppgreen">✨ 剛剛看課 +40 經驗值！</div>}
        </div>

        {/* 進化外型預覽 */}
        <Card className="mt-3 p-3">
          <div className="mb-2 text-[12px] font-bold text-white/80">外型圖鑑（依分類雷達總分進化）</div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {['default', 'suit', 'fitness', 'chef', 'scholar', 'life'].map((f) => (
              <div key={f} className={`rounded-xl p-2 ${f === pet.primaryForm ? 'bg-pporange/15 ring-1 ring-pporange' : 'bg-white/5'}`}>
                <PetAvatar form={f} size={40} />
                <div className="mt-1 text-[9px] text-white/60">{petMeta.forms[f].label.replace(' PiPi', '').replace('PiPi', '')}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[10px] text-white/45">所有人一開始都是「素顏 PiPi」，隨分類實力長出對應裝扮</div>
        </Card>

        {/* 能力值（由已購課程累積） */}
        <Card className="mt-3 p-3">
          <div className="mb-1 text-[12px] font-bold text-white/80">能力值（對照 PPA 課程分類）</div>
          <div className="mb-2 text-[10px] text-white/45">{pet.abilityRule}</div>
          <div className="space-y-2">
            {pet.abilities.map((a) => (
              <div key={a.cat}>
                <div className="flex justify-between text-[11px] text-white/70"><span>{a.cat}</span><span>{a.value}（已購 NT${a.spentNTD.toLocaleString()}）</span></div>
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
          <div className="mb-2 text-[10px] text-white/45">把上線時長、課程時長、連勝、大富翁…串成一套成就系統，點徽章選擇展示</div>
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
          <div className="mt-2 text-[10px] text-white/45">純訂閱/免費看課記錄 → 累積戰隊貢獻，揪隊友一起回來看課</div>
        </Card>

        <div className="mt-4 space-y-2">
          <PrimaryButton onClick={feed}>去看課餵養 PiPi（+EXP）</PrimaryButton>
          <GhostButton onClick={() => go('multimodal')}>前往多模態學習 →</GhostButton>
        </div>

        <div className="mt-3 rounded-xl border border-pporange/30 bg-pporange/10 p-2 text-[11px] text-pporange/90">
          回答官方質疑：EXP <b>只能</b>靠「看課 / 用 AI」取得 → 遊戲化＝看課引擎，非平行娛樂。
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
