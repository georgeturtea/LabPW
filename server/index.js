const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

const projects = [
  { id: 1, title: 'Pagina Personala', tech: 'HTML, CSS', done: true },
  { id: 2, title: 'Calculator Buget', tech: 'JS', done: true },
  { id: 3, title: 'Dashboard React', tech: 'React', done: false },
  { id: 4, title: 'API Meteo', tech: 'React, API', done: true },
];

app.get('/', function (req, res) {
  res.json({ message: 'Serverul functioneaza!' });
});

app.get('/api/projects', function (req, res) {
  res.json(projects);
});

app.get('/api/projects/:id', function (req, res) {
  const id = parseInt(req.params.id, 10);
  const project = projects.find(function (p) {
    return p.id === id;
  });

  if (!project) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.json(project);
});

app.get('/api/stats', function (req, res) {
  const done = projects.filter(function (p) {
    return p.done;
  }).length;

  const inWork = projects.filter(function (p) {
    return !p.done;
  }).length;

  res.json({
    total: projects.length,
    done: done,
    inWork: inWork,
  });
});

app.post('/api/projects', function (req, res) {
  const newProject = {
    id: projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1,
    title: req.body.title,
    tech: req.body.tech,
    done: req.body.done || false,
  };

  projects.push(newProject);
  res.status(201).json(newProject);
});

app.delete('/api/projects/:id', function (req, res) {
  const id = parseInt(req.params.id, 10);
  const index = projects.findIndex(function (p) {
    return p.id === id;
  });

  if (index === -1) {
    return res.status(404).json({ error: 'Not found' });
  }

  projects.splice(index, 1);
  res.json({ message: 'Deleted' });
});

app.put('/api/projects/:id', function (req, res) {
  const id = parseInt(req.params.id, 10);
  const project = projects.find(function (p) {
    return p.id === id;
  });

  if (!project) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (typeof req.body.title !== 'undefined') {
    project.title = req.body.title;
  }
  if (typeof req.body.tech !== 'undefined') {
    project.tech = req.body.tech;
  }
  if (typeof req.body.done !== 'undefined') {
    project.done = req.body.done;
  }

  res.json(project);
});

app.listen(PORT, function () {
  console.log('Server pornit pe http://localhost:' + PORT);
});
