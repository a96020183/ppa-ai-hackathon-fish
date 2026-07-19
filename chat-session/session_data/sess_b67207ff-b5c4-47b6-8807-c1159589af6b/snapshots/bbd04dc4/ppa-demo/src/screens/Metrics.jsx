import React from 'react'
import { insights, official, challengeDist } from '../data.js'
import { PhoneHeader, Card, Chip, Bar } from '../components/ui.jsx'

// 成效衡量 + 斷點數據 + A/B（對齊商業影響力 30% / 資料洞察 20%）
export default function Metrics() {
  return (
    <div>
      <PhoneHeader title="成效衡量儀表板" />
      <div className="px-4 pb-6">
        <div className="mt-1 flex flex-wrap gap-2">
          <Chip color="orange">商業影響力 30%</Chip>
          <Chip color="green">資料洞察 20%</Chip>
        </div>

        {/* 官方王牌 */}
        <Card className="mt-3 p-3">
          <div className="text-[12px] font-bold text-white/80">官方數據：AI 助教 = 學習深度放大器</div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            {[['影片觀看', '+' + official.aiViewLift + '%'], ['Session', '+' + official.sessionLift + '%'], ['活躍天數', '+' + official.activeDaysLift + '%']].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-black/25 p-2">
                <div className="text-lg font-extrabold text-ppgreen">{v}</div>
                <div className="text-[10px] text-white/55">{k}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[11px] text-white/55">但 AI 助教 DAU/MAU：{official.dauFrom}% → &lt;{official.dauTo}%（用的人在流失）</div>
        </Card>

        {/* 我們實跑的斷點鐵證 */}
        <Card className="mt-3 p-3">
          <div className="text-[12px] font-bold text-white/80">我們實跑 Dataset 的斷點鐵證（可複現）</div>
          <div className="mt-2 space-y-2 text-[12px]">
            <div className="flex items-center justify-between"><span>對話「問一次就走」比例</span><span className="font-bold text-pporange">{insights.singleTurnPct}%</span></div>
            <div className="flex items-center justify-between"><span>平均對話訊息數</span><span className="font-bold">{insights.avgMsgs} 則（約 {insights.avgRounds} 來回）</span></div>
            <div className="flex items-center justify-between"><span>行為進入「學習中」</span><span className="font-bold text-ppgreen">{insights.learningPct}%</span></div>
            <div className="flex items-center justify-between"><span>停在「其他」漫遊</span><span className="font-bold text-red-300">{insights.wanderPct}%</span></div>
            <div className="flex items-center justify-between"><span>課程分類數（長尾）</span><span className="font-bold">{insights.categoryCount} 類</span></div>
          </div>
        </Card>

        {/* 挑戰分類真實分布 */}
        <Card className="mt-3 p-3">
          <div className="mb-2 text-[12px] font-bold text-white/80">知識挑戰真實分類分布</div>
          <div className="space-y-1.5">
            {challengeDist.slice(0, 6).map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-[11px] text-white/70"><span>{c.name}</span><span>{c.pct}%</span></div>
                <Bar value={c.pct} max={25} color="#25D0EE" />
              </div>
            ))}
          </div>
        </Card>

        {/* A/B */}
        <Card className="mt-3 p-3">
          <div className="text-[12px] font-bold text-white/80">A/B 驗證：遊戲化能否帶動看課？</div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-center text-[12px]">
            <div className="rounded-xl bg-black/25 p-2">
              <div className="text-white/60">A 組（死路）</div>
              <div className="mt-1 text-white/80">只玩知識挑戰</div>
            </div>
            <div className="rounded-xl bg-pporange/15 p-2">
              <div className="text-pporange">B 組（本案）</div>
              <div className="mt-1 text-white/80">EXP 綁定看課</div>
            </div>
          </div>
          <div className="mt-2 text-[11px] text-white/55">追蹤挑戰後 7 天回訪看課率、活躍天數、AI 滲透率。成功判準：B 顯著 &gt; A。</div>
        </Card>

        {/* 誠信 */}
        <div className="mt-3 rounded-xl border border-white/15 bg-white/5 p-3 text-[11px] text-white/60">
          🔬 資料誠信：曾觀察「有用 AI 者看課 1.83x」，但檢驗後中位數僅 1.10x、r≈0.04，
          屬離群值假象，故<b className="text-white/80">不主張因果</b>，改由上方 A/B 驗證。
        </div>
      </div>
    </div>
  )
}
