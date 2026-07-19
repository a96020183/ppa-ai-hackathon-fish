import React, { useState } from 'react'
import { flow } from './data.js'
import Arena from './screens/Arena.jsx'
import Leaderboard from './screens/Leaderboard.jsx'
import Quiz from './screens/Quiz.jsx'
import SoftLanding from './screens/SoftLanding.jsx'
import RadarResult from './screens/RadarResult.jsx'
import Recommend from './screens/Recommend.jsx'
import Profile from './screens/Profile.jsx'
import Pet from './screens/Pet.jsx'
import Multimodal from './screens/Multimodal.jsx'

const SCREENS = {
  arena: Arena,
  leaderboard: Leaderboard,
  quiz: Quiz,
  softland: SoftLanding,
  radar: RadarResult,
  recommend: Recommend,
  profile: Profile,
  pet: Pet,
  multimodal: Multimodal,
}

const MODULE_TAGS = {
  arena: '入口',
  leaderboard: '入口 · 留存',
  quiz: '入口',
  softland: '模組 B',
  radar: '模組 A · 主線',
  recommend: '模組 C',
  profile: '個人主頁',
  pet: '模組 A',
  multimodal: '模組 D',
}

export default function App() {
  const [screen, setScreen] = useState('arena')
  const [history, setHistory] = useState([])
  const [param, setParam] = useState(null)
  const Current = SCREENS[screen]

  const go = (id, p = null) => { setHistory((h) => [...h, screen]); setParam(p); setScreen(id) }
  const back = () => setHistory((h) => {
    if (!h.length) return h
    setScreen(h[h.length - 1])
    return h.slice(0, -1)
  })
  const home = () => { setHistory([]); setScreen('arena') }

  return (
    <div className="min-h-screen w-full px-4 py-6 lg:px-10">
      {/* header */}
      <div className="mx-auto mb-6 max-w-6xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pporange text-lg font-black text-[#231600]">PP</div>
          <div>
            <h1 className="text-lg font-extrabold leading-tight">PressPlay AI 智慧學習生態系 · 互動 Demo</h1>
            <p className="text-[12px] text-white/55">團隊 fish｜從對話到多元應用：主動進化 × 多維賦能的 AI 智慧對話助教</p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
        {/* 模組導覽 */}
        <aside className="lg:w-72 shrink-0">
          <div className="rounded-2xl border border-ppline/60 bg-ppnavy2/60 p-3">
            <div className="mb-2 px-1 text-[12px] font-bold text-white/70">情境導覽（點擊跳轉）</div>
            <div className="space-y-1.5">
              {flow.map((f) => (
                <button
                  key={f.id}
                  onClick={() => go(f.id)}
                  className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                    screen === f.id
                      ? 'border-pporange bg-pporange/15'
                      : 'border-transparent bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="text-[13px] font-semibold">{f.label}</div>
                  <div className="text-[11px] text-white/50">{f.hint}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 rounded-2xl border border-ppline/60 bg-ppnavy2/60 p-3 text-[11px] leading-relaxed text-white/60">
            <b className="text-white/80">建議動線：</b>擂台 → 排行榜 → 答題（選錯答案）→ 45秒軟著陸 → AI 診斷雷達 → 推薦去重 → 多模態看課 → 個人主頁 → 精靈/戰隊。
          </div>
        </aside>

        {/* phone frame */}
        <main className="flex flex-1 justify-center">
          <div className="w-full max-w-[400px]">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="rounded-full bg-ppcyan/15 px-3 py-1 text-[12px] font-semibold text-ppcyan">{MODULE_TAGS[screen]}</span>
              <span className="text-[11px] text-white/40">手機版 Web UI</span>
            </div>
            <div className="relative rounded-[2.2rem] border border-ppline bg-[#0b1b3a] p-3 shadow-card">
              {/* notch */}
              <div className="mx-auto mb-2 h-1.5 w-24 rounded-full bg-white/20" />
              {/* 通用導覽列：返回 / 回首頁（每頁都有） */}
              <div className="mb-1.5 flex items-center justify-between px-1">
                <button
                  onClick={back}
                  disabled={history.length === 0}
                  className={`rounded-lg px-2 py-1 text-[12px] transition ${history.length === 0 ? 'text-white/20' : 'text-white/70 hover:bg-white/10'}`}
                >
                  ‹ 返回
                </button>
                <button
                  onClick={home}
                  disabled={screen === 'arena'}
                  className={`rounded-lg px-2 py-1 text-[12px] transition ${screen === 'arena' ? 'text-white/20' : 'text-white/70 hover:bg-white/10'}`}
                >
                  回首頁
                </button>
              </div>
              <div className="pp-scroll h-[688px] overflow-y-auto rounded-[1.6rem] bg-gradient-to-b from-[#0c1d3d] to-[#0a1730]">
                <Current go={go} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="mx-auto mt-6 max-w-6xl text-center text-[11px] text-white/35">
        原型資料取自官方 Dataset 實跑結果（可複現）與示意假資料 · React + Tailwind · 僅供 Hackathon 展示
      </div>
    </div>
  )
}
