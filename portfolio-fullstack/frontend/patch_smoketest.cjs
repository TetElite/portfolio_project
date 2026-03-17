const fs = require('fs');

let content = fs.readFileSync('/Users/macbook/Desktop/Personal_Learn/portfolio_project/portfolio-fullstack/frontend/src/tests/pages.smoke.test.jsx', 'utf8');

// add AuthContext import
if (!content.includes('AuthContext')) {
  content = content.replace("import AdminProjectForm from '../pages/AdminProjectForm';", "import AdminProjectForm from '../pages/AdminProjectForm';\nimport { AuthContext } from '../context/AuthContext';\nimport { vi } from 'vitest';");
}

// replace AdminDashboard renders with AuthProvider
content = content.replace(/renderWithRouter\(<AdminDashboard \/>\);/g, `renderWithRouter(
      <AuthContext.Provider value={{ logout: vi.fn(), user: { name: 'Admin'}, loading: false }}>
        <AdminDashboard />
      </AuthContext.Provider>
    );`);

fs.writeFileSync('/Users/macbook/Desktop/Personal_Learn/portfolio_project/portfolio-fullstack/frontend/src/tests/pages.smoke.test.jsx', content);
