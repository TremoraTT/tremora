import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const textRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const cursorPos = useRef({ x: -100, y: -100 })
  const trailPos = useRef({ x: -100, y: -100 })
  const hovering = useRef(false)
  const hoverText = useRef('')
  const raf = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = (e) => {
      hovering.current = true
      hoverText.current = e.target.dataset?.cursorText || ''
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(3)'
        cursorRef.current.style.mixBlendMode = 'difference'
        cursorRef.current.style.background = 'white'
      }
      if (trailRef.current) {
        trailRef.current.style.opacity = '0'
      }
      if (textRef.current) {
        textRef.current.style.opacity = hoverText.current ? '1' : '0'
        textRef.current.textContent = hoverText.current
      }
    }

    const onLeave = () => {
      hovering.current = false
      hoverText.current = ''
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
        cursorRef.current.style.mixBlendMode = 'normal'
        cursorRef.current.style.background = 'var(--coral)'
      }
      if (trailRef.current) {
        trailRef.current.style.opacity = '0.4'
      }
      if (textRef.current) {
        textRef.current.style.opacity = '0'
      }
    }

    const animate = () => {
      cursorPos.current.x += (pos.current.x - cursorPos.current.x) * 0.85
      cursorPos.current.y += (pos.current.y - cursorPos.current.y) * 0.85
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.12
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.12

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`
        cursorRef.current.style.top = `${cursorPos.current.y}px`
      }
      if (trailRef.current) {
        trailRef.current.style.left = `${trailPos.current.x}px`
        trailRef.current.style.top = `${trailPos.current.y}px`
      }
      if (textRef.current) {
        textRef.current.style.left = `${cursorPos.current.x}px`
        textRef.current.style.top = `${cursorPos.current.y + 28}px`
      }

      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(animate)

    const bindHovers = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    bindHovers()

    const observer = new MutationObserver(bindHovers)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      observer.disconnect()
    }
  }, [])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      {/* Main cursor — small dot that expands to blend-mode circle on hover */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: 'var(--coral)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s, mix-blend-mode 0.3s',
        }}
      />
      {/* Trail — lazy follower */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid var(--coral)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s ease',
          opacity: 0.4,
        }}
      />
      {/* Hover text label */}
      <div
        ref={textRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          fontSize: '0.6rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--coral)',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          whiteSpace: 'nowrap',
        }}
      />
    </>
  )
}
