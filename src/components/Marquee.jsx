const items = [
  'Continuous Monitoring',
  '200Hz Sampling',
  'On-Device ML',
  'UPDRS Scoring',
  'Parkinson\'s Care',
  '86.4% Accuracy',
  'ESP32 Powered',
  'FDA Pathway',
  'Real-Time Scoring',
  'Clinical Grade',
]

const keyframes = `
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
`

function MarqueeRow({ speed = 30 }) {
  const doubled = [...items, ...items]
  return (
    <div style={{
      display: 'flex',
      animation: `marquee ${speed}s linear infinite`,
      width: 'max-content',
    }}>
      {doubled.map((item, i) => (
        <span key={i} style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color: 'var(--cream)',
          whiteSpace: 'nowrap',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          opacity: 0.7,
        }}>
          {item}
          <span style={{ color: 'var(--coral)', fontSize: '0.35rem', opacity: 0.8 }}>◆</span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div style={{
      background: 'var(--dark)',
      padding: '20px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <style>{keyframes}</style>
      {/* Gradient fade edges */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '120px',
        background: 'linear-gradient(to right, var(--dark), transparent)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '120px',
        background: 'linear-gradient(to left, var(--dark), transparent)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />
      <MarqueeRow speed={35} />
    </div>
  )
}
