import { useState } from 'react';
import Card from './Card';

const projects = [
  { title: "Proiect 1", description: "Pagina personala" },
  { title: "Proiect 2", description: "Calculator buget" },
  { title: "Proiect 3", description: "Dashboard React" },
];
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Ai apasat de {count} ori</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>


      {projects.map(function (item, index) {
        return <Card key={index} title={item.title} description={item.description} />;
      })}
    </div>
  );
}


export default App;