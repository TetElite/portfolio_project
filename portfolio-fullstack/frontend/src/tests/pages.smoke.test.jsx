import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Projects from '../pages/Projects';
import ProjectDetail from '../pages/ProjectDetail';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import AdminProjectForm from '../pages/AdminProjectForm';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Helper: renders any component inside a MemoryRouter
const renderWithRouter = (ui, { route = '/', path = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

// ─── Public pages ─────────────────────────────────────────────────────────────

describe('Home page', () => {
  it('renders without crashing', () => {
    renderWithRouter(<Home />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('shows a link to view projects', () => {
    renderWithRouter(<Home />);
    expect(screen.getByRole('link', { name: /view my projects/i })).toBeInTheDocument();
  });
});

describe('Projects page', () => {
  it('renders without crashing', () => {
    renderWithRouter(<Projects />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('shows the Projects heading', () => {
    renderWithRouter(<Projects />);
    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument();
  });
});

describe('ProjectDetail page', () => {
  it('renders without crashing', () => {
    renderWithRouter(<ProjectDetail />, {
      route: '/projects/123',
      path: '/projects/:id',
    });
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

// ─── Admin pages ──────────────────────────────────────────────────────────────

describe('AdminLogin page', () => {
  it('renders without crashing', () => {
    renderWithRouter(<AdminLogin />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('shows the Admin Login heading', () => {
    renderWithRouter(<AdminLogin />);
    expect(screen.getByRole('heading', { name: /admin login/i })).toBeInTheDocument();
  });
});

describe('AdminDashboard page', () => {
  it('renders without crashing', () => {
    renderWithRouter(<AdminDashboard />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('shows the New Project button', () => {
    renderWithRouter(<AdminDashboard />);
    expect(screen.getByRole('link', { name: /new project/i })).toBeInTheDocument();
  });
});

describe('AdminProjectForm — new mode', () => {
  it('renders without crashing', () => {
    renderWithRouter(<AdminProjectForm />, {
      route: '/admin/projects/new',
      path: '/admin/projects/new',
    });
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('shows "New Project" heading when no id param', () => {
    renderWithRouter(<AdminProjectForm />, {
      route: '/admin/projects/new',
      path: '/admin/projects/new',
    });
    expect(screen.getByRole('heading', { name: /new project/i })).toBeInTheDocument();
  });
});

describe('AdminProjectForm — edit mode', () => {
  it('shows "Edit Project" heading when an id param is present', () => {
    renderWithRouter(<AdminProjectForm />, {
      route: '/admin/projects/abc123/edit',
      path: '/admin/projects/:id/edit',
    });
    expect(screen.getByRole('heading', { name: /edit project/i })).toBeInTheDocument();
  });
});

// ─── Layout components ────────────────────────────────────────────────────────

describe('Header component', () => {
  it('renders without crashing', () => {
    renderWithRouter(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('shows Home and Projects nav links', () => {
    renderWithRouter(<Header />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
  });
});

describe('Footer component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

describe('Layout component', () => {
  it('renders header, children, and footer', () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>Page content</p>
        </Layout>
      </MemoryRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
