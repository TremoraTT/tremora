import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Capture',
    description: 'A wrist-worn sensor samples tremor movement at 200Hz continuously throughout the day.',
    techTags: ['MPU-6050 IMU', '6-axis sensing', '200Hz sampling'],
    visual: 'waveform',
    bg: 'var(--dark-surface)',
  },
  {
    number: '02',
    title: 'Score',
    description: 'On-device signal processing with FFT analysis and a trained classifier scores tremor severity in real time.',
    techTags: ['FFT analysis', 'Random Forest', 'UPDRS proxy', 'Med logging'],
    visual: 'processing',
    bg: 'var(--dark-elevated)',
  },
  {
    number: '03',
    title: 'Reveal',
    description: 'A neurologist dashboard surfaces weeks of patterns, showing how tremor responds to each medication dose.',
    techTags: ['Medication response', 'Severity timeline', 'Clinical summary'],
    visual: 'dashboard',
    bg: 'var(--dark-surface)',
  },
]

function StepVisual({ type }) {
  return (
    <div style={{
      width: '100%',
      height: '220px',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,234,204,0.08)',
    }}>
      {type === 'waveform' && (
        <svg viewBox="0 0 200 60" style={{ width: '80%', height: '50%' }}>
          <path
            d="M0,30 Q10,10 20,30 T40,30 T60,30 Q70,5 80,30 T100,30 T120,30 Q130,8 140,30 T160,30 T180,30 T200,30"
            fill="none"
            stroke="var(--coral)"
            strokeWidth="2"
          >
            <animate attributeName="d"
              values="M0,30 Q10,10 20,30 T40,30 T60,30 Q70,5 80,30 T100,30 T120,30 Q130,8 140,30 T160,30 T180,30 T200,30;M0,30 Q10,20 20,30 T40,30 T60,30 Q70,15 80,30 T100,30 T120,30 Q130,18 140,30 T160,30 T180,30 T200,30;M0,30 Q10,10 20,30 T40,30 T60,30 Q70,5 80,30 T100,30 T120,30 Q130,8 140,30 T160,30 T180,30 T200,30"
              dur="3s" repeatCount="indefinite" />
          </path>
        </svg>
      )}
      {type === 'processing' && (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '60%' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [20, 40 + Math.random() * 60, 20] }}
              transition={{ repeat: Infinity, duration: 1.5 + Math.random(), delay: i * 0.05 }}
              style={{
                width: '6px',
                background: `linear-gradient(to top, var(--coral), var(--peach))`,
                borderRadius: '3px',
              }}
            />
          ))}
        </div>
      )}
      {type === 'dashboard' && (
        <div style={{ padding: '24px', width: '100%' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {['UPDRS: 2.3', 'Peak: 5.2Hz', 'Tremor: 34%'].map((label, i) => (
              <div key={i} style={{
                background: 'rgba(255,234,204,0.08)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.65rem',
                fontWeight: 600,
                color: 'var(--cream)',
              }}>
                {label}
              </div>
            ))}
          </div>
          <div style={{
            height: '90px',
            background: 'rgba(255,234,204,0.06)',
            borderRadius: '12px',
            padding: '16px',
            position: 'relative',
          }}>
            <svg viewBox="0 0 300 50" style={{ width: '100%', height: '100%' }}>
              <path d="M0,40 L30,35 L60,25 L90,30 L120,15 L150,20 L180,10 L210,18 L240,12 L270,8 L300,15" fill="none" stroke="var(--coral)" strokeWidth="2" />
              <line x1="120" y1="0" x2="120" y2="50" stroke="var(--peach)" strokeWidth="1" strokeDasharray="3,3" />
              <text x="122" y="48" fill="var(--peach)" fontSize="6">Med taken</text>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

export default function HowItWorks() {
  const sectionRef = useRef()
  const headerRef = useRef()
  const stepsRef = useRef()

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

      const cards = stepsRef.current.children
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      Array.from(cards).forEach((card) => {
        gsap.to(card, {
          y: -15,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      style={{
        padding: 'var(--section-pad) 0',
        background: 'var(--dark)',
      }}
    >
      <div className="container">
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(255,234,204,0.4)',
            fontWeight: 500,
            marginBottom: '20px',
            display: 'block',
          }}>
            How It Works
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--cream)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            From wrist to neurologist
            in three steps.
          </h2>
        </div>

        <div ref={stepsRef} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                background: step.bg,
                borderRadius: 'var(--radius-xl)',
                padding: '48px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
                alignItems: 'center',
                border: '1px solid rgba(255,234,204,0.04)',
              }}
            >
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '5rem',
                  fontWeight: 800,
                  color: 'var(--coral)',
                  opacity: 0.3,
                  lineHeight: 1,
                  marginBottom: '0',
                }}>
                  {step.number}
                </div>
                <h3 style={{
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  color: 'var(--cream)',
                  marginBottom: '16px',
                  marginTop: '-8px',
                  letterSpacing: '-0.02em',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: 'rgba(255,234,204,0.6)',
                  fontSize: '1rem',
                  marginBottom: '24px',
                  maxWidth: '420px',
                  lineHeight: 1.7,
                }}>
                  {step.description}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {step.techTags.map((tag, j) => (
                    <span key={j} style={{
                      fontSize: '0.7rem',
                      padding: '5px 14px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'rgba(255,234,204,0.08)',
                      color: 'rgba(255,234,204,0.7)',
                      fontWeight: 500,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <StepVisual type={step.visual} />
              </div>
            </div>
          ))}
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'rgba(255,234,204,0.3)',
          marginTop: '48px',
          fontStyle: 'italic',
        }}>
          All severity scores are algorithmic proxies intended to support, not replace, clinical judgment.
        </p>
      </div>
    </section>
  )
}
