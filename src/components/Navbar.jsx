//Har använt mig av Claude 3.5 Sonnet för att starta upp strukturen till den här filen.

/* import { Link } from 'react-router-dom';
import '../styling/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div>  
        <h1>Mattin-Lassei Group AB - Projects</h1>
      </div>
      <div className="navbar-container">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">Projekt</Link>
          </li>
          <span>|</span>
          <li>
            {/* <Link to="/add-project" className="nav-link">Lägg till projekt</Link> 
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar; */

// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styling/Navbar.css';

function Navbar() {
  // const location = useLocation();
  const navigate = useNavigate();

  // // Helper function to check if link is active
  // const isActive = (path) => {
  //   return location.pathname === path ? 'active' : '';
  // };

  return (
    <nav className="navbar">
      <div className="navbar-brand">  
        <h1
        onClick={() => navigate('/')} style={{ cursor: "pointer"}}>Mattin-Lassei Group AB</h1>
      </div>
    </nav>
  );
}

export default Navbar;