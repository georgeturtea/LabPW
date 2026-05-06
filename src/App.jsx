import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <h1>Dashboard React - Lab 8</h1>
          <p>Navigare intre pagini cu React Router</p>
        </header>

        <Navbar />

        <main className="route-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;