import React from 'react'

export function Card({ children, className = '', tone }) {
  const toneCls =
    tone === 'warm' ? 'bg-[#FBEED0] text-[#3a2c0d]'
    : tone === 'cool' ? 'bg-[#DCE7FB] text-[#17284a]'
    : 'bg-ppcard text-white'
  return (
    <div className={`rounded-2xl ${toneCls} shadow-card ${className}`}>{children}</div>
  )
}

export function PrimaryButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl bg-pporange py-3 font-bold text-[#231600] shadow-glow active:scale-[.98] transition ${className}`}
    >
      {children}
    </button>
  )
}

export function Chip({ children, color = 'cyan' }) {
  const c = color === 'orange' ? 'bg-pporange/20 text-pporange border-pporange/40'
    : color === 'green' ? 'bg-ppgreen/20 text-ppgreen border-ppgreen/40'
    : 'bg-ppcyan/20 text-ppcyan border-ppcyan/40'
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${c}`}>{children}</span>
}

export function Bar({ value, max = 100, color = '#25D0EE' }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
      <div className="bar-fill h-full rounded-full" style={{ width: pct + '%', background: color }} />
    </div>
  )
}

export function PhoneHeader({ title, coins = 325 }) {
  return (
    <div className="flex items-center justify-between px-4 pt-3 pb-2">
      <div className="text-sm font-bold text-white">{title}</div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px]">排行榜</span>
        <span className="rounded-full bg-pporange/90 px-2 py-0.5 text-[11px] font-bold text-[#231600]">🪙 {coins}</span>
      </div>
    </div>
  )
}
