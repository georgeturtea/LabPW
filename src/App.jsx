import { useState } from 'react';
import './App.css';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ContactForm from './ContactForm';
import Clock from './Clock';
import ProjectList from './ProjectList';
import PublicUsers from './PublicUsers';
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Dashboard React - Lab 6</h1>
        <p>Fetch, incarcare date, filtrare si statistici</p>
      </header>

      <section className="panel counter-panel">
        <h2>Counter recap</h2>
        <p>Ai apasat de {count} ori</p>
        <div className="button-row">
          <button onClick={() => setCount(count + 1)}>+1</button>
          <button onClick={() => setCount(count - 1)}>-1</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>
      </section>

      <section className="panel">
        <ProjectList />
      </section>

      <section className="panel">
        <PublicUsers />
      </section>

      <section className="grid-two">
        <QuickNote />
        <TodoList />
      </section>

      <section className="grid-two">
        <ContactForm />
        <Clock />
      </section>
    </div>
  );
}


export default App;