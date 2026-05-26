import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Device', href: '#device' },
  { label: 'Team', href: '#team' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Privacy', href: '#privacy' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '14px 48px' : '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(13,13,13,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,234,204,0.06)' : '1px solid transparent',
      }}
    >
      <a href="#" style={{
        fontFamily: 'var(--font-display)',
        fontSize: scrolled ? '1.5rem' : '1.8rem',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        color: scrolled ? 'var(--cream)' : 'var(--text-primary)',
        transition: 'all 0.4s ease',
      }}>
        Tremora
      </a>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '36px',
      }}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
            style={{
              fontSize: '0.85rem',
              color: scrolled ? 'var(--cream)' : 'var(--text-primary)',
              opacity: 0.6,
              fontWeight: 400,
              letterSpacing: '0.01em',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => e.target.style.opacity = 1}
            onMouseLeave={e => e.target.style.opacity = 0.6}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#waitlist"
          onClick={(e) => scrollTo(e, '#waitlist')}
          style={{
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'white',
            background: 'var(--text-primary)',
            padding: '10px 24px',
            borderRadius: 'var(--radius-pill)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.target.style.background = 'var(--coral)'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'var(--text-primary)'
          }}
        >
          Join Waitlist →
        </a>
      </div>
    </motion.nav>
  )
}
