const SOCIALS = [
  { href: 'https://github.com', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://linkedin.com', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
  { href: 'mailto:you@example.com', icon: 'fas fa-envelope', label: 'Email' },
  { href: 'https://twitter.com', icon: 'fab fa-twitter', label: 'Twitter' },
];

export default function Contact() {
  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px' }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '10px' }}>
        <h2 className="section-tag">[ GET IN TOUCH ]</h2>
      </div>

      {/* Flavor text */}
      <p style={{
        fontFamily: '"Fira Code", monospace',
        fontSize: '13px',
        color: 'var(--text-dim)',
        marginBottom: '40px',
      }}>
        {'// Let\'s connect and build something amazing together.'}
      </p>

      {/* Contact info */}
      <div style={{
        background: 'var(--bg-card)',
        border: '2px solid rgba(0,245,255,0.18)',
        padding: '36px',
        marginBottom: '40px',
      }}>
        <h3 style={{
          fontFamily: '"Press Start 2P", cursive',
          fontSize: '12px',
          color: 'var(--cyan)',
          marginBottom: '24px',
          letterSpacing: '1px',
        }}>
          &gt; REACH_OUT
        </h3>

        <div style={{ marginBottom: '20px' }}>
          <p style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: '14px',
            color: 'var(--text)',
            marginBottom: '8px',
          }}>
            <strong style={{ color: 'var(--cyan-dim)' }}>Email:</strong> your.email@example.com
          </p>
          <p style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: '14px',
            color: 'var(--text)',
            marginBottom: '8px',
          }}>
            <strong style={{ color: 'var(--cyan-dim)' }}>Location:</strong> Your City, Country
          </p>
          <p style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: '14px',
            color: 'var(--text)',
          }}>
            <strong style={{ color: 'var(--cyan-dim)' }}>Status:</strong> <span style={{ color: 'var(--green)' }}>Available for projects</span>
          </p>
        </div>
      </div>

      {/* Social icons */}
      <div>
        <p style={{
          fontFamily: '"Fira Code", monospace',
          fontSize: '12px',
          color: 'var(--text-dim)',
          marginBottom: '20px',
          letterSpacing: '1px',
        }}>
          // Or find me on social platforms:
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          {SOCIALS.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(0,245,255,0.2)',
                color: 'var(--text-dim)',
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--cyan)';
                e.currentTarget.style.borderColor = 'var(--cyan)';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(0,245,255,0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-dim)';
                e.currentTarget.style.borderColor = 'rgba(0,245,255,0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <i className={icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}