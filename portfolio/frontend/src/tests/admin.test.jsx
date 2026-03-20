import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminProjectForm from '../pages/AdminProjectForm';
import projectService from '../services/projectService';
import { toast } from 'react-hot-toast';

vi.mock('../services/projectService');
vi.mock('react-hot-toast');

const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => navigateMock, useParams: vi.fn().mockReturnValue({}) };
});

describe('AdminProjectForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('submits a new project successfully', async () => {
    projectService.createProject.mockResolvedValueOnce({ data: { _id: '1' } });

    render(
      <MemoryRouter>
        <AdminProjectForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/\[Project Title\]/i), { target: { value: 'New App' } });
    fireEvent.change(screen.getByPlaceholderText(/\[Brief project description...\]/i), { target: { value: 'A cool new app' } });

    // Test tags input
    fireEvent.change(screen.getByPlaceholderText(/React, Node.js, MongoDB/i), { target: { value: 'React, Node, Vite' } });

    fireEvent.click(screen.getByRole('button', { name: /> SAVE_PROJECT/i }));

    await waitFor(() => {
      expect(projectService.createProject).toHaveBeenCalledWith({
        title: 'New App',
        description: 'A cool new app',
        image: '',
        technologies: ['React', 'Node', 'Vite'],
        liveUrl: '',
        repoUrl: ''
      });
      expect(toast.success).toHaveBeenCalledWith('Project saved successfully');
      expect(navigateMock).toHaveBeenCalledWith('/admin');
    });
  });
});