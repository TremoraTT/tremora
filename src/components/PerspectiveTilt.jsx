import { useEffect, useRef } from 'react'

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

export default function PerspectiveTilt({
  children,
  maxRotateX = 10,
  maxRotateY = 20,
  smoothing = 0.1,
  style = {},
}) {
  const containerRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const card = cardRef.current
    if (!container || !card) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let targetX = 0
    let targetY = 0
    let rotX = 0
    let rotY = 0
    let raf = 0

    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
      const dist = Math.hypot(dx, dy)
      const falloff = dist <= 1 ? 1 : Math.max(0, 1 - (dist - 1) / 2)

      targetX = clamp(dy, -1, 1) * maxRotateX * falloff
      targetY = -clamp(dx, -1, 1) * maxRotateY * falloff
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    const tick = () => {
      rotX += (targetX - rotX) * smoothing
      rotY += (targetY - rotY) * smoothing

      card.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    tick()

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [maxRotateX, maxRotateY, smoothing])

  return (
    <div
      ref={containerRef}
      style={{
        perspective: '1200px',
        ...style,
      }}
    >
      <div style={{ transformStyle: 'preserve-3d' }}>
        <div
          ref={cardRef}
          style={{
            willChange: 'transform',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
