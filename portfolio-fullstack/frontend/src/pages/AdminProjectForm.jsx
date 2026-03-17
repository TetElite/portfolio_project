import { useParams } from 'react-router-dom';

function AdminProjectForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        {isEditMode ? 'Edit Project' : 'New Project'}
      </h1>
      <p className="text-gray-500">Project form will be built in Phase 10.</p>
    </main>
  );
}

export default AdminProjectForm;
