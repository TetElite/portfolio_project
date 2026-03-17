import { Navigate } from 'react-router-dom';

// Phase 8 will replace this with useAuth() from AuthContext
// Guard against test environments where localStorage may not be available
const getIsAuthenticated = () => {
  if (typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function') return false;
  return Boolean(localStorage.getItem('token'));
};

// Renders children if authenticated, otherwise redirects to /admin/login
function ProtectedRoute({ children }) {
  if (!getIsAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
