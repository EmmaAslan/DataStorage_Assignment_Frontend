import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Projects from './pages/Projects';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
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