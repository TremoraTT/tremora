const items = [
  'Continuous Monitoring',
  '200Hz Sampling',
  'On-Device ML',
  'UPDRS Scoring',
  'Parkinson\'s Care',
  '86.4% Accuracy',
  'ESP32 Powered',
  'FDA Pathway',
]

const keyframes = `
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
`

export default function Marquee({ dark = false }) {
  const bg = dark ? 'var(--dark)' : 'var(--text-primary)'
  const color = dark ? 'var(--cream)' : 'var(--cream)'

  return (
    <div style={{
      background: bg,
      padding: '14px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <style>{keyframes}</style>
      <div style={{
        display: 'flex',
        animation: 'marquee 20s linear infinite',
        width: 'max-content',
      }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color,
            whiteSpace: 'nowrap',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}>
            {item}
            <span style={{ color: 'var(--coral)', fontSize: '0.5rem' }}>●</span>
          </span>
        ))}
      </div>
    </div>
  )
}
