import { Link, NavLink } from 'react-router-dom';

// In Phase 8 this will be replaced by useAuth() from AuthContext
// Guard against test environments where localStorage may not be available
const getIsAuthenticated = () => {
  if (typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function') return false;
  return Boolean(localStorage.getItem('token'));
};

function Header() {
  const isAuthenticated = getIsAuthenticated();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          My Portfolio
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900 transition-colors'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900 transition-colors'
            }
          >
            Projects
          </NavLink>

          {isAuthenticated ? (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900 transition-colors'
              }
            >
              Admin
            </NavLink>
          ) : (
            <NavLink
              to="/admin/login"
              className={({ isActive }) =>
                isActive
                  ? 'bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold'
                  : 'bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors'
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
