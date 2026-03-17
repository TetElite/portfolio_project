import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <Link
          to="/admin/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          + New Project
        </Link>
      </div>
      <p className="text-gray-500">Project list will be loaded here in Phase 10.</p>
    </main>
  );
}

export default AdminDashboard;
