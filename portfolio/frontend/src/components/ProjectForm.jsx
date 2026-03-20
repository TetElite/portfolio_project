import { useState, useEffect } from 'react';

const FIELDS = [
  { name: 'title', label: 'TITLE_', placeholder: '[Project Title]', type: 'text', required: true },
  { name: 'description', label: 'DESCRIPTION_', placeholder: '[Brief project description...]', type: 'textarea' },
  { name: 'image', label: 'IMAGE_URL_', placeholder: 'https://...', type: 'text' },
  { name: 'technologies', label: 'TECH_STACK_', placeholder: 'React, Node.js, MongoDB', type: 'text' },
  { name: 'liveUrl', label: 'LIVE_URL_', placeholder: 'https://...', type: 'text' },
  { name: 'repoUrl', label: 'REPO_URL_', placeholder: 'https://github.com/...', type: 'text' },
];

export default function ProjectForm({ initialData, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    title: '', description: '', image: '', technologies: '', liveUrl: '', repoUrl: '',
  });
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    if (initialData) {
      setTimeout(() => {
        setFormData({
          ...initialData,
          technologies: Array.isArray(initialData.technologies)
            ? initialData.technologies.join(', ')
            : initialData.technologies || '',
        });
      }, 0);
    }
  }, [initialData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
    });
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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {FIELDS.map(({ name, label, placeholder, type, required }) => (
        <div key={name}>
          <label htmlFor={name} style={labelStyle}>&gt; {label}</label>
          {type === 'textarea' ? (
            <textarea
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              onFocus={() => setFocused(name)}
              onBlur={() => setFocused(null)}
              placeholder={placeholder}
              rows={4}
              className="input-pixel"
              style={{
                resize: 'vertical',
                borderColor: focused === name ? 'var(--cyan)' : undefined,
              }}
            />
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              required={required}
              value={formData[name]}
              onChange={handleChange}
              onFocus={() => setFocused(name)}
              onBlur={() => setFocused(null)}
              placeholder={placeholder}
              className="input-pixel"
              style={{ borderColor: focused === name ? 'var(--cyan)' : undefined }}
            />
          )}
        </div>
      ))}

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
        <span>{loading ? '// SAVING...' : '> SAVE_PROJECT'}</span>
      </button>
    </form>
  );
}