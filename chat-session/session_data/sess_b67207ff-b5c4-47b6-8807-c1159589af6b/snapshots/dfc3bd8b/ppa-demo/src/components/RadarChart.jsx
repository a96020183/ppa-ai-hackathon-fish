import React from 'react'

// 純 SVG 雷達圖，無外部套件
export default function RadarChart({ dims, size = 230, weakest }) {
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 30
  const n = dims.length
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2

  const point = (i, ratio) => {
    const a = angle(i)
    return [cx + r * ratio * Math.cos(a), cy + r * ratio * Math.sin(a)]
  }

  const rings = [0.25, 0.5, 0.75, 1]
  const polygon = dims.map((d, i) => point(i, d.value / 100).join(',')).join(' ')

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* grid rings */}
      {rings.map((ratio, idx) => (
        <polygon
          key={idx}
          points={dims.map((_, i) => point(i, ratio).join(',')).join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
        />
      ))}
      {/* spokes */}
      {dims.map((_, i) => {
        const [x, y] = point(i, 1)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.12)" />
      })}
      {/* data */}
      <polygon points={polygon} fill="rgba(37,208,238,0.28)" stroke="#25D0EE" strokeWidth="2" />
      {dims.map((d, i) => {
        const [x, y] = point(i, d.value / 100)
        return <circle key={i} cx={x} cy={y} r="3" fill="#25D0EE" />
      })}
      {/* labels */}
      {dims.map((d, i) => {
        const [x, y] = point(i, 1.18)
        const isWeak = d.label === weakest
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fontWeight={isWeak ? 700 : 500}
            fill={isWeak ? '#F7A81B' : '#cdd9ee'}
          >
            {d.label}
          </text>
        )
      })}
    </svg>
  )
}
