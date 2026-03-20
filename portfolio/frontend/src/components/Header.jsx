import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Side Quests', href: '#volunteering' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  // ── Scroll effects: navbar tint + active section spy ──
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Determine which section is in viewport
      const sections = NAV_ITEMS.map(n => n.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i]);
          return;
        }
      }
      setActive('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ──────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const toggleMobile = () => setMobileOpen(prev => !prev);
  const closeMobile = () => setMobileOpen(false);

  const scrollTo = (href) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    closeMobile();
  };

  return (
    <>
      {/* ── Mobile fullscreen overlay ──────────────────── */}
      <nav
        aria-label="Mobile navigation"
        aria-modal={mobileOpen}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10,10,15,0.98)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.77,0,0.175,1)',
        }}
      >
        {NAV_ITEMS.map(({ label, href }) => (
          <button
            key={href}
            onClick={() => scrollTo(href)}
            style={{
              background: 'none',
              border: active === href.slice(1) ? '2px solid var(--cyan)' : '2px solid transparent',
              cursor: 'pointer',
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '15px',
              color: active === href.slice(1) ? 'var(--cyan)' : 'var(--text)',
              padding: '10px 28px',
              textShadow: active === href.slice(1) ? '0 0 12px rgba(0,245,255,0.8)' : 'none',
              transition: 'all 0.25s ease',
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* ── Fixed top navbar ───────────────────────────── */}
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(10,10,15,0.98)' : 'rgba(10,10,15,0.82)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '2px solid var(--cyan)',
          boxShadow: scrolled
            ? '0 2px 30px rgba(0,245,255,0.14)'
            : '0 2px 20px rgba(0,245,255,0.05)',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo — scroll to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <span style={{ display: 'inline-block', width: '12px', height: '12px', background: 'var(--cyan)', borderRadius: '2px' }} />
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = active === href.slice(1);
              return (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: isActive ? '2px solid var(--cyan)' : '2px solid transparent',
                    cursor: 'pointer',
                    fontFamily: '"Fira Code", monospace',
                    fontSize: '13px',
                    color: isActive ? 'var(--cyan)' : 'var(--text)',
                    letterSpacing: '0.5px',
                    paddingBottom: '3px',
                    textShadow: isActive ? '0 0 8px rgba(0,245,255,0.5)' : 'none',
                    transition: 'all 0.25s ease',
                    padding: '0 0 3px 0',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--cyan)';
                    e.currentTarget.style.borderBottom = '2px solid var(--cyan)';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text)';
                      e.currentTarget.style.borderBottom = '2px solid transparent';
                    }
                  }}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Resume CTA button (desktop) */}
          <a
            href="/resume.pdf"
            download
            className="hidden md:inline-block"
            style={{
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '9px',
              padding: '10px 20px',
              color: 'var(--cyan)',
              border: '2px solid rgba(0,245,255,0.4)',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--cyan)';
              e.currentTarget.style.color = 'var(--bg)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--cyan)';
            }}
          >
            💾 Resume
          </a>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden"
            onClick={toggleMobile}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              zIndex: 1100,
            }}
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '26px',
                  height: '2px',
                  background: 'var(--cyan)',
                  boxShadow: '0 0 6px rgba(0,245,255,0.5)',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: mobileOpen
                    ? i === 0 ? 'translateY(7px) rotate(45deg)'
                      : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                        : 'none'
                    : 'none',
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Spacer */}
      <div style={{ height: '64px' }} aria-hidden="true" />
    </>
  );
}

export default Header;
