const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dashboard';

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectat la MongoDB!');
    app.listen(PORT, function () {
      console.log('Server pornit pe http://localhost:' + PORT);
    });
  } catch (err) {
    console.error('Eroare conectare MongoDB:', err.message);
    process.exit(1);
  }
}



app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.json({ message: 'Serverul functioneaza!' });
});

app.get('/api/projects', async function (req, res) {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Eroare ' + err });
  }
});

app.get('/api/projects/:id', async function (req, res) {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// app.get('/api/stats', function (req, res) {
//   const done = projects.filter(function (p) {
//     return p.done;
//   }).length;
//
//   const inWork = projects.filter(function (p) {
//     return !p.done;
//   }).length;
//
//   res.json({
//     total: projects.length,
//     done: done,
//     inWork: inWork,
//   });
// });

app.post('/api/projects', async function (req, res) {
  try {
    const newProject = new Project({
      title: req.body.title,
      tech: req.body.tech,
      done: req.body.done || false,
    });

    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', async function (req, res) {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/projects/:id', async function (req, res) {
  try {
    const update = {};

    if (typeof req.body.title !== 'undefined') {
      update.title = req.body.title;
    }
    if (typeof req.body.tech !== 'undefined') {
      update.tech = req.body.tech;
    }
    if (typeof req.body.done !== 'undefined') {
      update.done = req.body.done;
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

startServer();
