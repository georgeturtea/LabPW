const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tech: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
