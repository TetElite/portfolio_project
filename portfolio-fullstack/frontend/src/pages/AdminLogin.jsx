import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const { login } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!login) return;
    setLoading(true);
    try {
      await login(formData);
      toast.success('Access granted. Welcome back.');
      navigate('/admin');
    } catch {
      toast.error('Access denied. Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = {
    fontFamily: '"Fira Code", monospace',
    fontSize: '11px',
    color: 'var(--cyan-dim)',
    letterSpacing: '1px',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'var(--bg)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'var(--bg-card)',
          border: '2px solid rgba(0,245,255,0.2)',
          padding: '40px 36px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '11px',
            color: 'var(--text-dim)',
            marginBottom: '8px',
          }}>
            // RESTRICTED AREA
          </div>
          <h1 style={{
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '16px',
            color: 'var(--cyan)',
            textShadow: '0 0 16px rgba(0,245,255,0.5)',
            margin: 0,
          }}>
            ADMIN LOGIN
          </h1>
          <div className="pixel-divider" style={{ marginTop: '20px' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="email" style={labelStyle}>&gt; EMAIL_</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              placeholder="admin@email.com"
              className="input-pixel"
              style={{ borderColor: focused === 'email' ? 'var(--cyan)' : undefined }}
            />
          </div>

          <div>
            <label htmlFor="password" style={labelStyle}>&gt; PASSWORD_</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              placeholder="••••••••"
              className="input-pixel"
              style={{ borderColor: focused === 'password' ? 'var(--cyan)' : undefined }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-pixel"
            style={{
              width: '100%',
              textAlign: 'center',
              marginTop: '8px',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            <span>{loading ? '// AUTHENTICATING...' : '> ENTER_SYSTEM'}</span>
          </button>
        </form>
      </div>
    </main>
  );
}
