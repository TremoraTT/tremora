export default function Button({ children, variant = 'primary', href, onClick, style: extraStyle }) {
  const styles = {
    primary: {
      background: 'var(--text-primary)',
      color: 'white',
      padding: '16px 36px',
      borderRadius: 'var(--radius-pill)',
      fontSize: '0.95rem',
      fontWeight: 500,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      border: 'none',
      letterSpacing: '0.01em',
      transition: 'opacity 0.2s',
      cursor: 'pointer',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-primary)',
      padding: '16px 36px',
      borderRadius: 'var(--radius-pill)',
      fontSize: '0.95rem',
      fontWeight: 500,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      border: '1px solid rgba(26,26,26,0.2)',
      transition: 'border-color 0.2s',
      cursor: 'pointer',
    },
    dark: {
      background: 'var(--dark)',
      color: 'var(--cream)',
      padding: '16px 36px',
      borderRadius: 'var(--radius-pill)',
      fontSize: '0.95rem',
      fontWeight: 500,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      border: 'none',
      transition: 'opacity 0.2s',
      cursor: 'pointer',
    },
  }

  const Comp = href ? 'a' : 'button'

  return (
    <Comp
      href={href}
      onClick={onClick}
      style={{ ...styles[variant], ...extraStyle }}
    >
      {children}
    </Comp>
  )
}
