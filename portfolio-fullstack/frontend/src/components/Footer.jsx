function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'rgba(10,10,15,0.98)',
        borderTop: '2px solid rgba(0,245,255,0.12)',
        padding: '48px 24px 36px',
      }}
    >
      <div className="pixel-divider" style={{ maxWidth: '1152px', margin: '0 auto 36px' }} />

      <div
        style={{
          maxWidth: '1152px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '13px',
            color: 'var(--cyan)',
            padding: 0,
          }}
        >
          Tet Elite
        </button>

        {/* Anchor nav */}
        <nav style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }} aria-label="Footer navigation">
          {['about', 'skills', 'volunteering', 'projects', 'contact'].map(id => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: '"Fira Code", monospace',
                fontSize: '12px',
                color: 'var(--text-dim)',
                textTransform: 'capitalize',
                transition: 'color 0.2s ease',
                padding: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
            >
              {id === 'volunteering' ? 'Side Quests' : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { href: 'https://github.com/TetElite', icon: 'fab fa-github', label: 'GitHub' },
            { href: 'https://t.me/Tet_Elite', icon: 'fab fa-telegram', label: 'Telegram' },
            { href: 'mailto:elitenozero@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid rgba(0,245,255,0.18)',
                color: 'var(--text-dim)',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--cyan)';
                e.currentTarget.style.borderColor = 'var(--cyan)';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(0,245,255,0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-dim)';
                e.currentTarget.style.borderColor = 'rgba(0,245,255,0.18)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <i className={icon} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '12px', color: 'var(--text-dim)' }}>
          {`// Built by Tet Elite · © ${year} · All rights reserved`}
        </p>

        {/* Easter egg */}
        <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '10px', color: 'rgba(90,100,128,0.35)' }}>
          &gt; You found the footer. +10 XP. Now go hire me.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
