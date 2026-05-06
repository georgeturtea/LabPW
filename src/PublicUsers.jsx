import { useEffect, useState } from 'react';

function PublicUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(function () {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
      })
      .then(function (data) {
        setUsers(data);
        setLoading(false);
      })
      .catch(function () {
        setError('Eroare la incarcarea utilizatorilor');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Se incarca utilizatorii...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  const filteredUsers = users.filter(function (user) {
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <h3>Utilizatori API public</h3>
      <input
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cauta utilizator..."
      />

      <ul className="user-list">
        {filteredUsers.map(function (user) {
          return (
            <li key={user.id} className="user-item">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PublicUsers;