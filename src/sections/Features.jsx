import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation, Keyboard, Mousewheel } from 'swiper/modules'
import { useCountUp } from '../hooks/useCountUp'
import Reveal from '../components/Reveal'
import { SliderArrows, injectSliderCSS } from '../components/Slider'

injectSliderCSS()

const features = [
  {
    stat: '<50ms', statLabel: 'inference time', title: 'On-Device ML',
    description: 'Random Forest classifier runs entirely on the ESP32. No cloud, no latency, no data exposure — tremor scored at the wrist.',
    detail: 'Trained on 2,400+ labeled tremor windows from clinical accelerometer datasets. Compressed to fit 520KB SRAM.',
    tags: ['Edge AI', 'Privacy-first', 'Real-time'],
    bg: 'linear-gradient(150deg, var(--lavender-light), var(--lavender))',
  },
  {
    stat: '4-6Hz', statLabel: 'tremor band', title: 'FFT Signal Analysis',
    description: 'Fast Fourier Transform isolates the Parkinsonian tremor band from noise, separating rest tremor from voluntary movement.',
    detail: 'Sliding 256-sample Hamming window at 200Hz. Power spectral density across 3-8Hz at 0.78Hz resolution.',
    tags: ['Spectral', 'Band isolation', 'Noise filtering'],
    bg: 'linear-gradient(150deg, var(--peach-light), var(--peach))',
  },
  {
    stat: '0-4', statLabel: 'severity scale', title: 'UPDRS Proxy Score',
    description: 'Maps sensor data to the clinical UPDRS tremor subscale — a familiar metric, without in-person observation.',
    detail: 'Regression maps RMS amplitude + dominant frequency + spectral entropy to UPDRS Item 3.15-3.18 equivalents.',
    tags: ['Clinical standard', 'Continuous', 'Validated'],
    bg: 'linear-gradient(150deg, var(--cream-light), var(--cream))',
  },
  {
    stat: '1-press', statLabel: 'dose capture', title: 'Medication Logging',
    description: 'A physical button logs exact medication timing, building before/after tremor response curves for every dose.',
    detail: 'Timestamps stored at ±50ms precision. The dashboard overlays dose events on the severity timeline automatically.',
    tags: ['Dose tracking', 'Response curves', 'Adherence'],
    bg: 'linear-gradient(150deg, var(--coral-light), rgba(251,79,98,0.35))',
  },
  {
    stat: '24/7', statLabel: 'monitoring', title: 'Continuous Data',
    description: '200Hz sampling runs all day. SPIFFS logs raw CSV per session. Weeks of tremor data visible between visits.',
    detail: 'A 2000mAh LiPo gives ~18hr active recording, auto-segmented into sleep/wake sessions for clinical relevance.',
    tags: ['Always-on', 'CSV export', 'Multi-week'],
    bg: 'linear-gradient(150deg, var(--lavender-light), var(--peach-light))',
  },
  {
    stat: 'Live', statLabel: 'data sync', title: 'Neurologist Dashboard',
    description: 'A web dashboard surfaces weeks of tremor patterns with auto-generated severity reports, ready for clinical review.',
    detail: 'BLE sync to companion app → cloud API → provider dashboard. HIPAA-aligned encryption at rest and in transit.',
    tags: ['Provider portal', 'Auto-reports', 'HIPAA-aligned'],
    bg: 'linear-gradient(150deg, var(--cream-light), var(--lavender-light))',
  },
]

function Stat({ display }) {
  const { ref, value } = useCountUp(display)
  return <span ref={ref}>{value}</span>
}

export default function Features() {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <section id="features" className="theme-dark" style={{ background: 'var(--dark)', padding: 'var(--section-pad) 0', overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <Reveal as="span" variant="fade" style={{
              fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em',
              color: 'rgba(255,234,204,0.45)', fontWeight: 500, marginBottom: '18px', display: 'block',
            }}>Technology</Reveal>
            <Reveal as="h2" variant="lines" duration={0.9} style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 6vw, 4.6rem)',
              color: 'var(--cream)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 0.95, margin: 0,
            }}>Six systems. One wrist.</Reveal>
          </div>
          <Reveal style={{ color: 'rgba(255,234,204,0.5)', maxWidth: '320px', lineHeight: 1.7, fontSize: '0.9rem' }}>
            Every engineering decision optimized for one outcome: continuous tremor data a neurologist can act on. Drag, scroll, or use the arrows.
          </Reveal>
        </div>
      </div>

      <Swiper
        modules={[EffectCoverflow, Navigation, Keyboard, Mousewheel]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        keyboard={{ enabled: true }}
        mousewheel={{ forceToAxis: true, sensitivity: 0.6 }}
        coverflowEffect={{ rotate: 8, stretch: 0, depth: 220, modifier: 1.1, slideShadows: false }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(s) => { s.params.navigation.prevEl = prevRef.current; s.params.navigation.nextEl = nextRef.current }}
        style={{ padding: '20px 0 8px', overflow: 'visible' }}
      >
        {features.map((f, i) => (
          <SwiperSlide key={i} style={{ width: 'min(420px, 82vw)', height: 'auto' }}>
            <article style={{
              background: f.bg, borderRadius: 'var(--radius-xl)', padding: '40px 36px',
              minHeight: '440px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              boxShadow: '0 30px 70px rgba(0,0,0,0.35)',
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '4.2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, opacity: 0.92 }}>
                  <Stat display={f.stat} />
                </div>
                <div style={{ fontSize: '0.66rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: '4px', marginBottom: '26px' }}>
                  {f.statLabel}
                </div>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '14px', lineHeight: 1.05 }}>{f.title}</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '12px' }}>{f.description}</p>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.55, fontStyle: 'italic', marginBottom: '20px' }}>{f.detail}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {f.tags.map((t, j) => (
                    <span key={j} style={{ fontSize: '0.6rem', padding: '5px 12px', borderRadius: 'var(--radius-pill)', background: 'rgba(26,26,26,0.08)', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ position: 'absolute', top: '18px', right: '22px', fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--text-muted)', opacity: 0.5, letterSpacing: '0.1em' }}>
                FIG {String(i + 1).padStart(2, '0')}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
        <SliderArrows prevRef={prevRef} nextRef={nextRef} theme="light" />
      </div>
    </section>
  )
}
