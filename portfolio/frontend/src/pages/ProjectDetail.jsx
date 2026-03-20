import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import projectService from '../services/projectService';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getProject(id)
      .then(res => setProject(res.data || res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div className="pixel-spinner" />
          <span style={{ fontFamily: '"Fira Code", monospace', color: 'var(--text-dim)', fontSize: '13px' }}>
            Loading project data...
          </span>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Fira Code", monospace', color: 'var(--text-dim)' }}>
          // Project <code style={{ color: 'var(--cyan)' }}>{id}</code> not found.
        </p>
        <Link to="/projects" className="btn-pixel" style={{ display: 'inline-block', marginTop: '24px' }}>
          <span>← Back to Quests</span>
        </Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px' }}>
      {/* Breadcrumb */}
      <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '32px' }}>
        <Link to="/projects" style={{ color: 'var(--cyan-dim)', textDecoration: 'none' }}>Quest Log</Link>
        {' / '}
        <span style={{ color: 'var(--text)' }}>{project.title}</span>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: '"Press Start 2P", cursive',
        fontSize: 'clamp(16px, 3vw, 24px)',
        color: 'var(--cyan)',
        textShadow: '0 0 20px rgba(0,245,255,0.4)',
        marginBottom: '32px',
        lineHeight: 1.4,
      }}>
        {project.title}
      </h1>

      {/* Image placeholder */}
      <div style={{
        height: '280px',
        background: 'linear-gradient(135deg, #0d0d1a, #111130)',
        border: '2px solid rgba(0,245,255,0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '36px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <span style={{ fontFamily: '"Fira Code", monospace', fontSize: '12px', color: 'rgba(0,245,255,0.3)', letterSpacing: '2px', zIndex: 1 }}>
          [ PROJECT SCREENSHOT ]
        </span>
      </div>

      {/* Description */}
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'var(--text)', lineHeight: 1.85, marginBottom: '28px' }}>
        {project.description}
      </p>

      {/* Tech stack */}
      {project.techStack && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
          {project.techStack.map(t => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-pixel">
            <span>▶ Live Demo</span>
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-pixel-ghost">
            {'</> View Code'}
          </a>
        )}
        <Link to="/projects" className="btn-pixel-ghost">
          ← Back
        </Link>
      </div>
    </main>
  );
}
