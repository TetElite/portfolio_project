const express = require('express');
const { body } = require('express-validator');
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Reusable title validation rule
const titleRequired = body('title').notEmpty().withMessage('Project title is required');

// ── Public routes ──────────────────────────────────────────────────────────
// GET /api/projects
router.get('/', getAllProjects);

// GET /api/projects/:id
router.get('/:id', getProjectById);

// ── Protected routes (admin only) ──────────────────────────────────────────
// POST /api/projects
router.post('/', protect, [titleRequired], createProject);

// PUT /api/projects/:id
router.put('/:id', protect, [titleRequired], updateProject);

// DELETE /api/projects/:id
router.delete('/:id', protect, deleteProject);

module.exports = router;
