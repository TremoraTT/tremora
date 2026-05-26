import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const components = [
  { label: 'ESP32-WROOM-32', desc: 'Dual-core MCU with Wi-Fi/BLE', x: '12%', y: '22%' },
  { label: 'MPU-6050 IMU', desc: '6-axis motion sensing at 200Hz', x: '78%', y: '18%' },
  { label: 'Random Forest', desc: '86.4% accuracy, on-device inference', x: '15%', y: '52%' },
  { label: 'TP4056 + LiPo', desc: '2000mAh, USB-C rechargeable', x: '75%', y: '55%' },
  { label: 'SPIFFS Storage', desc: 'Per-session CSV data logging', x: '12%', y: '80%' },
  { label: 'Med Button', desc: 'One-press dose event logging', x: '78%', y: '82%' },
]

export default function Device() {
  const sectionRef = useRef()
  const headerRef = useRef()
  const diagramRef = useRef()
  const statsRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(diagramRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: diagramRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      const chips = diagramRef.current.querySelectorAll('.device-chip')
      gsap.from(chips, {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: diagramRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(statsRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.to(diagramRef.current, {
        y: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom top',
          scrub: 2,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="device"
      ref={sectionRef}
      style={{
        padding: 'var(--section-pad) 0',
        background: 'var(--cream)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--text-muted)',
            fontWeight: 500,
            marginBottom: '20px',
            display: 'block',
          }}>
            The Device
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            What's inside<br />TremoTrack v1.
          </h2>
        </div>

        <div
          ref={diagramRef}
          style={{
            position: 'relative',
            maxWidth: '800px',
            margin: '0 auto',
            minHeight: '480px',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '260px',
            background: 'linear-gradient(145deg, var(--lavender), var(--peach-light))',
            borderRadius: 'var(--radius-xl)',
            boxShadow: '0 24px 80px rgba(249,150,103,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '12px',
            zIndex: 2,
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--coral)',
              opacity: 0.9,
            }} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}>
              TremoTrack v1
            </span>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>
              ~50×30×12mm
            </span>
          </div>

          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '320px',
            height: '320px',
            border: '1px solid rgba(26,26,26,0.06)',
            borderRadius: '50%',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '440px',
            height: '440px',
            border: '1px solid rgba(26,26,26,0.04)',
            borderRadius: '50%',
          }} />

          {components.map((comp, i) => (
            <div
              key={i}
              className="device-chip"
              style={{
                position: 'absolute',
                left: comp.x,
                top: comp.y,
                transform: 'translate(-50%, -50%)',
                background: 'white',
                borderRadius: '12px',
                padding: '14px 18px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                maxWidth: '170px',
                zIndex: 3,
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '3px',
              }}>
                {comp.label}
              </div>
              <div style={{
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                lineHeight: 1.4,
              }}>
                {comp.desc}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '72px',
            maxWidth: '700px',
            margin: '72px auto 0',
          }}
        >
          {[
            { value: '$199', label: 'Target consumer price' },
            { value: '~$60', label: 'BOM at 1k units' },
            { value: '~70%', label: 'Gross margin' },
          ].map((item, i) => (
            <div key={i} style={{
              textAlign: 'center',
              padding: '28px 20px',
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                letterSpacing: '-0.02em',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1,
              }}>
                {item.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
