import { useParams } from 'react-router-dom';

function ProjectDetail() {
  const { id } = useParams();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Detail</h1>
      <p className="text-gray-500">Loading project <code>{id}</code>... (Phase 9)</p>
    </main>
  );
}

export default ProjectDetail;
