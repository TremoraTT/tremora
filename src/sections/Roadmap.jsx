import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Keyboard, Mousewheel } from 'swiper/modules'
import Reveal from '../components/Reveal'
import { SliderArrows, injectSliderCSS } from '../components/Slider'

injectSliderCSS()

const cards = [
  { title: 'Neurologist Dashboard', description: 'Weeks of tremor data, medication-response analytics, and auto-generated clinical summaries in one interface.', detail: 'Severity heatmaps, dose-response overlays, exportable PDF visit reports.', quarter: 'Q3 2026', status: 'In Development', statusColor: 'var(--coral)' },
  { title: 'Clinical Validation', description: 'A pilot study with neurology partners to validate UPDRS-proxy accuracy against in-clinic assessment.', detail: 'Target: n=30 patients, Bland-Altman agreement vs. clinical UPDRS scoring.', quarter: 'Q4 2026', status: 'Planned', statusColor: 'var(--peach)' },
  { title: 'Partner Platform', description: 'API and integration layer for neurology practices, enabling Medicare RPM billing (CPT 99453/99454).', detail: 'Reimbursable remote monitoring — up to ~$120/patient/month recurring.', quarter: 'Q1 2027', status: 'In Development', statusColor: 'var(--coral)' },
  { title: 'Med Response Analytics', description: 'Before-vs-after scoring for every dose, revealing which medications are actually working.', detail: 'Auto-detects wearing-off periods and dyskinesia windows from tremor curves.', quarter: 'Q2 2027', status: 'In Development', statusColor: 'var(--coral)' },
  { title: 'Pilot Program', description: "Early access for neurology practices and Parkinson's patients. Limited spots available.", detail: 'First 50 devices shipping to design partners. Join the waitlist below.', quarter: 'Open now', status: 'Coming Soon', statusColor: '#22c55e' },
]

const cardBg = ['var(--lavender-light)', 'var(--peach-light)', 'var(--cream-light)', 'var(--lavender-light)', 'var(--coral-light)']

export default function Roadmap() {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [idx, setIdx] = useState(1)

  return (
    <section id="roadmap" style={{ background: 'var(--cream)', padding: 'var(--section-pad) 0', overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <Reveal as="span" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '18px', display: 'block' }}>What's Next</Reveal>
            <Reveal as="h2" variant="lines" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 6vw, 4.6rem)', color: 'var(--text-primary)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 0.95, margin: 0 }}>
              The road from here.
            </Reveal>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>
              {String(idx).padStart(2, '0')} <span style={{ color: 'var(--text-muted)' }}>/ {String(cards.length).padStart(2, '0')}</span>
            </span>
            <div className="hide-mobile"><SliderArrows prevRef={prevRef} nextRef={nextRef} theme="dark" /></div>
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Keyboard, Mousewheel]}
        grabCursor
        slidesPerView={1.1}
        spaceBetween={20}
        keyboard={{ enabled: true }}
        mousewheel={{ forceToAxis: true, sensitivity: 0.6 }}
        breakpoints={{ 600: { slidesPerView: 1.6 }, 900: { slidesPerView: 2.2 }, 1300: { slidesPerView: 2.6 } }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(s) => { s.params.navigation.prevEl = prevRef.current; s.params.navigation.nextEl = nextRef.current }}
        onSlideChange={(s) => setIdx(s.activeIndex + 1)}
        style={{ paddingLeft: 'max(24px, calc((100vw - 1200px) / 2))', paddingRight: 'max(24px, calc((100vw - 1200px) / 2))' }}
      >
        {cards.map((c, i) => (
          <SwiperSlide key={i} style={{ height: 'auto' }}>
            <article style={{ background: cardBg[i], borderRadius: 'var(--radius-xl)', padding: '44px', minHeight: '360px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.1, maxWidth: '230px' }}>{c.title}</h3>
                <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '6px 14px', borderRadius: 'var(--radius-pill)', background: 'rgba(26,26,26,0.07)', color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.statusColor }} />{c.status}
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '16px' }}>{c.description}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.55, fontStyle: 'italic', paddingTop: '16px', borderTop: '1px solid rgba(26,26,26,0.09)', marginBottom: '24px' }}>{c.detail}</p>
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.quarter}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{String(i + 1).padStart(2, '0')} / 05</span>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
