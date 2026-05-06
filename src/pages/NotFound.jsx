import { Link } from 'react-router';

function NotFound() {
  return (
    <div className="panel">
      <h2>404 - Pagina nu exista</h2>
      <p>URL-ul accesat nu este valid.</p>
      <Link to="/">Inapoi la Home</Link>
    </div>
  );
}

export default NotFound;
