import React, { useState } from 'react'
import { pet, squad } from '../data.js'
import { PhoneHeader, PrimaryButton, Card, Chip, Bar } from '../components/ui.jsx'

// 模組 A 延伸：知識精靈養成 + 學習戰隊
export default function Pet({ go }) {
  const [exp, setExp] = useState(pet.exp)
  const [gained, setGained] = useState(false)
  const feed = () => {
    if (gained) return
    setExp((e) => Math.min(pet.expNext, e + 40))
    setGained(true)
  }
  const pct = Math.round((exp / pet.expNext) * 100)

  return (
    <div>
      <PhoneHeader title="知識精靈 · PiPi" />
      <div className="px-4 pb-6">
        <div className="mt-1 flex flex-wrap gap-2">
          <Chip color="orange">模組A</Chip>
          <Chip color="green">EXP 綁定看課</Chip>
        </div>

        {/* pet */}
        <div className="mt-3 rounded-2xl bg-gradient-to-b from-[#1a3straight] to-[#0e2143] p-4 text-center shadow-card"
             style={{ background: 'linear-gradient(180deg,#1a366b,#0e2143)' }}>
          <div className="animate-floaty text-7xl">🐣</div>
          <div className="mt-1 text-lg font-extrabold">{pet.name} <span className="text-[12px] font-normal text-white/60">Lv.{pet.level}</span></div>
          <div className="text-[12px] text-ppcyan">{pet.form}</div>
          <div className="mx-auto mt-3 max-w-[240px]">
            <Bar value={exp} max={pet.expNext} color="#F7A81B" />
            <div className="mt-1 flex justify-between text-[11px] text-white/60"><span>EXP</span><span>{exp} / {pet.expNext}（{pct}%）</span></div>
          </div>
          {gained && <div className="mt-2 text-[12px] text-ppgreen">✨ 剛剛看課 +40 溝通經驗值！</div>}
        </div>

        {/* abilities = 對照課程分類 */}
        <Card className="mt-3 p-3">
          <div className="mb-2 text-[12px] font-bold text-white/80">能力值（對照 PressPlay 課程分類）</div>
          <div className="space-y-2">
            {pet.abilities.map((a) => (
              <div key={a.label}>
                <div className="flex justify-between text-[11px] text-white/70"><span>{a.label}</span><span>{a.value}</span></div>
                <Bar value={a.value} max={a.max} />
              </div>
            ))}
          </div>
          <div className="mt-2 text-[11px] text-white/50">投資理財次數最高 → 進化為「西裝 PiPi」</div>
        </Card>

        {/* 學習戰隊 */}
        <Card className="mt-3 p-3">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-bold text-white/80">🛡️ {squad.name}</div>
            <Chip color="green">{squad.questDone}/{squad.questTotal} 任務</Chip>
          </div>
          <div className="mt-1 text-[11px] text-white/60">{squad.quest}</div>
          <div className="mt-2 space-y-2">
            {squad.members.map((m) => (
              <div key={m.name} className="flex items-center gap-2">
                <div className="w-12 shrink-0 text-[11px]">{m.name}</div>
                <div className="flex-1"><Bar value={m.progress} color="#3DDC97" /></div>
                <div className="w-24 shrink-0 text-right text-[10px] text-white/50">{m.pet}</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-4 space-y-2">
          <PrimaryButton onClick={feed}>去看課餵養 PiPi（+EXP）</PrimaryButton>
          <button onClick={() => go('multimodal')} className="w-full rounded-xl border border-white/20 py-2.5 text-sm text-white/80">前往多模態學習 →</button>
        </div>

        <div className="mt-3 rounded-xl border border-pporange/30 bg-pporange/10 p-2 text-[11px] text-pporange/90">
          回答官方質疑：經驗值<b>只能</b>靠「看課 / 用 AI」取得 → 遊戲化＝看課引擎，非平行娛樂。
        </div>
      </div>
    </div>
  )
}
