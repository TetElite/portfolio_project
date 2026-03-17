const { validationResult } = require('express-validator');
const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getAllProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.json(project);
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Protected
const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, image, technologies, liveUrl, repoUrl } = req.body;

  const project = await Project.create({
    title,
    description,
    image,
    technologies,
    liveUrl,
    repoUrl,
  });

  res.status(201).json(project);
};

// @desc    Update an existing project
// @route   PUT /api/projects/:id
// @access  Protected
const updateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const { title, description, image, technologies, liveUrl, repoUrl } = req.body;

  // Only update fields that were actually sent
  if (title !== undefined) project.title = title;
  if (description !== undefined) project.description = description;
  if (image !== undefined) project.image = image;
  if (technologies !== undefined) project.technologies = technologies;
  if (liveUrl !== undefined) project.liveUrl = liveUrl;
  if (repoUrl !== undefined) project.repoUrl = repoUrl;

  const updated = await project.save();
  res.json(updated);
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Protected
const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  await project.deleteOne();
  res.json({ message: 'Project deleted' });
};

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };
