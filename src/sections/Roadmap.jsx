import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: 'Neurologist Dashboard',
    description: 'Weeks of tremor data, medication response analytics, and auto-generated clinical summaries in one interface.',
    status: 'In Development',
    bg: 'var(--lavender-light)',
  },
  {
    title: 'Clinical Validation',
    description: 'Pilot study with neurology partners to validate UPDRS proxy accuracy against clinical assessment.',
    status: 'Planned',
    bg: 'var(--peach-light)',
  },
  {
    title: 'Partner Platform',
    description: 'API and integration layer for neurology practices, enabling Medicare RPM billing (CPT 99453/99454).',
    status: 'In Development',
    bg: 'var(--cream-light)',
  },
  {
    title: 'Medication Response Analytics',
    description: 'Before-vs-after scoring for every dose, revealing which medications are actually working.',
    status: 'In Development',
    bg: 'var(--lavender-light)',
  },
  {
    title: 'Pilot Program',
    description: 'Early access for neurology practices and Parkinson\'s patients. Limited spots available.',
    status: 'Coming Soon',
    bg: 'var(--coral-light)',
  },
]

export default function Roadmap() {
  const sectionRef = useRef()
  const headerRef = useRef()
  const trackRef = useRef()
  const wrapperRef = useRef()

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

      const track = trackRef.current
      const totalScroll = track.scrollWidth - track.offsetWidth

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 20%',
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      style={{
        background: 'var(--cream)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ paddingTop: 'var(--section-pad)' }}>
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
            What's Next
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            Building in public.
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            margin: '20px auto 0',
            lineHeight: 1.7,
          }}>
            TremoTrack is early-stage clinical technology. Here's what we're working on next.
          </p>
        </div>
      </div>

      <div ref={wrapperRef} style={{ paddingBottom: 'var(--section-pad)' }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '24px',
            paddingLeft: 'max(24px, calc((100vw - 1200px) / 2))',
            paddingRight: '48px',
            width: 'max-content',
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                background: card.bg,
                borderRadius: '20px',
                padding: '40px',
                width: '360px',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px',
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  maxWidth: '200px',
                }}>
                  {card.title}
                </h3>
                <span style={{
                  fontSize: '0.6rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(26,26,26,0.06)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}>
                  {card.status}
                </span>
              </div>

              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}>
                {card.description}
              </p>

              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '40px',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.1em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
