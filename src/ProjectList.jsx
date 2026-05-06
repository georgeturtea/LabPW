import { useEffect, useState } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(function () {
    fetch('/data/projects.json')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
      })
      .then(function (data) {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(function () {
        setError('Eroare la incarcarea datelor');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Se incarca...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  const filteredProjects = projects.filter(function (p) {
    return p.title.toLowerCase().includes(search.toLowerCase());
  });

  const doneCount = projects.filter(function (p) {
    return p.done;
  }).length;

  const inWorkCount = projects.filter(function (p) {
    return !p.done;
  }).length;

  return (
    <div>
      <h3>Proiecte</h3>
      <input
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cauta proiect dupa titlu..."
      />

      <div className="project-grid">
        {filteredProjects.map(function (project) {
          return (
            <div key={project.id}>
              <Card
                title={project.title}
                description={'Tech: ' + project.tech}
              />
              <p className="status-chip">
                {project.done ? 'Finalizat' : 'In lucru'}
              </p>
            </div>
          );
        })}
      </div>

      <div className="stats-box">
        <p>Total proiecte: {projects.length}</p>
        <p>Finalizate: {doneCount}</p>
        <p>In lucru: {inWorkCount}</p>
      </div>
    </div>
  );
}

export default ProjectList;