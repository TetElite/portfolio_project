const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // URL to the project screenshot
      trim: true,
    },
    technologies: {
      type: [String], // e.g. ["React", "Node.js", "MongoDB"]
      default: [],
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    repoUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
