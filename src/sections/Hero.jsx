import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../components/Button'
import ChromeObjects from '../components/ChromeObjects'

gsap.registerPlugin(ScrollTrigger)

const heroObjects = [
  { type: 'pill', position: [-3.5, 1.8, -0.5], scale: 0.45, speed: 0.7 },
  { type: 'torus', position: [3.8, -1.5, -0.3], scale: 0.5, speed: 0.5 },
  { type: 'pulse', position: [-3.2, -2, -0.8], scale: 0.35, speed: 0.6 },
  { type: 'brain', position: [3.5, 2, -0.6], scale: 0.35, speed: 0.4 },
]

export default function Hero() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()
  const lineRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = titleRef.current.querySelectorAll('.hero-letter')
      gsap.from(letters, {
        y: 120,
        opacity: 0,
        rotateX: -90,
        duration: 1.2,
        stagger: 0.04,
        ease: 'power4.out',
        delay: 0.1,
      })

      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 0.6,
      })

      gsap.from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.7,
      })

      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.9,
      })

      gsap.to(titleRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(subtitleRef.current, {
        y: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '25% top',
          end: '70% top',
          scrub: 1,
        },
      })

      gsap.to(ctaRef.current, {
        y: -30,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '25% top',
          end: '60% top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'var(--cream)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <ChromeObjects objects={heroObjects} />

      <div style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        maxWidth: '1000px',
        padding: '0 24px',
      }}>
        <div ref={titleRef} style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 15vw, 13rem)',
          fontWeight: 400,
          color: 'var(--text-primary)',
          lineHeight: 0.9,
          marginBottom: '32px',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          perspective: '600px',
          overflow: 'hidden',
        }}>
          {'TREMORA'.split('').map((char, i) => (
            <span
              key={i}
              className="hero-letter"
              style={{
                display: 'inline-block',
                transformOrigin: 'bottom center',
              }}
            >
              {char}
            </span>
          ))}
        </div>

        <div
          ref={lineRef}
          style={{
            width: '60px',
            height: '2px',
            background: 'var(--coral)',
            margin: '0 auto 32px',
            transformOrigin: 'left center',
          }}
        />

        <p ref={subtitleRef} style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
          color: 'var(--text-secondary)',
          marginBottom: '40px',
          fontWeight: 400,
          lineHeight: 1.6,
          maxWidth: '520px',
          margin: '0 auto 40px',
        }}>
          A wrist-worn sensor that tracks Parkinson's tremor severity 24/7,
          scores it with a trained classifier, and shows neurologists what
          happens between visits.
        </p>

        <div ref={ctaRef} style={{
          display: 'flex',
          gap: '14px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <Button variant="primary" href="#how-it-works">
            See How It Works
          </Button>
          <Button variant="secondary" href="#waitlist">
            Join Waitlist
          </Button>
        </div>
      </div>
    </section>
  )
}
