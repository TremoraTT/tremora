import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const privacyItems = [
  {
    icon: '◯',
    title: 'Data We Collect',
    text: 'Accelerometer data from the wrist sensor to compute tremor severity scores. Waitlist signups collect email only. No names, locations, or PII beyond motion readings.',
  },
  {
    icon: '◈',
    title: 'How We Use It',
    text: 'Sensor data processed on-device. Aggregated severity scores transmitted to neurologist dashboard only if patient opts in. We never sell or monetize patient data.',
  },
  {
    icon: '◇',
    title: 'Storage & Security',
    text: 'Raw data stored locally via SPIFFS, exportable as CSV. Cloud transmission uses TLS 1.3. We follow HIPAA-aligned security practices for all data handling.',
  },
  {
    icon: '△',
    title: 'Your Rights',
    text: 'Request deletion anytime at privacy@tremora.com. Unsubscribe instantly via email link. Device data wipeable locally via reset function.',
  },
]

export default function Privacy() {
  const sectionRef = useRef()
  const headerRef = useRef()
  const gridRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      const cards = gridRef.current.children
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="privacy"
      ref={sectionRef}
      style={{
        padding: 'var(--section-pad) 0',
        background: 'var(--cream-light)',
      }}
    >
      <div className="container">
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--text-muted)',
            fontWeight: 500,
            marginBottom: '20px',
            display: 'block',
          }}>
            Privacy & Security
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
            marginBottom: '20px',
          }}>
            Your data, your control.
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.7,
            fontSize: '0.95rem',
          }}>
            Privacy isn't a feature — it's the architecture. On-device processing means your tremor data never leaves your wrist unless you say so.
          </p>
        </div>

        <div ref={gridRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {privacyItems.map((item, i) => (
            <div
              key={i}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: '40px',
                border: '1px solid rgba(0,0,0,0.04)',
                transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                fontSize: '1.4rem',
                marginBottom: '16px',
                color: 'var(--coral)',
                opacity: 0.7,
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                marginBottom: '12px',
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          marginTop: '48px',
          fontStyle: 'italic',
        }}>
          Last updated May 2026. TremoTrack is pre-clinical technology, not subject to FDA regulation at this stage.
        </p>
      </div>
    </section>
  )
}
