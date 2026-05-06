import { useState } from 'react';
import './App.css';
import Card from './Card';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ContactForm from './ContactForm';
import Clock from './Clock';

const projects = [
  { title: "Proiect 1", description: "Pagina personala" },
  { title: "Proiect 2", description: "Calculator buget" },
  { title: "Proiect 3", description: "Dashboard React" },
];
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Dashboard React - Lab 5</h1>
        <p>Exercitii cu useState, useEffect si input controlat</p>
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
        <h2>Proiecte</h2>
        <div className="project-grid">
          {projects.map(function (item, index) {
            return <Card key={index} title={item.title} description={item.description} />;
          })}
        </div>
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