import { useLenis } from './hooks/useLenis'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Marquee from './components/Marquee'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import HowItWorks from './sections/HowItWorks'
import Device from './sections/Device'
import Team from './sections/Team'
import Roadmap from './sections/Roadmap'
import CTA from './sections/CTA'
import Privacy from './sections/Privacy'

function SectionDivider({ bg = 'var(--cream)', color = 'rgba(0,0,0,0.06)' }) {
  return (
    <div style={{ background: bg, padding: '0 clamp(24px, 5vw, 64px)' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        height: '1px',
        background: color,
      }} />
    </div>
  )
}

function App() {
  useLenis()

  return (
    <>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <Problem />
      <HowItWorks />
      <SectionDivider bg="var(--cream)" />
      <Device />
      <Team />
      <SectionDivider bg="var(--cream)" />
      <Roadmap />
      <Privacy />
      <CTA />
    </>
  )
}

export default App
