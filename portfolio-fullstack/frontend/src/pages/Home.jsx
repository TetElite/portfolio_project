import { useEffect, useState, useRef } from 'react';
import projectService from '../services/projectService';
import contactService from '../services/contactService';
import toast from 'react-hot-toast';

// ─── Typing Animation Hook ──────────────────────────────
const PHRASES = [
  'Full-Stack Developer',
  'Problem Solver',
  'Code Craftsman',
  'UI/UX Enthusiast',
  'Open Source Contributor',
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
          <div className="status-badge"><div className="status-dot" />Available for work · Open to opportunities</div>
        </div>

        {/* Greeting */}
        <p style={{ fontFamily: '"Fira Code", monospace', fontSize: 'clamp(12px,2vw,15px)', color: 'var(--cyan-dim)', letterSpacing: '3px', marginBottom: '10px', ...fadeIn(0.1) }}>
          &gt; Hello, World! I&apos;m
        </p>

        {/* Name */}
        <h1 className="glow-cyan" style={{ fontFamily: '"Press Start 2P", cursive', fontSize: 'clamp(22px,5vw,50px)', letterSpacing: '4px', lineHeight: 1.3, marginBottom: '24px', ...fadeIn(0.2) }}>
          [YOUR NAME]
        </h1>

        {/* Typing */}
        <div style={{ fontFamily: '"Fira Code", monospace', fontSize: 'clamp(13px,2.5vw,20px)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '28px', ...fadeIn(0.3) }}>
          <span style={{ color: 'var(--cyan-dim)' }}>// </span>
          <span style={{ color: 'var(--cyan)', textShadow: '0 0 12px rgba(0,245,255,0.5)' }}>{typingText}</span>
          <span className="cursor-blink" />
        </div>

        {/* Description */}
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px,1.5vw,16px)', color: 'var(--text-dim)', maxWidth: '520px', margin: '0 auto 36px', lineHeight: 1.85, ...fadeIn(0.4) }}>
          I build <span style={{ color: 'var(--cyan)' }}>scalable</span>, <span style={{ color: 'var(--cyan)' }}>performant</span>, and <span style={{ color: 'var(--cyan)' }}>beautiful</span> digital experiences — from pixel-perfect frontends to battle-tested backends.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px', ...fadeIn(0.5) }}>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-pixel"
          ><span>▶ View My Work</span></button>
          <a href="/resume.pdf" download className="btn-pixel-ghost">💾 Download Resume</a>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', ...fadeIn(0.6) }}>
          {[['5+', 'Years Coding'], ['20+', 'Projects Shipped'], ['∞', '☕ Coffee']].map(([val, label]) => (
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
    { icon: '🐛', label: 'Bugs Fixed', value: '9999+' },
    { icon: '🚀', label: 'Projects Shipped', value: '20+' },
    { icon: '⌨️', label: 'Lines of Code', value: '100K+' },
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
              width: '220px', height: '220px',
              border: '3px solid var(--cyan)',
              boxShadow: '0 0 0 2px var(--bg), 0 0 0 5px rgba(0,245,255,0.25), 0 0 40px rgba(0,245,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--bg-card)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Grid overlay */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <span style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '56px', position: 'relative', zIndex: 1 }}>👨‍💻</span>
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
              ⚔ LEVEL 99 DEV ⚔
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
              I&apos;m a <span style={{ color: 'var(--cyan)' }}>Full-Stack Developer</span> with a passion for building meaningful products from the ground up. I specialize in the <span style={{ color: 'var(--cyan)' }}>MERN stack</span> and love crafting experiences that are fast, accessible, and delightful to use.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--text-dim)', lineHeight: 1.85 }}>
              When I&apos;m not pushing commits, you&apos;ll find me exploring new frameworks, contributing to open source, or sipping coffee while debugging something that <em>&quot;should've worked&quot;</em>.
            </p>
            <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '12px', color: 'var(--text-dim)' }}>
              📍 [Your City, Country] &nbsp;·&nbsp; 🎓 [Your University] &nbsp;·&nbsp; 💼 [Current Role]
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
    category: 'Frontend',
    icon: '🖥',
    skills: [
      { name: 'React', xp: 90, icon: '⚛' },
      { name: 'HTML / CSS', xp: 95, icon: '🎨' },
      { name: 'JavaScript', xp: 88, icon: '𝐉𝐒' },
      { name: 'Tailwind', xp: 82, icon: '💨' },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙',
    skills: [
      { name: 'Node.js', xp: 85, icon: '🟢' },
      { name: 'Express', xp: 83, icon: '🚂' },
      { name: 'MongoDB', xp: 80, icon: '🍃' },
      { name: 'REST APIs', xp: 87, icon: '🔌' },
    ],
  },
  {
    category: 'Tools',
    icon: '🛠',
    skills: [
      { name: 'Git', xp: 90, icon: '🌿' },
      { name: 'Docker', xp: 70, icon: '🐳' },
      { name: 'VS Code', xp: 95, icon: '💙' },
      { name: 'Postman', xp: 85, icon: '📮' },
    ],
  },
];

function SkillCard({ skill, groupVisible }) {
  const [hovered, setHovered] = useState(false);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (groupVisible) {
      const t = setTimeout(() => setBarWidth(skill.xp), 300);
      return () => clearTimeout(t);
    }
  }, [groupVisible, skill.xp]);

  return (
    <div
      onMouseEnter={() => { setHovered(true); setBarWidth(100); }}
      onMouseLeave={() => { setHovered(false); setBarWidth(skill.xp); }}
      style={{
        background: hovered ? 'rgba(0,245,255,0.05)' : 'var(--bg-card)',
        border: hovered ? '2px solid var(--cyan)' : '2px solid rgba(0,245,255,0.12)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? '0 0 20px rgba(0,245,255,0.1)' : 'none',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '18px' }}>{skill.icon}</span>
        <span style={{ fontFamily: '"Fira Code", monospace', fontSize: '13px', color: hovered ? 'var(--cyan)' : 'var(--text)', transition: 'color 0.25s ease' }}>
          {skill.name}
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: '"Press Start 2P", cursive', fontSize: '8px', color: 'var(--cyan-dim)' }}>
          {hovered ? '100' : skill.xp}%
        </span>
      </div>
      <div className="xp-bar-track">
        <div className="xp-bar-fill" style={{ width: `${barWidth}%` }} />
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" style={{ padding: '100px 24px', background: 'rgba(0,245,255,0.01)' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
        <RevealSection>
          <SectionHeader tag="[ SKILL TREE ]" sub="// Hover a card to MAX the XP bar" />
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {SKILL_GROUPS.map((group, gi) => (
            <RevealSection key={group.category} delay={gi * 0.12}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Group header */}
                <div style={{
                  fontFamily: '"Press Start 2P", cursive', fontSize: '10px',
                  color: 'var(--cyan)', letterSpacing: '1px',
                  borderBottom: '1px solid rgba(0,245,255,0.15)',
                  paddingBottom: '10px', marginBottom: '4px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <span>{group.icon}</span> {group.category}
                </div>
                {group.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} groupVisible={true} />
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
//  SECTION 4 — PROJECTS
// ══════════════════════════════════════════════════════════
const PLACEHOLDER_PROJECTS = [
  {
    _id: 'p1', title: '[Project Alpha]',
    description: 'A full-stack web app built with React and Node.js. Features real-time updates, authentication, and a clean dark dashboard.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.IO'], liveUrl: '#', repoUrl: '#',
  },
  {
    _id: 'p2', title: '[Project Beta]',
    description: 'REST API powering a mobile-first e-commerce platform with JWT auth, image uploads, and Stripe payments.',
    techStack: ['Express', 'PostgreSQL', 'Docker', 'Stripe'], liveUrl: '#', repoUrl: '#',
  },
  {
    _id: 'p3', title: '[Project Gamma]',
    description: 'CLI tool that auto-generates boilerplate code for microservices. Saved 40+ hours across projects.',
    techStack: ['Node.js', 'TypeScript', 'Commander.js'], liveUrl: '#', repoUrl: '#',
  },
];

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        border: hovered ? '2px solid var(--cyan)' : '2px solid rgba(0,245,255,0.15)',
        boxShadow: hovered ? '0 0 30px rgba(0,245,255,0.1), 0 10px 40px rgba(0,0,0,0.4)' : 'none',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Image area */}
      <div style={{
        height: '170px',
        background: 'linear-gradient(135deg, #0d0d1a 0%, #111130 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '1px solid rgba(0,245,255,0.08)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,245,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.04) 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
        <span style={{ fontFamily: '"Fira Code", monospace', fontSize: '10px', color: 'rgba(0,245,255,0.3)', letterSpacing: '2px', position: 'relative', zIndex: 1 }}>[ PROJECT SCREENSHOT ]</span>
      </div>

      <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '10px', color: 'var(--cyan)', lineHeight: 1.6, margin: 0 }}>
          {project.title}
        </h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.7, flex: 1, margin: 0 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {(project.techStack || []).map(t => <span key={t} className="tech-tag">{t}</span>)}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-pixel-sm" aria-label={`Live demo of ${project.title}`}>
              <span>▶ Live Demo</span>
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-pixel-ghost" style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '8px', padding: '10px 16px' }} aria-label={`View code of ${project.title}`}>
              {'</> Code'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getProjects()
      .then(data => setProjects(data?.length ? data : PLACEHOLDER_PROJECTS))
      .catch(() => setProjects(PLACEHOLDER_PROJECTS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" style={{ padding: '100px 24px', maxWidth: '1152px', margin: '0 auto' }}>
      <RevealSection>
        <SectionHeader tag="[ QUEST LOG ]" sub="// Select a quest to view details" />
      </RevealSection>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', minHeight: '300px' }}>
          <div className="pixel-spinner" />
          <span style={{ fontFamily: '"Fira Code", monospace', color: 'var(--text-dim)', fontSize: '13px' }}>Loading quests...</span>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {projects.map((project, i) => (
            <RevealSection key={project._id || i} delay={i * 0.1}>
              <ProjectCard project={project} />
            </RevealSection>
          ))}
        </div>
      )}
    </section>
  );
}

// ══════════════════════════════════════════════════════════
//  SECTION 5 — CONTACT
// ══════════════════════════════════════════════════════════
const SOCIALS = [
  { href: 'https://github.com', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://linkedin.com', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
  { href: 'mailto:you@example.com', icon: 'fas fa-envelope', label: 'Email' },
  { href: 'https://twitter.com', icon: 'fab fa-twitter', label: 'Twitter' },
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
      toast.success('Message sent! I will get back to you soon.');
      setFormData({ name: '', email: '', content: '' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = { fontFamily: '"Fira Code", monospace', fontSize: '11px', color: 'var(--cyan-dim)', letterSpacing: '1px', display: 'block', marginBottom: '8px' };

  return (
    <section id="contact" style={{ padding: '100px 24px', background: 'rgba(0,245,255,0.01)' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <RevealSection>
          <SectionHeader tag="[ SEND MESSAGE ]" sub="// Don't be shy. Even NPCs talk to strangers." />
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
                placeholder="[How can I help you?]"
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
            // Or reach me via:
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
      <span className="hidden md:inline">SAVE GAME</span>
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
      <ProjectsSection />
      <PixelDivider />
      <ContactSection />
      <ResumeFloatingButton />
    </div>
  );
}
