import { useEffect, useState, useRef, useMemo } from 'react';
import projectService from '../services/projectService';
import contactService from '../services/contactService';
import { projects as projectsData } from '../data/projects';
import toast from 'react-hot-toast';

// ─── Typing Animation Hook ──────────────────────────────
const PHRASES = [
  'Full-Stack Developer',
  'Next.js & React Expert',
  'Mobile App Developer',
  'Game Dev (sometimes)',
  'Still Compiling...',
];

function useTyping(phrases) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;
    if (!deleting) {
      if (charIdx < current.length) {
        timeout = setTimeout(() => { setText(current.slice(0, charIdx + 1)); setCharIdx(i => i + 1); }, 95);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => { setText(current.slice(0, charIdx - 1)); setCharIdx(i => i - 1); }, 48);
      } else {
        // Wrap in timeout to avoid cascading render lint error
        timeout = setTimeout(() => {
          setDeleting(false);
          setPhraseIdx(i => (i + 1) % phrases.length);
        }, 0);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases]);

  return text;
}

// ─── Scroll Reveal Hook ─────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Floating Particles ─────────────────────────────────
function Particles() {
  const [particles] = useState(() => Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    dur: `${Math.random() * 12 + 8}s`,
    delay: `${Math.random() * 8}s`,
    opacity: Math.random() * 0.5 + 0.1,
  })));

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            animationDuration: p.dur,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────
function SectionHeader({ tag, sub }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '10px' }}>
        <h2 className="section-tag">{tag}</h2>
        <div className="section-line" />
      </div>
      {sub && (
        <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '13px', color: 'var(--text-dim)' }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── Pixel Divider ───────────────────────────────────────
function PixelDivider() {
  return <div className="pixel-divider" style={{ margin: '0' }} />;
}

// ══════════════════════════════════════════════════════════
//  SECTION 1 — HERO
// ══════════════════════════════════════════════════════════
function HeroSection() {
  const typingText = useTyping(PHRASES);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  const fadeIn = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <section
      id="hero"
      className="scanlines"
      style={{ position: 'relative', minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '60px 24px' }}
    >
      <Particles />

      {/* ASCII corner decorations */}
      <div aria-hidden="true" className="hidden lg:block" style={{ position: 'absolute', top: '80px', right: '60px', fontFamily: '"Fira Code", monospace', fontSize: '11px', color: 'rgba(0,245,255,0.2)', lineHeight: 1.6, zIndex: 2, pointerEvents: 'none' }}>
        ┌────────────────┐<br />│  SYSTEM ONLINE │<br />│  PORT: 3000    │<br />│  STATUS: ✓ OK  │<br />└────────────────┘
      </div>
      <div aria-hidden="true" className="hidden lg:block" style={{ position: 'absolute', bottom: '60px', left: '60px', fontFamily: '"Fira Code", monospace', fontSize: '10px', color: 'rgba(0,245,255,0.16)', lineHeight: 1.7, zIndex: 2, pointerEvents: 'none' }}>
        &gt; git clone repo<br />&gt; npm install<br />&gt; npm run dev<br />&gt; <span style={{ display: 'inline-block', width: '8px', height: '12px', background: 'rgba(0,245,255,0.35)', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '760px', width: '100%', textAlign: 'center' }}>
        {/* Status badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px', ...fadeIn(0) }}>
          <div className="status-badge"><div className="status-dot" style={{ backgroundColor: '#4ade80' }} />Actively looking for an internship</div>
        </div>

        {/* Greeting */}
        <p style={{ fontFamily: '"Fira Code", monospace', fontSize: 'clamp(12px,2vw,15px)', color: 'var(--cyan-dim)', letterSpacing: '3px', marginBottom: '10px', ...fadeIn(0.1) }}>
          &gt; Hello, World! I&apos;m
        </p>

        {/* Name */}
        <h1 className="glow-cyan" style={{ fontFamily: '"Press Start 2P", cursive', fontSize: 'clamp(22px,5vw,50px)', letterSpacing: '4px', lineHeight: 1.3, marginBottom: '24px', ...fadeIn(0.2) }}>
          Tet Elite
        </h1>

        {/* Typing */}
        <div style={{ fontFamily: '"Fira Code", monospace', fontSize: 'clamp(13px,2.5vw,20px)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '28px', ...fadeIn(0.3) }}>
          <span style={{ color: 'var(--cyan-dim)' }}>// </span>
          <span style={{ color: 'var(--cyan)', textShadow: '0 0 12px rgba(0,245,255,0.5)' }}>{typingText}</span>
          <span className="cursor-blink" />
        </div>

        {/* Description */}
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px,1.5vw,16px)', color: 'var(--text-dim)', maxWidth: '520px', margin: '0 auto 36px', lineHeight: 1.85, ...fadeIn(0.4) }}>
          &quot;I build things and figure stuff out.&quot;<br />
          Full-Stack Developer · Year 3 @ CADT, Cambodia 🇰🇭
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px', ...fadeIn(0.5) }}>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-pixel"
          ><span>▶ View My Work</span></button>
          <a href="/resume.pdf" download className="btn-pixel-ghost">💾 Download Resume</a>
        </div>

        {/* Quick stats — summarized from what's below */}
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', ...fadeIn(0.6) }}>
          {[['∞', '☕ Coffee'], ['9999', '🐛 Bugs Fixed'], ['1', '🎮 Games Built']].map(([val, label]) => (
            <div key={label} style={{ fontFamily: '"Fira Code", monospace', fontSize: '12px', color: 'var(--text-dim)' }}>
              <span style={{ color: 'var(--cyan)' }}>{val}</span> {label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2 }}>
        <span style={{ fontFamily: '"Fira Code", monospace', fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '2px' }}>SCROLL</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
//  SECTION 2 — ABOUT
// ══════════════════════════════════════════════════════════
function AboutSection() {
  const STATS = [
    { icon: '☕', label: 'Coffee Consumed', value: '∞' },
    { icon: '🐛', label: 'Bugs Fixed', value: '9999' },
    { icon: '🎮', label: 'Games Built', value: '1' },
    { icon: '📱', label: 'Apps Shipped', value: '2' },
    { icon: '🌍', label: 'Languages Spoken', value: '3' },
    { icon: '🚲', label: 'Volunteer Events', value: '3' },
    { icon: '🎤', label: 'Concerts Worked', value: '1' },
  ];

  return (
    <section id="about" style={{ padding: '100px 24px', maxWidth: '1152px', margin: '0 auto' }}>
      <RevealSection>
        <SectionHeader tag="[ ABOUT ME ]" sub="// Level 99 developer — still grinding" />
      </RevealSection>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'center' }}>
        {/* Left — Avatar */}
        <RevealSection delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {/* Avatar frame */}
            <div style={{
              width: '300px', height: '300px',
              border: '3px solid var(--cyan)',
              boxShadow: '0 0 0 2px var(--bg), 0 0 0 5px rgba(0,245,255,0.25), 0 0 40px rgba(0,245,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--bg-card)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Grid overlay */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <img
                src="/photos/Myself.jpg"
                alt="Tet Elite Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }}
              />
            </div>

            {/* RPG name badge */}
            <div style={{
              background: 'rgba(0,245,255,0.06)',
              border: '2px solid rgba(0,245,255,0.3)',
              padding: '8px 20px',
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '9px',
              color: 'var(--cyan)',
              textAlign: 'center',
              letterSpacing: '1px',
              textShadow: '0 0 8px rgba(0,245,255,0.5)',
            }}>
              ⚔ [ LEVEL 99 — STILL GRINDING ] ⚔
            </div>
          </div>
        </RevealSection>

        {/* Right — Bio */}
        <RevealSection delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '12px', color: 'var(--cyan-dim)', letterSpacing: '1px' }}>
              &gt; ./about-me.sh
            </div>

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--text)', lineHeight: 1.85 }}>
              Hey, I&apos;m <span style={{ color: 'var(--cyan)' }}>Tet Elite</span> — a Year 3 CS student at CADT, Cambodia.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--text-dim)', lineHeight: 1.85 }}>
              I&apos;m a generalist dev which means I&apos;ve touched everything from low-level C/C++ to Flutter apps, Unity games, and full-stack web dev. Not fully specialized yet — and honestly, proud of it.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--text-dim)', lineHeight: 1.85 }}>
              I learn fast, I ship things, and I&apos;m not afraid to figure stuff out when I&apos;m stuck (Stack Overflow and I are very close). Currently levelling up in full-stack web dev and Flutter while hunting for an internship to grow and actually contribute somewhere real.
            </p>

            {/* Stat badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '8px' }}>
              {STATS.map(({ icon, label, value }) => (
                <div key={label} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(0,245,255,0.12)',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'border-color 0.25s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,245,255,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,245,255,0.12)'}
                >
                  <span style={{ fontSize: '18px' }}>{icon}</span>
                  <div>
                    <div style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '9px', color: 'var(--cyan)' }}>{value}</div>
                    <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '10px', color: 'var(--text-dim)', marginTop: '3px' }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Specific language stat with list style */}
            <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '10px', color: 'var(--text-dim)', marginTop: '4px' }}>
              🌍 Languages: Khmer, English, JavaScript (barely)
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
//  SECTION 3 — SKILLS
// ══════════════════════════════════════════════════════════
const SKILL_GROUPS = [
  {
    category: 'Full-Stack',
    icon: '🚀',
    skills: [
      { name: 'Next.js 15', icon: '/photos/react.png' },
      { name: 'React 19', icon: '/photos/react.png' },
      { name: 'TypeScript', icon: '/photos/javascript.png' },
      { name: 'Tailwind v4', icon: '/photos/tailwind.png' },
    ],
  },
  {
    category: 'Backend & DB',
    icon: '⚙',
    skills: [
      { name: 'Node.js', icon: '/photos/node.jpg' },
      { name: 'MongoDB', icon: '/photos/mongodb-atlas-google-cloud-partnership-nosql-databases-integrations-2.jpg' },
      { name: 'NextAuth v5', icon: '/photos/react.png' },
      { name: 'REST APIs', icon: '/photos/express.png' },
    ],
  },
  {
    category: 'Mobile & Game',
    icon: '🎮',
    skills: [
      { name: 'Flutter', icon: '/photos/flutter-logo-sharing.png' },
      { name: 'Dart / SQLite', icon: '/photos/sql.png' },
      { name: 'Unity (C#)', icon: '/photos/unity.png' },
    ],
  },
  {
    category: 'Languages',
    icon: '💻',
    skills: [
      { name: 'C / C++', icon: '/photos/ISO_C++_Logo.svg.png' },
      { name: 'Python', icon: '/photos/pythoned.png' },
      { name: 'JavaScript', icon: '/photos/javascript.png' },
      { name: 'C#', icon: '/photos/csharp-logo-265a149e.svg' },
    ],
  },
];

function SkillCard({ skill }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(0,245,255,0.08)' : 'var(--bg-card)',
        border: hovered ? '2px solid var(--cyan)' : '1px solid rgba(0,245,255,0.15)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'all 0.25s ease',
        boxShadow: hovered ? '0 0 15px rgba(0,245,255,0.1)' : 'none',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ 
        width: '28px', height: '28px', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.2)', 
        border: '1px solid rgba(0,245,255,0.1)'
      }}>
        <img
          src={skill.icon}
          style={{ width: '18px', height: '18px', objectFit: 'contain', filter: hovered ? 'none' : 'grayscale(0.3)' }}
          alt=""
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
        />
        <span style={{ fontSize: '14px', display: 'none' }}>{skill.icon}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{ 
          fontFamily: '"Fira Code", monospace', fontSize: '13px', 
          color: hovered ? 'var(--cyan)' : 'var(--text)', 
          fontWeight: 500,
          transition: 'color 0.25s ease' 
        }}>
          {skill.name}
        </span>
        {skill.name === 'Lua / PICO-8' && <span style={{ fontSize: '8px', color: '#fb923c', fontFamily: '"Press Start 2P"' }}>[ EXPLORING ]</span>}
        {skill.name === 'Figma' && <span style={{ fontSize: '8px', color: 'var(--text-dim)', fontFamily: '"Press Start 2P"' }}>[ DESIGN ]</span>}
      </div>

      {hovered && (
        <div style={{ 
          position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
          fontSize: '10px', color: 'var(--cyan)', opacity: 0.5, fontFamily: '"Fira Code"'
        }}>
          &lt;/&gt;
        </div>
      )}
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" style={{ padding: '100px 24px', background: 'rgba(0,245,255,0.01)' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
        <RevealSection>
          <SectionHeader tag="[ TECH_STACK ]" sub="// My current arsenal of technologies" />
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {SKILL_GROUPS.map((group, gi) => (
            <RevealSection key={group.category} delay={gi * 0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Group header */}
                <div style={{
                  fontFamily: '"Press Start 2P", cursive', fontSize: '9px',
                  color: 'var(--cyan)', letterSpacing: '1px',
                  background: 'rgba(0,245,255,0.05)',
                  padding: '10px', marginBottom: '6px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  borderLeft: '3px solid var(--cyan)'
                }}>
                  <span>{group.icon}</span> {group.category.toUpperCase()}
                </div>
                {group.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
//  SECTION 4 — VOLUNTEERING (SIDE QUESTS)
// ══════════════════════════════════════════════════════════
const SIDE_QUESTS = [
  {
    id: 1,
    event: 'Pedal for the Planet',
    org: 'Team 2',
    date: 'November 30, 2025',
    role: 'Risk Coordinator',
    badge: '🚲 [ QUEST COMPLETE ]',
    desc: 'Managed broken bicycle transportation logistics during the event. Coordinated with a truck team to safely collect and transport damaged bicycles. The planet was saved. The bicycles... mostly.',
    icon: '🚲',
    image: '/photos/RideBike.jpg'
  },
  {
    id: 2,
    event: 'Ganzberg Concert feat. TREASURE',
    org: 'BookMe+',
    date: 'February 28, 2026',
    role: 'Crowd Coordinator',
    badge: '🎤 [ QUEST COMPLETE ]',
    desc: 'Supported crowd management featuring TREASURE from Korea. Helped lost attendees, organized flow, and kept the crowd safe. Basically a human GPS with a walkie-talkie vibe.',
    icon: '🎤',
    image: '/photos/bookme.jpg'
  },
  {
    id: 3,
    event: 'Kids & Families Fair',
    org: 'Team 2',
    date: 'March 7–8, 2026',
    role: 'Sales & Health Outreach',
    badge: '👨‍👩‍👧 [ QUEST COMPLETE ]',
    desc: 'Assisted with sales of cough medicine and offered health check-ups to families with children. Talked to a lot of parents, helped kids, and sold a respectable amount of syrup.',
    icon: '👨‍👩‍👧',
    image: '/photos/Wood.jpg'
  },
];

function VolunteeringSection() {
  return (
    <section id="volunteering" style={{ padding: '100px 24px', maxWidth: '1152px', margin: '0 auto' }}>
      <RevealSection>
        <SectionHeader tag="[ SIDE QUESTS COMPLETED ]" sub="// Evidence of my life outside of VS Code" />
      </RevealSection>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {SIDE_QUESTS.map((quest, i) => (
          <RevealSection key={quest.id} delay={i * 0.1}>
            <div style={{
              background: 'var(--bg-card)',
              border: '2px solid rgba(0,245,255,0.12)',
              padding: '0',
              display: 'flex', flexDirection: 'column',
              position: 'relative', overflow: 'hidden'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,245,255,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ height: '180px', overflow: 'hidden', borderBottom: '2px solid rgba(0,245,255,0.12)' }}>
                <img src={quest.image} alt={quest.event} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, transition: 'all 0.4s ease' }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.8} />
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '32px', opacity: 0.08, position: 'absolute', top: '190px', right: '10px' }}>{quest.icon}</div>

                <div>
                  <div style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '9px', color: 'var(--cyan)', marginBottom: '8px' }}>{quest.badge}</div>
                  <h3 style={{ fontFamily: '"Fira Code", monospace', fontSize: '15px', color: 'var(--text)', margin: 0 }}>{quest.event}</h3>
                  <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>{quest.role} · {quest.org}</p>
                </div>

                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.7, margin: 0 }}>{quest.desc}</p>

              </div>
              <div style={{ padding: '0 24px 24px', fontFamily: '"Fira Code", monospace', fontSize: '10px', color: 'var(--cyan-dim)', marginTop: 'auto' }}>
                // Date: {quest.date}
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
//  SECTION 5 — PROJECTS
// ══════════════════════════════════════════════════════════

function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        border: hovered ? '2px solid var(--cyan)' : '2px solid rgba(0,245,255,0.15)',
        boxShadow: hovered ? '0 0 30px rgba(0,245,255,0.1), 0 10px 40px rgba(0,0,0,0.4)' : 'none',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        display: 'flex', flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* Image area */}
      <div style={{
        height: '180px',
        background: '#0d0d1a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '1px solid rgba(0,245,255,0.08)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,245,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.04) 1px,transparent 1px)', backgroundSize: '15px 15px' }} />
        
        {project.media ? (
          <img 
            src={project.mediaType === 'video' ? (project.screenshots ? project.screenshots[0] : '/photos/Unity_Technologies_logo.svg.png') : project.media} 
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: hovered ? 1 : 0.7, transition: '0.4s ease' }}
          />
        ) : (
          <span style={{ fontFamily: '"Fira Code", monospace', fontSize: '10px', color: 'rgba(0,245,255,0.3)', letterSpacing: '2px', position: 'relative', zIndex: 1 }}>[ {project.title.toUpperCase()} ]</span>
        )}

        {hovered && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,245,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '8px', color: 'var(--cyan)', textShadow: '0 0 8px rgba(0,245,255,0.8)' }}>[ VIEW DETAILS ]</span>
          </div>
        )}
      </div>

      <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '10px', color: 'var(--cyan)', lineHeight: 1.6, margin: 0 }}>
          {project.title}
        </h3>
        <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '11px', color: 'var(--cyan-dim)', margin: 0 }}>
          {project.role} · {project.period}
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.7, flex: 1, margin: 0 }}>
          {project.description.slice(0, 100)}...
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {(project.tags || []).slice(0, 3).map(t => <span key={t} className="tech-tag">{t}</span>)}
          {project.tags?.length > 3 && <span className="tech-tag" style={{ opacity: 0.6 }}>+{project.tags.length - 3}</span>}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const [activeMedia, setActiveMedia] = useState(0); // 0 for video/main, 1+ for screenshots

  if (!project) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(5, 5, 10, 0.95)', 
        zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', 
        padding: '20px', backdropFilter: 'blur(8px)'
      }}
    >
      <div style={{
        width: '100%', maxWidth: '900px', maxHeight: '90vh', background: 'var(--bg-body)',
        border: '2px solid var(--cyan)', boxShadow: '0 0 50px rgba(0,245,255,0.15)',
        position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '15px', right: '15px', zIndex: 10,
            background: 'var(--bg-card)', border: '1px solid var(--cyan)', color: 'var(--cyan)',
            padding: '8px 12px', cursor: 'pointer', fontFamily: '"Fira Code", monospace'
          }}
        >
          X
        </button>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {/* Media Header */}
          <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', position: 'relative' }}>
            {project.mediaType === 'video' && activeMedia === 0 ? (
              <video 
                src={project.media} 
                controls autoPlay muted autoFocus
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <img 
                src={activeMedia === 0 ? project.media : project.screenshots[activeMedia - 1]} 
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            )}
          </div>

          {/* Screenshots Thumbnails */}
          {project.screenshots?.length > 0 && (
            <div style={{ 
              display: 'flex', gap: '10px', padding: '15px', 
              background: 'rgba(0,0,0,0.3)', overflowX: 'auto' 
            }}>
               <div 
                onClick={() => setActiveMedia(0)}
                style={{ 
                  width: '80px', height: '45px', border: activeMedia === 0 ? '2px solid var(--cyan)' : '1px solid #333',
                  cursor: 'pointer', overflow: 'hidden', flexShrink: 0, position: 'relative'
                }}
              >
                {project.mediaType === 'video' ? (
                   <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222' }}>
                      <i className="fas fa-play" style={{ color: 'var(--cyan)', fontSize: '10px' }}></i>
                   </div>
                ) : (
                  <img src={project.media} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              {project.screenshots.map((s, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveMedia(idx + 1)}
                  style={{ 
                    width: '80px', height: '45px', border: activeMedia === idx + 1 ? '2px solid var(--cyan)' : '1px solid #333',
                    cursor: 'pointer', overflow: 'hidden', flexShrink: 0
                  }}
                >
                  <img src={s} alt={`screenshot ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}

          {/* Project Details */}
          <div style={{ padding: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '12px', color: 'var(--cyan)', marginBottom: '4px' }}>
                {project.type} // {project.period}
              </div>
              <h2 style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '18px', color: 'var(--text)', margin: 0 }}>
                {project.title}
              </h2>
              <div style={{ color: 'var(--cyan-dim)', fontSize: '13px', marginTop: '4px' }}>{project.subtitle}</div>
            </div>

            <p style={{ 
              fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--text-dim)', 
              lineHeight: 1.8, marginBottom: '24px', whiteSpace: 'pre-wrap'
            }}>
              {project.description}
            </p>

            {project.title === "This Portfolio" && (
              <div style={{ 
                background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.2)', 
                padding: '16px', marginBottom: '24px', fontFamily: '"Fira Code", monospace'
              }}>
                <div style={{ color: 'var(--cyan)', fontSize: '11px', marginBottom: '8px' }}>[ SELF_RECORD_LOG ]</div>
                <div style={{ color: 'var(--text-dim)', fontSize: '13px', lineHeight: 1.6 }}>
                  {'>'} Initialized with Vite & React 19<br/>
                  {'>'} Integrated EmailJS for contact logic<br/>
                  {'>'} Custom CSS for retro pixel aesthetic<br/>
                  {'>'} Responsive design for mobile/desktop
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {(project.tags || []).map(t => <span key={t} className="tech-tag">{t}</span>)}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-pixel">
                  <span>GITHUB_REPO</span>
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-pixel">
                  <span>LIVE_DEMO</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // We prioritize the local high-fidelity data
    setProjects(projectsData);
    setLoading(false);
  }, []);

  return (
    <section id="projects" style={{ padding: '100px 24px', maxWidth: '1152px', margin: '0 auto' }}>
      <RevealSection>
        <SectionHeader tag="[ QUEST LOG ]" sub="// Documenting my journey through code" />
      </RevealSection>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', minHeight: '300px' }}>
          <div className="pixel-spinner" />
          <span style={{ fontFamily: '"Fira Code", monospace', color: 'var(--text-dim)', fontSize: '13px' }}>Loading quests...</span>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {projects.map((project, i) => (
            <RevealSection key={project.id || i} delay={i * 0.1}>
              <ProjectCard 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            </RevealSection>
          ))}
        </div>
      )}

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}

// ══════════════════════════════════════════════════════════
//  SECTION 6 — CONTACT
// ══════════════════════════════════════════════════════════
const SOCIALS = [
  { href: 'https://t.me/Tet_Elite', icon: 'fab fa-telegram', label: 'Telegram' },
  { href: 'https://github.com/TetElite', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'mailto:elitenozero@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
];

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactService.sendMessage(formData);
      toast.success('Message sent! I respond faster than my code compiles.');
      setFormData({ name: '', email: '', content: '' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message. Is the server down?');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = { fontFamily: '"Fira Code", monospace', fontSize: '11px', color: 'var(--cyan-dim)', letterSpacing: '1px', display: 'block', marginBottom: '8px' };

  return (
    <section id="contact" style={{ padding: '100px 24px', background: 'rgba(0,245,255,0.01)' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <RevealSection>
          <SectionHeader tag="[ SEND MESSAGE ]" sub="// I respond faster than my code compiles." />
        </RevealSection>

        <RevealSection delay={0.1}>
          <form
            onSubmit={handleSubmit}
            style={{ background: 'var(--bg-card)', border: '2px solid rgba(0,245,255,0.15)', padding: '36px', display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '36px' }}
          >
            {[
              { name: 'name', label: '> NAME_', placeholder: '[Your Name]', type: 'text' },
              { name: 'email', label: '> EMAIL_', placeholder: '[your@email.com]', type: 'email' },
            ].map(({ name, label, placeholder, type }) => (
              <div key={name}>
                <label htmlFor={name} style={labelStyle}>{label}</label>
                <input
                  id={name} name={name} type={type} required
                  value={formData[name]}
                  onChange={handleChange}
                  onFocus={() => setFocused(name)}
                  onBlur={() => setFocused(null)}
                  placeholder={placeholder}
                  className="input-pixel"
                  style={{ borderColor: focused === name ? 'var(--cyan)' : undefined }}
                />
              </div>
            ))}

            <div>
              <label htmlFor="content" style={labelStyle}>&gt; MESSAGE_</label>
              <textarea
                id="content" name="content" required rows={5}
                value={formData.content}
                onChange={handleChange}
                onFocus={() => setFocused('content')}
                onBlur={() => setFocused(null)}
                placeholder="[What's on your mind?]"
                className="input-pixel"
                style={{ resize: 'vertical', borderColor: focused === 'content' ? 'var(--cyan)' : undefined }}
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="btn-pixel"
              style={{ width: '100%', textAlign: 'center', opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
              aria-label="Send message"
            >
              <span>{loading ? '// TRANSMITTING...' : '> SEND_MESSAGE'}</span>
            </button>
          </form>
        </RevealSection>

        <RevealSection delay={0.2}>
          <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '16px', letterSpacing: '1px' }}>
            // Connect with me:
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {SOCIALS.map(({ href, icon, label }) => (
              <a
                key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(0,245,255,0.2)', color: 'var(--text-dim)', fontSize: '16px', textDecoration: 'none', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(0,245,255,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.borderColor = 'rgba(0,245,255,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <i className={icon} aria-hidden="true" />
              </a>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
//  FLOATING RESUME BUTTON ─ bottom-right sticky
// ══════════════════════════════════════════════════════════
function ResumeFloatingButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="/resume.pdf"
      download
      aria-label="Download Resume"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="[ Download CV ]"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 500,
        fontFamily: '"Press Start 2P", cursive',
        fontSize: '9px',
        color: hovered ? 'var(--bg)' : 'var(--cyan)',
        background: hovered ? 'var(--cyan)' : 'var(--bg-card)',
        border: '2px solid var(--cyan)',
        padding: '12px 16px',
        textDecoration: 'none',
        boxShadow: hovered
          ? '0 0 30px rgba(0,245,255,0.5)'
          : '0 0 0 1px var(--bg), 0 0 0 3px rgba(0,245,255,0.3)',
        transition: 'all 0.25s ease',
        letterSpacing: '0.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span>💾</span>
      <span className="hidden md:inline">SAVE_RESUME.pdf</span>
    </a>
  );
}

// ══════════════════════════════════════════════════════════
//  ROOT PAGE EXPORT
// ══════════════════════════════════════════════════════════
export default function Home() {
  return (
    <div className="bg-grid" style={{ background: 'var(--bg)' }}>
      <HeroSection />
      <PixelDivider />
      <AboutSection />
      <PixelDivider />
      <SkillsSection />
      <PixelDivider />
      <VolunteeringSection />
      <PixelDivider />
      <ProjectsSection />
      <PixelDivider />
      <ContactSection />
      <ResumeFloatingButton />
    </div>
  );
}
