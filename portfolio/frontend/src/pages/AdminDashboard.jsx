import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import projectService from '../services/projectService';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this project? This action cannot be undone.')) return;
    try {
      await projectService.deleteProject(id);
      toast.success('Project deleted');
      setProjects(projects.filter(p => (p._id || p.id) !== id));
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete project');
    }
  };

  return (
    <main style={{ maxWidth: '1152px', margin: '0 auto', padding: '48px 24px' }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h1 className="section-tag">[ ADMIN PANEL ]</h1>
            <div className="section-line" style={{ maxWidth: '200px' }} />
          </div>
          <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '12px', color: 'var(--text-dim)', marginTop: '6px' }}>
            // Manage your quest log entries
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            to="/admin/projects/new"
            className="btn-pixel"
            style={{ fontSize: '9px', padding: '11px 20px' }}
          >
            <span>+ New Project</span>
          </Link>
          <button
            onClick={logout}
            className="btn-pixel-ghost"
            style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '9px', padding: '11px 20px' }}
          >
            ⏏ Logout
          </button>
        </div>
      </div>

      {/* Table card */}
      <div style={{
        background: 'var(--bg-card)',
        border: '2px solid rgba(0,245,255,0.15)',
        overflow: 'hidden',
      }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '60px' }}>
            <div className="pixel-spinner" />
            <span style={{ fontFamily: '"Fira Code", monospace', color: 'var(--text-dim)', fontSize: '13px' }}>
              Loading dashboard...
            </span>
          </div>
        ) : (
          <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(0,245,255,0.03)' }}>
                <th>Project</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id || project.id}>
                  <td>
                    <div style={{ color: 'var(--text)', fontWeight: 500 }}>{project.title}</div>
                    {project.techStack && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                        {project.techStack.slice(0, 3).map(t => (
                          <span key={t} className="tech-tag" style={{ fontSize: '10px', padding: '2px 8px' }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <Link
                        to={`/admin/projects/${project._id || project.id}/edit`}
                        style={{
                          fontFamily: '"Fira Code", monospace',
                          fontSize: '12px',
                          color: 'var(--cyan)',
                          textDecoration: 'none',
                          padding: '4px 12px',
                          border: '1px solid rgba(0,245,255,0.3)',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(project._id || project.id)}
                        style={{
                          fontFamily: '"Fira Code", monospace',
                          fontSize: '12px',
                          color: 'var(--red)',
                          background: 'transparent',
                          border: '1px solid rgba(248,113,113,0.3)',
                          cursor: 'pointer',
                          padding: '4px 12px',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {projects.length === 0 && (
                <tr>
                  <td colSpan={2} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-dim)' }}>
                    // No projects yet. Create your first quest!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
