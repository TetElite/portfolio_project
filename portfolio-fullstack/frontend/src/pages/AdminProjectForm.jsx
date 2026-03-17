import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import projectService from '../services/projectService';
import ProjectForm from '../components/ProjectForm';
import toast from 'react-hot-toast';

export default function AdminProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      projectService.getProject(id)
        .then(res => setInitialData(res.data || res))
        .catch(err => {
          console.error(err);
          toast.error('Failed to load project');
        });
    }
  }, [id, isEditMode]);

  const handleSubmit = async data => {
    setLoading(true);
    try {
      if (isEditMode) {
        await projectService.updateProject(id, data);
        toast.success('Project updated successfully');
      } else {
        await projectService.createProject(data);
        toast.success('Project saved successfully');
      }
      navigate('/admin');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
        <h1 className="section-tag">
          {isEditMode ? '[ EDIT QUEST ]' : '[ NEW QUEST ]'}
        </h1>
        <div className="section-line" />
      </div>
      <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '36px' }}>
        {isEditMode ? '// Modify the quest details below' : '// Define a new quest to add to your log'}
      </p>

      {/* Form wrapper */}
      <div style={{
        background: 'var(--bg-card)',
        border: '2px solid rgba(0,245,255,0.15)',
        padding: '36px',
      }}>
        <ProjectForm initialData={initialData} onSubmit={handleSubmit} loading={loading} />
      </div>
    </main>
  );
}