import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  'Replicated Saez et al. ELENA methodology on real accelerometer data',
  'Random Forest classifier — 86.4% accuracy on UPDRS tremor subscale',
  'On-device inference in <50ms per window (ESP32, no cloud dependency)',
  'Accepted to Atlanta Startup Village — presenting July 27, 2026',
  'Pilot study partnership in discussion with UNC Chapel Hill neurology',
]

export default function Team() {
  const sectionRef = useRef()
  const leftRef = useRef()
  const rightRef = useRef()
  const milestonesRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      const items = milestonesRef.current.children
      gsap.from(items, {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: milestonesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.to(leftRef.current, {
        y: -25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom top',
          scrub: 2,
        },
      })

      gsap.to(rightRef.current, {
        y: -15,
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
      id="team"
      ref={sectionRef}
      style={{
        padding: 'var(--section-pad) 0',
        background: 'var(--dark)',
      }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>
          <div ref={leftRef}>
            <span style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'rgba(255,234,204,0.4)',
              fontWeight: 500,
              marginBottom: '20px',
              display: 'block',
            }}>
              Our Story
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--cream)',
              marginBottom: '28px',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>
              Student builders.<br />
              Real medical impact.
            </h2>
            <p style={{
              color: 'rgba(255,234,204,0.6)',
              fontSize: '1rem',
              lineHeight: 1.8,
              marginBottom: '20px',
            }}>
              Tremora was founded by high school engineers who saw a gap between what neurologists need and what technology offers. We are building TremoTrack not as a school project, but as a platform that can change how Parkinson's disease is monitored at home.
            </p>
            <p style={{
              color: 'rgba(255,234,204,0.6)',
              fontSize: '1rem',
              lineHeight: 1.8,
              marginBottom: '36px',
            }}>
              Every firmware line, every signal processing decision, every hardware choice is driven by one question: does this give neurologists better data for their patients?
            </p>

            <div style={{
              background: 'var(--dark-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              border: '1px solid rgba(255,234,204,0.06)',
            }}>
              <div style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(255,234,204,0.4)',
                marginBottom: '18px',
                fontWeight: 500,
              }}>
                Proof Points
              </div>
              <div ref={milestonesRef}>
                {milestones.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 0',
                      borderBottom: i < milestones.length - 1 ? '1px solid rgba(255,234,204,0.06)' : 'none',
                    }}
                  >
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--coral)',
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,234,204,0.8)' }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div ref={rightRef} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}>
            <div style={{
              width: '100%',
              aspectRatio: '4/5',
              background: 'linear-gradient(145deg, var(--dark-surface), var(--dark-elevated))',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ textAlign: 'center', zIndex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  textTransform: 'uppercase',
                  fontWeight: 900,
                  color: 'var(--cream)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em',
                  opacity: 0.08,
                }}>
                  Tremora
                </div>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255,234,204,0.5)',
                  marginTop: '12px',
                  fontWeight: 500,
                }}>
                  Making tremor data visible.
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}>
              <div style={{
                background: 'var(--dark-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                textAlign: 'center',
                border: '1px solid rgba(255,234,204,0.06)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', letterSpacing: '-0.02em', fontWeight: 800, color: 'var(--coral)', lineHeight: 1 }}>
                  86.4%
                </div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,234,204,0.5)', marginTop: '6px' }}>
                  Classifier accuracy
                </div>
              </div>
              <div style={{
                background: 'var(--dark-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                textAlign: 'center',
                border: '1px solid rgba(255,234,204,0.06)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', letterSpacing: '-0.02em', fontWeight: 800, color: 'var(--coral)', lineHeight: 1 }}>
                  200Hz
                </div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,234,204,0.5)', marginTop: '6px' }}>
                  Sampling rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
