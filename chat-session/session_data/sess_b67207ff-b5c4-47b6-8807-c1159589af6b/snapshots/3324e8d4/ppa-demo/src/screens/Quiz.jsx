import React, { useEffect, useState } from 'react'
import { PhoneHeader, PetAvatar } from '../components/ui.jsx'

// 知識挑戰「PK 對戰」— 對齊 PPA 真實 UI（雙方玩家卡 / 倒數圈 / 側邊分數條 / 分類+難度 / 深色選項答對變綠）
export default function Quiz({ go }) {
  const [phase, setPhase] = useState('intro') // intro → question
  const [time, setTime] = useState(10)
  const [picked, setPicked] = useState(null)
  const [myScore, setMyScore] = useState(68)
  const oppScore = 47

  // 分類 / 難度（對齊真 UI 的「第 N 題 + 投資理財 + 難度★」）
  const category = '投資理財'
  const difficulty = 1 // ★ / 4
  const qno = 3

  const question = '當一個人感到壓力大時，常會購買非必需品來改善心情，這種消費行為的主要動機是什麼？'
  const options = [
    { key: 'A', text: '遵循預先制定的購物清單' },
    { key: 'B', text: '進行長期財務投資' },
    { key: 'C', text: '滿足基本生活需求' },
    { key: 'D', text: '作為一種情緒調節方式' }, // 正解
  ]
  const correct = 'D'

  // intro 短暫展示分類/難度後進入題目
  useEffect(() => {
    if (phase !== 'intro') return
    const t = setTimeout(() => setPhase('question'), 1600)
    return () => clearTimeout(t)
  }, [phase])

  // 倒數
  useEffect(() => {
    if (phase !== 'question' || picked !== null) return
    if (time <= 0) { choose('A'); return } // 逾時視為答錯
    const t = setTimeout(() => setTime((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, time, picked])

  const choose = (k) => {
    if (picked !== null) return
    setPicked(k)
    if (k === correct) setMyScore((s) => s + 10)
    setTimeout(() => {
      if (k === correct) go('radar')   // 答對 → AI 診斷結算
      else go('softland')              // 答錯 → 45 秒軟著陸
    }, 1100)
  }

  const answeredCorrect = picked === correct
  const answeredWrong = picked !== null && picked !== correct

  return (
    <div className="min-h-full" style={{ background: 'linear-gradient(180deg,#0e1f3f,#0a1730)' }}>
      <PhoneHeader title="知識挑戰 · PK 對戰" />
      <div className="px-3 pb-6">
        {/* 雙方玩家卡 */}
        <div className="mt-1 flex items-stretch gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#F7B733] to-[#F0951B] p-2 pr-3 shadow-card">
            <PetAvatar form="suit" size={34} />
            <div className="leading-tight text-[#3a2400]">
              <div className="text-[10px] font-semibold opacity-80">我 (LV5)</div>
              <div className="text-[12px] font-black">Ho Wa Chui</div>
            </div>
          </div>
          <div className="flex flex-1 flex-row-reverse items-center gap-2 rounded-2xl bg-gradient-to-l from-[#2A7BE4] to-[#1B4F9E] p-2 pl-3 shadow-card">
            <PetAvatar form="default" size={34} />
            <div className="text-right leading-tight text-white">
              <div className="text-[10px] font-semibold opacity-80">學員 (LV3)</div>
              <div className="text-[12px] font-black">狗兒</div>
            </div>
          </div>
        </div>

        {/* 倒數 + 答題結果 */}
        <div className="mt-3 flex items-center justify-center gap-3">
          {answeredCorrect && <span className="rounded-full bg-ppgreen px-3 py-1 text-[12px] font-bold text-[#08301f]">✓ 回答正確</span>}
          <div className={`flex h-14 w-14 items-center justify-center rounded-full border-4 text-xl font-black ${time <= 3 && phase === 'question' && !picked ? 'border-red-400 text-red-300' : 'border-white/40 text-white'}`}>
            {phase === 'intro' ? '3' : Math.max(0, time)}
          </div>
          {answeredWrong && <span className="rounded-full bg-red-500 px-3 py-1 text-[12px] font-bold text-white">✕ 回答錯誤</span>}
        </div>

        {/* 分數條(左我/右對手) + 中間題卡 */}
        <div className="mt-3 flex items-stretch gap-2">
          {/* 我的分數條 */}
          <ScoreBar score={myScore} color="#F0951B" align="left" />

          {/* 中間：intro 或題目 */}
          <div className="flex-1">
            {phase === 'intro' ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl bg-white p-5 text-center text-[#17284a] shadow-card">
                <div className="text-[15px] font-bold text-black/60">第 {qno} 題</div>
                <div className="mt-3 text-2xl font-black">{category}</div>
                <div className="mt-3 text-[13px] text-black/50">難度</div>
                <div className="mt-1 text-xl tracking-widest">
                  {'★'.repeat(difficulty)}<span className="text-black/20">{'★'.repeat(4 - difficulty)}</span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-4 text-[#17284a] shadow-card">
                <div className="text-[14px] font-bold leading-relaxed">{question}</div>
                <div className="mt-3 space-y-2">
                  {options.map((o) => {
                    let cls = 'bg-[#2b3444] text-white'
                    if (picked) {
                      if (o.key === correct) cls = 'bg-ppgreen text-[#08301f] font-bold'
                      else if (o.key === picked) cls = 'bg-red-500 text-white'
                      else cls = 'bg-[#e6e8ee] text-black/40'
                    }
                    return (
                      <button key={o.key} onClick={() => choose(o.key)}
                        className={`w-full rounded-full px-4 py-3 text-[13px] transition active:scale-[.99] ${cls}`}>
                        {o.text}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 對手分數條 */}
          <ScoreBar score={oppScore} color="#2A7BE4" align="right" />
        </div>
      </div>
    </div>
  )
}

function ScoreBar({ score, color, align }) {
  const pct = Math.min(100, score)
  return (
    <div className="flex w-8 flex-col items-center">
      <div className="text-[12px] font-black text-white">{score}</div>
      <div className="relative mt-1 w-2.5 flex-1 overflow-hidden rounded-full bg-white/12">
        <div className="absolute bottom-0 left-0 w-full rounded-full" style={{ height: pct + '%', background: color }} />
      </div>
      <div className="mt-1 text-[9px] text-white/50">{align === 'left' ? '我' : '對手'}</div>
    </div>
  )
}
