import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: '4×', label: 'yearly visits', sub: 'Average neurologist appointments per year' },
  { number: '15', label: 'minutes', sub: 'Typical observation window per visit' },
  { number: '1hr', label: 'per year', sub: 'Total clinical observation time annually' },
  { number: '90', label: 'day gaps', sub: 'Between medication adjustments' },
]

function AnimatedWave({ color = 'var(--coral)', height = 60, type = 'snapshot' }) {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth * 2
    canvas.height = height * 2
    ctx.scale(2, 2)

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, height)
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2

      const w = canvas.offsetWidth
      for (let x = 0; x < w; x++) {
        const progress = x / w
        let y
        if (type === 'snapshot') {
          const visible = progress > 0.45 && progress < 0.55
          if (visible) {
            y = height / 2 + Math.sin(progress * 40 + frame * 0.05) * 15
          } else {
            y = height / 2
            ctx.globalAlpha = 0.15
          }
        } else {
          y = height / 2 +
            Math.sin(progress * 8 + frame * 0.03) * 12 +
            Math.sin(progress * 15 + frame * 0.05) * 8 +
            Math.sin(progress * 30 + frame * 0.02) * 4
          ctx.globalAlpha = 0.8
        }
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.globalAlpha = 1
      frame++
      requestAnimationFrame(animate)
    }
    animate()
  }, [color, height, type])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: `${height}px`, display: 'block' }}
    />
  )
}

export default function Problem() {
  const sectionRef = useRef()
  const headerRef = useRef()
  const statsRef = useRef()
  const wavesRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(statsRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(wavesRef.current.children, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: wavesRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.to(headerRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="problem"
      ref={sectionRef}
      style={{
        padding: 'var(--section-pad) 0',
        background: 'var(--cream)',
        position: 'relative',
      }}
    >
      <div className="container">
        <div ref={headerRef} style={{ marginBottom: '48px', maxWidth: '700px' }}>
          <span style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--text-muted)',
            fontWeight: 500,
            marginBottom: '20px',
            display: 'block',
          }}>
            The Problem
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            Neurologists make 3-month decisions from 15-minute snapshots.
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            lineHeight: 1.7,
            marginTop: '20px',
          }}>
            A typical Parkinson's patient sees their neurologist four times a year.
            Each visit captures roughly 15 minutes of motor behavior. Medication
            decisions that affect the next 90 days are made from that sliver.
          </p>
        </div>

        <div ref={statsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '48px',
        }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: i === 0 ? 'var(--lavender-light)' : i === 1 ? 'var(--peach-light)' : i === 2 ? 'var(--cream-light)' : 'var(--coral-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.5rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '4px',
                lineHeight: 1,
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.4,
              }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        <div ref={wavesRef} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            padding: '36px',
            border: '1px solid rgba(0,0,0,0.06)',
          }}>
            <div style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--text-muted)',
              marginBottom: '20px',
              fontWeight: 500,
            }}>
              Current: Clinic Snapshot
            </div>
            <AnimatedWave color="var(--text-muted)" height={60} type="snapshot" />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '16px', lineHeight: 1.6 }}>
              Brief visibility window. Most tremor data is invisible.
            </p>
          </div>
          <div style={{
            background: 'var(--cream-light)',
            borderRadius: 'var(--radius-xl)',
            padding: '36px',
            border: '2px solid var(--coral)',
          }}>
            <div style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--coral)',
              marginBottom: '20px',
              fontWeight: 600,
            }}>
              TremoTrack: Continuous
            </div>
            <AnimatedWave color="var(--coral)" height={60} type="continuous" />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '16px', lineHeight: 1.6 }}>
              Full tremor signal. Every fluctuation captured.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
