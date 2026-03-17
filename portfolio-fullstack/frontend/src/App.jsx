import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// ── Lazy load pages ───────────────────────────────────────
const Home = lazy(() => import('./pages/Home'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminProjectForm = lazy(() => import('./pages/AdminProjectForm'));

// ── Page loader spinner (pixel-themed) ────────────────────
const PageLoader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '16px' }}>
    <div className="pixel-spinner" />
    <span style={{ fontFamily: '"Fira Code", monospace', fontSize: '12px', color: 'var(--text-dim)', letterSpacing: '1px' }}>
      // LOADING...
    </span>
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Public single-page portfolio ──────────────── */}
        <Route path="/" element={<Layout><Home /></Layout>} />

        {/* ── Admin routes (hidden from public nav) ─────── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/projects/new" element={<ProtectedRoute><AdminProjectForm /></ProtectedRoute>} />
        <Route path="/admin/projects/:id/edit" element={<ProtectedRoute><AdminProjectForm /></ProtectedRoute>} />
      </Routes>
    </Suspense>
  );
}

export default App;
