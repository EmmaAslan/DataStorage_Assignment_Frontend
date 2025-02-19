// Använde Claude 3.5 Sonnet för att skapa det mesta av UI och funktionalitet.
import { useNavigate } from 'react-router-dom';
import '../styling/TopBar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="topbar">
      <div className="topbar-brand">  
        <h1
        onClick={() => navigate('/')} style={{ cursor: "pointer"}}>Mattin-Lassei Group AB</h1>
      </div>
    </nav>
  );
}

export default Navbar;