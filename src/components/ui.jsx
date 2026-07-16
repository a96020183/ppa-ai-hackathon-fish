import React from 'react'
import { petMeta } from '../data.js'

export function Card({ children, className = '', tone }) {
  const toneCls =
    tone === 'warm' ? 'bg-[#FBEED0] text-[#3a2c0d]'
    : tone === 'cool' ? 'bg-[#DCE7FB] text-[#17284a]'
    : tone === 'pink' ? 'bg-[#FBDCE7] text-[#4a1729]'
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

export function GhostButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border border-white/20 py-2.5 text-sm text-white/80 active:scale-[.98] transition ${className}`}
    >
      {children}
    </button>
  )
}

export function Chip({ children, color = 'cyan' }) {
  const c = color === 'orange' ? 'bg-pporange/20 text-pporange border-pporange/40'
    : color === 'green' ? 'bg-ppgreen/20 text-ppgreen border-ppgreen/40'
    : color === 'gray' ? 'bg-white/10 text-white/60 border-white/20'
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

export function PhoneHeader({ title, coins = 325, back, onBack }) {
  return (
    <div className="flex items-center justify-between px-4 pt-3 pb-2">
      <div className="flex items-center gap-1 text-sm font-bold text-white">
        {back && <button onClick={onBack} className="mr-1 text-white/60">‹</button>}
        {title}
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px]">排行榜</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-pporange/90 px-2 py-0.5 text-[11px] font-bold text-[#231600]"><Coin /> {coins}</span>
      </div>
    </div>
  )
}

// 樣式硬幣（不依賴 emoji 字型，投影機/任何電腦都不會變豆腐方框）
export function Coin({ size = 14 }) {
  return (
    <span
      style={{ width: size, height: size }}
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FFE08A] to-[#F0951B] text-[9px] font-black text-[#5a3a00] shadow-sm ring-1 ring-[#c97d0a] align-middle"
    >
      P
    </span>
  )
}

// 寵物頭像：優先用真圖（/pets/*.png）；未解鎖或無圖 → 顯示黑色剪影（lock1/2/3 輪替）
export function PetAvatar({ form = 'default', size = 72, className = '', lock = false, lockVariant = 1 }) {
  const meta = petMeta.forms[form]
  const lockSrc = petMeta.locks[(lockVariant - 1) % petMeta.locks.length]
  const showLock = lock || !meta || !meta.img
  const src = showLock ? lockSrc : meta.img
  return (
    <img
      src={src}
      alt={showLock ? '未解鎖 PiPi' : meta.label}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain' }}
      className={className}
    />
  )
}

// 六角形徽章（Futu 風格分級）
const TIER = {
  gold: 'from-[#FFD770] to-[#F7A81B]',
  blue: 'from-[#5FC6FF] to-[#2A7BE4]',
  silver: 'from-[#D7DEE9] to-[#9AA7BC]',
  bronze: 'from-[#E7B37A] to-[#B4793C]',
  locked: 'from-[#3a4a63] to-[#2a3648]',
}
export function HexBadge({ badge, size = 64, onClick, selected, compact = false }) {
  const grad = TIER[badge.tier] || TIER.locked
  const locked = badge.tier === 'locked'
  const clip = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
  const hex = (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-br ${grad} ${selected ? 'ring-2 ring-pporange ring-offset-2 ring-offset-[#0c1d3d]' : ''}`}
      style={{ width: size, height: size, clipPath: clip }}
    >
      <span style={{ fontSize: size * 0.4, opacity: locked ? 0.4 : 1 }}>{badge.icon}</span>
      {selected && !compact && (
        <span className="absolute -right-0 -top-0 flex h-4 w-4 items-center justify-center rounded-full bg-pporange text-[9px] font-bold text-[#231600]">✓</span>
      )}
    </div>
  )
  if (compact) return <div title={`${badge.name} Lv.${badge.level}`}>{hex}</div>
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1" style={{ width: size + 12 }}>
      {hex}
      <div className="text-center leading-tight">
        <div className="text-[10px] font-semibold text-white/85">{badge.name}</div>
        <div className={`text-[9px] ${locked ? 'text-white/35' : 'text-pporange'}`}>{locked ? '未解鎖' : 'Lv.' + badge.level}</div>
      </div>
    </button>
  )
}
