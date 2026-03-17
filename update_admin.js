const fs = require('fs');

const dashboardCode = `import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import projectService from '../services/projectService';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (err) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        toast.success('Project deleted successfully');
        setProjects(projects.filter(p => (p._id || p.id) !== id));
      } catch (err) {
        toast.error('Failed to delete project');
      }
    }
  };

  if (loading) return <div className="text-center py-20">Loading dashboard...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="space-x-4">
          <Link to="/admin/projects/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Add New Project
          </Link>
          <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project._id || project.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{project.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link to={\`/admin/projects/\${project._id || project.id}/edit\`} className="text-blue-600 hover:text-blue-900">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(project._id || project.id)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">No projects found. Create one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('/Users/macbook/Desktop/Personal_Learn/portfolio_project/portfolio-fullstack/frontend/src/pages/AdminDashboard.jsx', dashboardCode);
console.log('AdminDashboard.jsx Created');
