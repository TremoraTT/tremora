import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ChromeObjects from '../components/ChromeObjects'

gsap.registerPlugin(ScrollTrigger)

const ctaObjects = [
  { type: 'pill', position: [-3, 1.5, 0], scale: 0.5, speed: 0.8 },
  { type: 'wristband', position: [3.2, -1, 0.5], scale: 0.6, speed: 1 },
]

export default function CTA() {
  const sectionRef = useRef()
  const headingRef = useRef()
  const formRef = useRef()
  const footerRef = useRef()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(formRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(footerRef.current, {
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="waitlist"
      ref={sectionRef}
      style={{
        padding: 'var(--section-pad) 0',
        background: 'var(--dark)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ChromeObjects objects={ctaObjects} />
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <div ref={headingRef} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            textTransform: 'uppercase',
            fontWeight: 900,
            color: 'var(--cream)',
            marginBottom: '24px',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}>
            Get TremoTrack before
            general availability.
          </div>

          <p style={{
            color: 'rgba(255,234,204,0.6)',
            fontSize: '1rem',
            marginBottom: '48px',
            lineHeight: 1.7,
          }}>
            Join our waitlist for early access to TremoTrack v1. We're looking for pilot participants,
            neurology partners, and anyone who believes tremor data should be continuous, not occasional.
          </p>

          <div ref={formRef}>
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  gap: '12px',
                  maxWidth: '480px',
                  margin: '0 auto 40px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{
                    flex: 1,
                    minWidth: '250px',
                    padding: '16px 24px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid rgba(255,234,204,0.15)',
                    background: 'rgba(255,255,255,0.06)',
                    color: 'var(--cream)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '16px 32px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--cream)',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    border: 'none',
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  Join Waitlist →
                </button>
              </form>
            ) : (
              <div style={{
                background: 'rgba(255,234,204,0.08)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                marginBottom: '40px',
                maxWidth: '480px',
                margin: '0 auto 40px',
              }}>
                <p style={{ color: 'var(--cream)', fontWeight: 600, fontSize: '1.1rem' }}>
                  You're on the list.
                </p>
                <p style={{ color: 'rgba(255,234,204,0.5)', fontSize: '0.85rem', marginTop: '6px' }}>
                  We'll reach out when early access opens.
                </p>
              </div>
            )}
          </div>

          <div style={{
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <a href="mailto:contact@tremora.com" style={{
              color: 'rgba(255,234,204,0.4)',
              fontSize: '0.85rem',
              transition: 'color 0.3s',
            }}>
              Partner Inquiry →
            </a>
            <a href="mailto:demo@tremora.com" style={{
              color: 'rgba(255,234,204,0.4)',
              fontSize: '0.85rem',
              transition: 'color 0.3s',
            }}>
              Request a Demo →
            </a>
          </div>

          <div ref={footerRef} style={{
            marginTop: '100px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255,234,204,0.06)',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              textTransform: 'uppercase',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,234,204,0.1)',
              lineHeight: 0.9,
              marginBottom: '28px',
              letterSpacing: '-0.03em',
            }}>
              Tremora
            </div>
            <p style={{
              color: 'rgba(255,234,204,0.3)',
              fontSize: '0.75rem',
              lineHeight: 1.6,
            }}>
              TremoTrack is early-stage clinical technology. Not FDA-cleared. Not a diagnostic device.
            </p>
            <p style={{
              color: 'rgba(255,255,255,0.15)',
              fontSize: '0.65rem',
              marginTop: '16px',
            }}>
              © 2026 Tremora. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
