/**
 * Slider — shared Swiper nav arrows (Hildén & Kaira arrow glyph) + one-time CSS
 * for slide auto-sizing, disabled state, and EffectCards tuning. House ease.
 */
const ARROW = 'M15.444 20.34L13.248 18.252L19.368 11.736H0V8.64H19.368L13.248 2.088L15.444 0L24.876 10.188L15.444 20.34Z'

export function injectSliderCSS() {
  if (typeof document === 'undefined' || document.getElementById('tm-slider-css')) return
  const s = document.createElement('style')
  s.id = 'tm-slider-css'
  s.textContent = `
  .swiper{ width:100%; }
  .swiper-slide{ height:auto; }
  .tm-arrows{ display:flex; gap:12px; }
  .tm-arrow{
    width:54px; height:54px; border-radius:var(--radius-pill);
    display:flex; align-items:center; justify-content:center; cursor:pointer;
    border:1px solid; background:transparent;
    transition: background .45s var(--ease), color .45s var(--ease), border-color .45s var(--ease), opacity .3s ease, transform .45s var(--ease);
  }
  .tm-arrow svg{ width:22px; height:18px; display:block; transition: transform .45s var(--ease); }
  .tm-arrow.is-prev svg{ transform: rotate(180deg); }
  .tm-arrow.is-light{ border-color: rgba(255,234,204,0.25); color: var(--cream); }
  .tm-arrow.is-dark{ border-color: rgba(26,26,26,0.18); color: var(--text-primary); }
  @media (hover:hover){
    .tm-arrow.is-light:hover{ background: var(--cream); color: var(--dark); }
    .tm-arrow.is-dark:hover{ background: var(--text-primary); color: #fff; }
    .tm-arrow:hover.is-next svg{ transform: translateX(3px); }
    .tm-arrow:hover.is-prev svg{ transform: rotate(180deg) translateX(3px); }
  }
  .swiper-button-disabled{ opacity:0.25; pointer-events:none; }
  /* EffectCards: soften the stacked shadow */
  .swiper-cards .swiper-slide{ border-radius: var(--radius-xl); overflow:hidden; box-shadow:0 24px 60px rgba(0,0,0,0.18); }
  `
  document.head.appendChild(s)
}

function ArrowGlyph() {
  return (
    <svg viewBox="0 0 25 21" fill="none" aria-hidden="true">
      <path d={ARROW} fill="currentColor" />
    </svg>
  )
}

export function SliderArrows({ prevRef, nextRef, onPrev, onNext, theme = 'dark' }) {
  const t = theme === 'light' ? 'is-light' : 'is-dark'
  return (
    <div className="tm-arrows">
      <button ref={prevRef} onClick={onPrev} aria-label="Previous" data-cursor-hover className={`tm-arrow is-prev ${t}`}><ArrowGlyph /></button>
      <button ref={nextRef} onClick={onNext} aria-label="Next" data-cursor-hover className={`tm-arrow is-next ${t}`}><ArrowGlyph /></button>
    </div>
  )
}
