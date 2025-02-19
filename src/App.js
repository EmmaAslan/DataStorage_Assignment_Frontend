// Använde Claude 3.5 Sonnet för att skapa det mesta av funktionalitet.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Projects from './pages/Projects';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <TopBar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Projects />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/edit-project/:id" element={<EditProject />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;