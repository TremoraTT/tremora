import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../components/Button'
import { Highlight } from '../components/PerspectiveHighlight'
import DashboardMock from '../components/DashboardMock'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hero (slate-pro) — product-led SaaS composition. Centered value-prop headline
 * + CTAs up top, a wide dashboard preview anchored below (peeks past the fold
 * on the way into the page). The wordmark lives in the navbar.
 */
export default function Hero() {
  const sectionRef = useRef()
  const headRef = useRef()
  const subRef = useRef()
  const ctaRef = useRef()
  const visualRef = useRef()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.25 })
      tl.from(headRef.current, { y: 32, opacity: 0, duration: 0.95 })
        .from(subRef.current, { y: 22, opacity: 0, duration: 0.8 }, '-=0.6')
        .fromTo(ctaRef.current?.children || [], { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 }, '-=0.5')
        .from(visualRef.current, { y: 46, opacity: 0, scale: 0.97, duration: 1.1, ease: 'power4.out' }, '-=0.55')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="top" style={{
      position: 'relative', minHeight: '100dvh', background: 'var(--paper)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden',
      padding: 'clamp(112px, 15vh, 156px) clamp(20px, 5vw, 56px) 0',
    }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 8%, var(--hazard) 0%, transparent 60%)', opacity: 0.06, pointerEvents: 'none', zIndex: 0 }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(var(--grid-dot) 1.1px, transparent 1.5px)',
        backgroundSize: '46px 46px',
        maskImage: 'radial-gradient(110% 70% at 50% 0%, #000 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(110% 70% at 50% 0%, #000 20%, transparent 70%)',
      }} />

      {/* message */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 820, textAlign: 'center' }}>
        <h1 ref={headRef} style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ink)',
          fontSize: 'clamp(2.5rem, 5.2vw, 4.4rem)', lineHeight: 1.04, letterSpacing: '-0.035em',
          textTransform: 'none', margin: 0,
        }}>
          Continuous tremor data, built for <Highlight color="coral">neurology</Highlight>.
        </h1>

        <p ref={subRef} style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(1rem, 1.4vw, 1.18rem)', color: 'var(--text-secondary)',
          lineHeight: 1.6, textTransform: 'none', margin: '24px auto 0', maxWidth: '54ch',
        }}>
          Tremora streams 24/7 wrist-sensor signal into one neurologist dashboard, so care is not guided by a 15-minute snapshot.
        </p>

        <div ref={ctaRef} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 34 }}>
          <Button variant="primary" href="#waitlist">Join the waitlist</Button>
          <Button variant="secondary" href="#how-it-works">See how it works</Button>
        </div>
      </div>

      {/* wide product preview, peeks past the fold */}
      <div ref={visualRef} style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1000, marginTop: 'clamp(48px, 7vh, 84px)', willChange: 'transform, opacity' }}>
        <DashboardMock />
      </div>
    </section>
  )
}
