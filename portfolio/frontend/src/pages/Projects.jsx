import { useEffect, useState, useRef } from 'react';
import projectService from '../services/projectService';

const PLACEHOLDER_PROJECTS = [
  {
    _id: 'p1',
    title: '[Project Alpha]',
    description: 'A full-stack web app built with React and Node.js. Features real-time updates, authentication, and a clean dark dashboard.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    _id: 'p2',
    title: '[Project Beta]',
    description: 'REST API service powering a mobile-first e-commerce platform with JWT auth, image uploads, and Stripe payments.',
    techStack: ['Express', 'PostgreSQL', 'Docker', 'Stripe'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    _id: 'p3',
    title: '[Project Gamma]',
    description: 'CLI tool that auto-generates boilerplate code for microservices. Saved 40+ hours of setup time across projects.',
    techStack: ['Node.js', 'TypeScript', 'Commander.js'],
    liveUrl: '#',
    repoUrl: '#',
  },
];

function ProjectCard({ project, delay }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);
  const videoSrcCandidate = project?.media && project.media.startsWith('/photos/')
    ? project.media.replace('/photos/', '/video/')
    : project?.media;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        border: hovered ? '2px solid var(--cyan)' : '2px solid rgba(0,245,255,0.18)',
        boxShadow: hovered ? '0 0 30px rgba(0,245,255,0.12), 0 8px 40px rgba(0,0,0,0.4)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        width: '320px',
        height: '420px',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? '0s' : `${delay}ms`,
      }}
    >
      {/* Image placeholder */}
      <div
        style={{
          height: '180px',
          background: 'linear-gradient(135deg, #0d0d1a 0%, #111130 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(0,245,255,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid overlay inside card image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
        {project.media && project.mediaType === 'video' ? (
          <video
            ref={videoRef}
            src={videoSrcCandidate}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { if (project.media) e.currentTarget.src = project.media; }}
          />
        ) : (
          <span style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: '11px',
            color: 'rgba(0,245,255,0.35)',
            letterSpacing: '2px',
            position: 'relative',
            zIndex: 1,
          }}>
            [ PROJECT SCREENSHOT ]
          </span>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Title */}
        <h3 style={{
          fontFamily: '"Press Start 2P", cursive',
          fontSize: '11px',
          color: 'var(--cyan)',
          lineHeight: 1.5,
          margin: 0,
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          color: 'var(--text-dim)',
          lineHeight: 1.7,
          flex: 1,
          margin: 0,
        }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {(project.techStack || (project.tech ? project.tech.split(',') : [])).map(t => (
            <span key={t} className="tech-tag">{t.trim()}</span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pixel-sm"
              aria-label={`Live demo of ${project.title}`}
            >
              <span>▶ Live Demo</span>
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pixel-ghost"
              style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '8px', padding: '10px 18px' }}
              aria-label={`View code of ${project.title}`}
            >
              {'</> Code'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getProjects()
      .then(data => setProjects(data && data.length ? data : PLACEHOLDER_PROJECTS))
      .catch(() => setProjects(PLACEHOLDER_PROJECTS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ maxWidth: '1152px', margin: '0 auto', padding: '64px 24px' }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <h1 className="section-tag">[ QUEST LOG ]</h1>
          {/* <div className="section-line" /> */}
      </div>
      <p style={{
        fontFamily: '"Fira Code", monospace',
        fontSize: '13px',
        color: 'var(--text-dim)',
        marginBottom: '48px',
      }}>
        // Select a quest to view details
      </p>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', minHeight: '300px' }}>
          <div className="pixel-spinner" />
          <span style={{ fontFamily: '"Fira Code", monospace', color: 'var(--text-dim)', fontSize: '13px' }}>
            Loading quests...
          </span>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project._id || project.id || i}
              project={project}
              delay={i * 120}
            />
          ))}
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ fontFamily: '"Fira Code", monospace', color: 'var(--text-dim)', fontSize: '14px' }}>
            // No quests found. Check back later.
          </p>
        </div>
      )}
    </main>
  );
}
