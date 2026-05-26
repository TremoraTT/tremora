import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Privacy() {
  const sectionRef = useRef()
  const contentRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      const sections = contentRef.current.querySelectorAll('.privacy-block')
      gsap.from(sections, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 75%',
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
        background: 'white',
      }}
    >
      <div className="container">
        <div ref={contentRef} style={{ maxWidth: '720px' }}>
          <span style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--text-muted)',
            fontWeight: 500,
            marginBottom: '20px',
            display: 'block',
          }}>
            Legal
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
            marginBottom: '40px',
          }}>
            Privacy Policy
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.8,
          }}>
            <div className="privacy-block">
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px',
              }}>
                Data We Collect
              </h3>
              <p>
                TremoTrack collects accelerometer data from the wrist-worn sensor to compute
                tremor severity scores. Waitlist signups collect your email address only.
                We do not collect names, locations, or any personally identifiable health data
                beyond motion sensor readings.
              </p>
            </div>

            <div className="privacy-block">
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px',
              }}>
                How We Use It
              </h3>
              <p>
                Sensor data is processed on-device. Aggregated severity scores may be transmitted
                to the neurologist dashboard if the patient opts in. We never sell, share, or
                monetize patient data. Email addresses are used solely for waitlist communication.
              </p>
            </div>

            <div className="privacy-block">
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px',
              }}>
                Data Storage & Security
              </h3>
              <p>
                Raw accelerometer data is stored locally on-device via SPIFFS and can be
                exported as CSV. Cloud-transmitted data (when opted in) uses TLS 1.3 encryption.
                We follow HIPAA-aligned security practices for all data handling.
              </p>
            </div>

            <div className="privacy-block">
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px',
              }}>
                Your Rights
              </h3>
              <p>
                You can request deletion of all your data at any time by emailing
                privacy@tremora.com. You can opt out of the waitlist instantly via
                the unsubscribe link in any email. Device data can be wiped locally
                at any time via the reset function.
              </p>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '16px' }}>
              Last updated: May 2026. TremoTrack is pre-clinical technology and is not
              subject to FDA regulation at this stage. This policy will be updated as
              the product advances toward clinical use.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
