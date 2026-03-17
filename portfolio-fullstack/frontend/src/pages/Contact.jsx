import { useState } from 'react';
import contactService from '../services/contactService';
import toast from 'react-hot-toast';

const SOCIALS = [
  { href: 'https://github.com', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://linkedin.com', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
  { href: 'mailto:you@example.com', icon: 'fas fa-envelope', label: 'Email' },
  { href: 'https://twitter.com', icon: 'fab fa-twitter', label: 'Twitter' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  const labelStyle = {
    fontFamily: '"Fira Code", monospace',
    fontSize: '11px',
    color: 'var(--cyan-dim)',
    letterSpacing: '1px',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px' }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
        <h1 className="section-tag">[ SEND MESSAGE ]</h1>
        <div className="section-line" />
      </div>

      {/* Flavor text */}
      <p style={{
        fontFamily: '"Fira Code", monospace',
        fontSize: '13px',
        color: 'var(--text-dim)',
        marginBottom: '40px',
      }}>
        {'// Don\'t be shy. Even NPCs talk to strangers.'}
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'var(--bg-card)',
          border: '2px solid rgba(0,245,255,0.18)',
          padding: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {/* Name */}
        <div>
          <label htmlFor="name" style={labelStyle}>
            &gt; NAME_
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            placeholder="[Your Name]"
            className="input-pixel"
            style={{ borderColor: focusedField === 'name' ? 'var(--cyan)' : undefined }}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" style={labelStyle}>
            &gt; EMAIL_
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            placeholder="[your@email.com]"
            className="input-pixel"
            style={{ borderColor: focusedField === 'email' ? 'var(--cyan)' : undefined }}
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="content" style={labelStyle}>
            &gt; MESSAGE_
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={6}
            value={formData.content}
            onChange={handleChange}
            onFocus={() => setFocusedField('content')}
            onBlur={() => setFocusedField(null)}
            placeholder="[How can I help you?]"
            className="input-pixel"
            style={{
              resize: 'vertical',
              borderColor: focusedField === 'content' ? 'var(--cyan)' : undefined,
            }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-pixel"
          style={{
            width: '100%',
            textAlign: 'center',
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          aria-label="Send message"
        >
          <span>{loading ? '// TRANSMITTING...' : '> SEND_MESSAGE'}</span>
        </button>
      </form>

      {/* Social icons */}
      <div>
        <p style={{
          fontFamily: '"Fira Code", monospace',
          fontSize: '12px',
          color: 'var(--text-dim)',
          marginBottom: '20px',
          letterSpacing: '1px',
        }}>
          // Or reach me via:
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