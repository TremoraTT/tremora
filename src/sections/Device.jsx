import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, Keyboard } from 'swiper/modules'
import { useCountUp } from '../hooks/useCountUp'
import Reveal from '../components/Reveal'
import { SliderArrows, injectSliderCSS } from '../components/Slider'

injectSliderCSS()

const cards = [
  { kind: 'intro', label: 'Tremora v1', desc: 'A wrist-worn module, ~50×30×12mm. Six subsystems, one purpose: clinical-grade tremor data, continuously.', accent: 'var(--coral)' },
  { n: '01', label: 'ESP32-WROOM-32', desc: 'Dual-core MCU with Wi-Fi + BLE. Runs the classifier and streams to the companion app.', accent: 'var(--lavender)' },
  { n: '02', label: 'MPU-6050 IMU', desc: '6-axis motion sensing at 200Hz. The raw accelerometer + gyro signal every tremor reading is built from.', accent: 'var(--peach)' },
  { n: '03', label: 'Random Forest', desc: '86.4% accuracy, on-device inference. Scores tremor severity in <50ms per window — no cloud round-trip.', accent: 'var(--coral-light)' },
  { n: '04', label: 'TP4056 + LiPo', desc: '2000mAh, USB-C rechargeable. ~18 hours of active recording per charge.', accent: 'var(--cream)' },
  { n: '05', label: 'SPIFFS Storage', desc: 'Per-session CSV logging on flash. Weeks of raw data retained for export and review.', accent: 'var(--peach-light)' },
  { n: '06', label: 'Med Button', desc: 'One-press dose-event logging. Builds the before/after response curve for every medication.', accent: 'var(--lavender-light)' },
]

const prices = [
  { v: '$199', l: 'Target consumer price' },
  { v: '~$60', l: 'BOM at 1k units' },
  { v: '~70%', l: 'Gross margin' },
]

function Price({ v }) {
  const { ref, value } = useCountUp(v)
  return <span ref={ref}>{value}</span>
}

export default function Device() {
  const swiperRef = useRef(null)

  return (
    <section id="device" style={{ background: 'var(--cream)', padding: 'var(--section-pad) 0', overflow: 'hidden' }}>
      <div className="container">
        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          {/* Left: heading + price stats */}
          <div>
            <Reveal as="span" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '18px', display: 'block' }}>The Hardware</Reveal>
            <Reveal as="h2" variant="lines" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)', color: 'var(--text-primary)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '22px' }}>
              What's inside the band.
            </Reveal>
            <Reveal style={{ color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '36px' }}>
              Purpose-built hardware for continuous monitoring. Swipe the deck — every component was chosen for clinical-grade data quality.
            </Reveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', maxWidth: '440px' }}>
              {prices.map((p, i) => (
                <Reveal key={i} delay={i * 0.08} style={{ textAlign: 'center', padding: '22px 12px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}><Price v={p.v} /></div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '7px', lineHeight: 1.3 }}>{p.l}</div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: EffectCards flick deck */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <Swiper
              modules={[EffectCards, Keyboard]}
              effect="cards"
              grabCursor
              keyboard={{ enabled: true }}
              cardsEffect={{ perSlideOffset: 9, perSlideRotate: 3, slideShadows: false }}
              onSwiper={(s) => { swiperRef.current = s }}
              style={{ width: 'min(330px, 80vw)', height: '420px' }}
            >
              {cards.map((c, i) => (
                <SwiperSlide key={i} data-cursor-text="Drag">
                  <div style={{
                    width: '100%', height: '100%', padding: '34px 30px',
                    background: c.kind === 'intro'
                      ? 'linear-gradient(155deg, var(--dark-surface), var(--dark))'
                      : 'white',
                    color: c.kind === 'intro' ? 'var(--cream)' : 'var(--text-primary)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: c.accent, opacity: c.kind === 'intro' ? 1 : 0.9, boxShadow: `0 8px 24px ${c.kind === 'intro' ? 'rgba(251,79,98,0.4)' : 'rgba(0,0,0,0.08)'}` }} />
                      {c.n && <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: c.kind === 'intro' ? 'var(--cream)' : 'var(--text-muted)', opacity: 0.5, letterSpacing: '0.05em' }}>{c.n}</span>}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: c.kind === 'intro' ? '2.2rem' : '1.7rem', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: '14px' }}>{c.label}</h3>
                      <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: c.kind === 'intro' ? 'rgba(255,234,204,0.6)' : 'var(--text-secondary)' }}>{c.desc}</p>
                    </div>
                    <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.14em', opacity: 0.5 }}>
                      {c.kind === 'intro' ? 'Swipe to explore →' : `Component ${c.n} / 06`}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <SliderArrows theme="dark" onPrev={() => swiperRef.current?.slidePrev()} onNext={() => swiperRef.current?.slideNext()} />
          </div>
        </div>
      </div>
    </section>
  )
}
