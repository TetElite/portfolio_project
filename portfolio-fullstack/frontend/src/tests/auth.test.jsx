import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

describe('Authentication Flow', () => {
  it('ProtectedRoute redirects to login when no user is present', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <AuthContext.Provider value={{ user: null, loading: false }}>
          <Routes>
            <Route path="/admin" element={<ProtectedRoute><div>Secret Dashboard</div></ProtectedRoute>} />
            <Route path="/admin/login" element={<div>Login Page</div>} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Secret Dashboard')).not.toBeInTheDocument();
  });

  it('ProtectedRoute renders children when user is authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <AuthContext.Provider value={{ user: { name: 'Admin' }, loading: false }}>
          <Routes>
            <Route path="/admin" element={<ProtectedRoute><div>Secret Dashboard</div></ProtectedRoute>} />
            <Route path="/admin/login" element={<div>Login Page</div>} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('Secret Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
