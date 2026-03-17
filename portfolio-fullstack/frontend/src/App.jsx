import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// ── Public pages ───────────────────────────────────────────────
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';

// ── Admin pages ────────────────────────────────────────────────
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProjectForm from './pages/AdminProjectForm';

function App() {
  return (
    <Routes>
      {/* ── Public routes (wrapped in shared Layout) ── */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/projects"
        element={
          <Layout>
            <Projects />
          </Layout>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <Layout>
            <ProjectDetail />
          </Layout>
        }
      />

      {/* ── Admin login — no Layout (full-page design) ── */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ── Protected admin routes ── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects/new"
        element={
          <ProtectedRoute>
            <AdminProjectForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects/:id/edit"
        element={
          <ProtectedRoute>
            <AdminProjectForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
