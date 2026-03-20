import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminProjectForm from '../pages/AdminProjectForm';
import AdminDashboard from '../pages/AdminDashboard';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import ProjectDetail from '../pages/ProjectDetail';
import { AuthContext } from '../context/AuthContext';

vi.mock('../services/projectService', () => ({
  default: {
    getProjects: vi.fn(() => Promise.resolve([])),
    getProjectById: vi.fn(() => Promise.resolve({ id: '1', title: 'test' }))
  }
}));
vi.mock('react-hot-toast');

describe('AdminDashboard page', () => {
  it('renders loading', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ logout: vi.fn(), user: { name: 'Admin'}, loading: false }}>
          <AdminDashboard />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading dashboard/i)).toBeInTheDocument();
  });
});
