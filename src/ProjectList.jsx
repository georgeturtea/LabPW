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
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTech, setEditTech] = useState('');
  const [statusFilter, setStatusFilter] = useState('toate');
  const [sortBy, setSortBy] = useState('data-desc');

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
    if (window.confirm('Sigur doriti sa stergeti acest proiect?')) {
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
  }

  async function handleToggle(id, currentDone) {
    try {
      setSubmitError(null);
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !currentDone }),
      });

      if (!response.ok) {
        throw new Error('Nu s-a putut actualiza statusul');
      }

      const updatedProject = await response.json();
      setProjects(function (currentProjects) {
        return currentProjects.map(function (p) {
          return p._id === id ? updatedProject : p;
        });
      });
    } catch {
      setSubmitError('Eroare la actualizare status. Verifica daca API-ul este pornit.');
    }
  }

  function handleEdit(id, currentTitle, currentTech) {
    setEditingId(id);
    setEditTitle(currentTitle);
    setEditTech(currentTech);
  }

  async function handleSave(id) {
    if (editTitle.trim() === '' || editTech.trim() === '') {
      setSubmitError('Completeaza title si tech.');
      return;
    }

    try {
      setSubmitError(null);
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, tech: editTech }),
      });

      if (!response.ok) {
        throw new Error('Nu s-a putut salva editarea');
      }

      const updatedProject = await response.json();
      setProjects(function (currentProjects) {
        return currentProjects.map(function (p) {
          return p._id === id ? updatedProject : p;
        });
      });
      setEditingId(null);
      setEditTitle('');
      setEditTech('');
    } catch {
      setSubmitError('Eroare la salvare editare. Verifica daca API-ul este pornit.');
    }
  }

  function handleCancel() {
    setEditingId(null);
    setEditTitle('');
    setEditTech('');
  }

  if (loading) {
    return <p>Se încarcă...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  let filteredProjects = projects.filter(function (p) {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'toate' || 
                          (statusFilter === 'finalizate' && p.done) ||
                          (statusFilter === 'inlucu' && !p.done);
    return matchesSearch && matchesStatus;
  });

  filteredProjects.sort(function (a, b) {
    if (sortBy === 'titlu-asc') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'titlu-desc') {
      return b.title.localeCompare(a.title);
    } else if (sortBy === 'data-asc') {
      return a._id.localeCompare(b._id);
    } else if (sortBy === 'data-desc') {
      return b._id.localeCompare(a._id);
    }
    return 0;
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

      <div className="filters-container">
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cauta proiect dupa titlu..."
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="toate">Toate proiectele</option>
          <option value="finalizate">Finalizate</option>
          <option value="inlucu">In lucru</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="data-desc">Data (Nou mai intai)</option>
          <option value="data-asc">Data (Vechi mai intai)</option>
          <option value="titlu-asc">Titlu (A-Z)</option>
          <option value="titlu-desc">Titlu (Z-A)</option>
        </select>
      </div>

      <div className="project-grid">
        {filteredProjects.map(function (project) {
          if (editingId === project._id) {
            return (
              <div key={project._id} className="editing-form">
                <h4>Editare proiect</h4>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Titlu proiect"
                />
                <input
                  type="text"
                  value={editTech}
                  onChange={(e) => setEditTech(e.target.value)}
                  placeholder="Tehnologii"
                />
                <button type="button" className="btn btn-save" onClick={() => handleSave(project._id)}>
                  Salveaza
                </button>
                <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                  Anuleaza
                </button>
              </div>
            );
          }

          return (
            <div key={project._id} className="project-item">
              <Card
                title={project.title}
                description={'Tech: ' + project.tech}
              />
              <p className={project.done ? 'status-chip status-done' : 'status-chip status-inwork'}>
                {project.done ? 'Finalizat' : 'In lucru'}
              </p>
              <div className="button-group">
                <button type="button" className="btn btn-toggle" onClick={() => handleToggle(project._id, project.done)}>
                  {project.done ? 'Marcheaza In lucru' : 'Marcheaza Finalizat'}
                </button>
                <button type="button" className="btn btn-edit" onClick={() => handleEdit(project._id, project.title, project.tech)}>
                  Editeaza
                </button>
                <button type="button" className="btn btn-delete" onClick={() => handleDelete(project._id)}>
                  Sterge
                </button>
              </div>
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