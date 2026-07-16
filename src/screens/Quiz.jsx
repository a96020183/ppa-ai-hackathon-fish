import React, { useEffect, useState } from 'react'
import { PhoneHeader } from '../components/ui.jsx'

export default function Quiz({ go }) {
  const [time, setTime] = useState(10)
  const [picked, setPicked] = useState(null)

  useEffect(() => {
    if (picked !== null) return
    if (time <= 0) { setPicked('B'); return }
    const t = setTimeout(() => setTime((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [time, picked])

  const options = [
    { key: 'A', text: '直接說出自己的需求與情緒' },
    { key: 'B', text: '先承接對方情緒，再表達立場' }, // 正解 B；示範答錯走 A
  ]
  const correct = 'B'

  const choose = (k) => {
    if (picked !== null) return
    setPicked(k)
    setTimeout(() => {
      if (k === correct) go('radar')   // 答對 → 直接結算
      else go('softland')              // 答錯 → 45秒軟著陸（模組B）
    }, 900)
  }

  return (
    <div>
      <PhoneHeader title="心理學挑戰 · 第 3 題" />
      <div className="px-4 pb-6">
        {/* timer */}
        <div className="mt-2 flex items-center justify-center">
          <div className={`flex h-16 w-16 items-center justify-center rounded-full border-4 text-2xl font-bold ${time <= 3 ? 'border-red-400 text-red-300' : 'border-ppcyan text-ppcyan'}`}>
            {Math.max(0, time)}
          </div>
        </div>
        <div className="mt-1 text-center text-[11px] text-white/50">連勝 2 · 難度 ★★☆</div>

        <div className="mt-4 rounded-2xl bg-ppcard p-4 text-[15px] leading-relaxed shadow-card">
          面對主管情緒性指責時，最能「降低衝突並守住立場」的第一步是？
        </div>

        <div className="mt-4 space-y-3">
          {options.map((o) => {
            let cls = 'bg-white/8 border-white/15'
            if (picked) {
              if (o.key === correct) cls = 'bg-ppgreen/20 border-ppgreen'
              else if (o.key === picked) cls = 'bg-red-500/20 border-red-400'
            }
            return (
              <button key={o.key} onClick={() => choose(o.key)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${cls}`}>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">{o.key}</span>
                <span className="text-sm">{o.text}</span>
              </button>
            )
          })}
        </div>

        {picked && picked !== correct && (
          <div className="mt-4 text-center text-sm text-pporange">答錯了！AI 助教正在為你準備補強… </div>
        )}
        {picked === correct && (
          <div className="mt-4 text-center text-sm text-ppgreen">答對！進入結算… </div>
        )}
      </div>
    </div>
  )
}
