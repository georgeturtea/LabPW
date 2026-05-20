import { useEffect, useState } from 'react';

function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function loadStats() {
      try {
        setError(null);
        const response = await fetch('http://localhost:3000/api/stats');

        if (!response.ok) {
          throw new Error('Serverul nu a raspuns corect');
        }

        const data = await response.json();
        setStats(data);
      } catch {
        setError('Eroare: serverul nu raspunde. Verifica daca Express ruleaza pe portul 3000.');
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="panel">
      <h2>Home</h2>
      <p>Bine ai venit pe dashboard-ul meu!</p>

      {loading && <p>Se încarcă statistici...</p>}
      {error && <p className="error-text">{error}</p>}
      {stats && (
        <div className="stats-box">
          <p>Total proiecte: {stats.total}</p>
          <p>Finalizate: {stats.done}</p>
          <p>In lucru: {stats.inProgress}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
