import { useEffect, useState } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');
  const [submitError, setSubmitError] = useState(null);

  useEffect(function () {
    async function loadProjects() {
      try {
        setError(null);
        const response = await fetch('http://localhost:3000/api/projects');

        if (!response.ok) {
          throw new Error('Serverul nu a raspuns corect');
        }

        const data = await response.json();
        setProjects(data);
      } catch {
        setError('Eroare: serverul nu raspunde. Verifica daca Express ruleaza pe portul 3000.');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === '' || tech.trim() === '') {
      setSubmitError('Completeaza title si tech.');
      return;
    }

    try {
      setSubmitError(null);
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, tech: tech }),
      });

      if (!response.ok) {
        throw new Error('Nu s-a putut salva proiectul');
      }

      const newProject = await response.json();
      setProjects(function (currentProjects) {
        return [...currentProjects, newProject];
      });
      setTitle('');
      setTech('');
    } catch {
      setSubmitError('Eroare la salvare. Verifica daca API-ul este pornit.');
    }
  }

  async function handleDelete(id) {
    try {
      setSubmitError(null);
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Nu s-a putut sterge proiectul');
      }

      setProjects(function (currentProjects) {
        return currentProjects.filter(function (p) {
          return p._id !== id;
        });
      });
    } catch {
      setSubmitError('Eroare la stergere. Verifica daca API-ul este pornit.');
    }
  }

  if (loading) {
    return <p>Se încarcă...</p>;
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
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titlu proiect"
        />
        <input
          type="text"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          placeholder="Tehnologii"
        />
        <button type="submit">Adauga proiect</button>
      </form>
      {submitError ? <p className="error-text">{submitError}</p> : null}

      <input
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cauta proiect dupa titlu..."
      />

      <div className="project-grid">
        {filteredProjects.map(function (project) {
          return (
            <div key={project._id}>
              <Card
                title={project.title}
                description={'Tech: ' + project.tech}
              />
              <p className="status-chip">
                {project.done ? 'Finalizat' : 'In lucru'}
              </p>
              <button type="button" onClick={() => handleDelete(project._id)}>
                Sterge
              </button>
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