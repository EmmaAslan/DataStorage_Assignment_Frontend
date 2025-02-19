import { useState, useEffect } from 'react';
import { projectAPI } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCalendarAlt, faUserTie, faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styling/Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectAPI.getAll();
        setProjects(response);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Projects</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }


  const handleEdit = (projectId) => {
    navigate(`/edit-project/${projectId}`);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Är du säker på att du vill ta bort detta projekt?')) {
      try {
        await projectAPI.delete(projectId);
        setProjects(projects.filter(project => project.id !== projectId));
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Kunde inte ta bort projektet');
      }
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="projects-container">
      <header className="projects-header">
        <h1>Projekt</h1>
        <button 
          className="add-project-btn"
          onClick={() => navigate('/add-project')}
          >+ Nytt Projekt</button>
      </header>
      
      <div className="projects-grid">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-card-header">
                <div className="project-card-title-status">
                  <h3>#P-{project.id} - {project.title}</h3>
                  <span className={`status-badge ${project.statusType?.statusName.toLowerCase()}`}>
                    {project.statusType?.statusName || 'Ingen status'}
                  </span>
                </div>
                <div className="project-actions">
                  <button 
                    className="icon-button edit"
                    onClick={() => handleEdit(project.id)}
                    title="Redigera projekt"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button 
                    className="icon-button delete"
                    onClick={() => handleDelete(project.id)}
                    title="Ta bort projekt"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>

              {project.description && (
                <div className="project-description">
                  <p>{project.description}</p>
                </div>
              )}
              <div className="project-details">
                <div className="detail-group">
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faCalendarAlt} className="detail-icon" />
                    <div>
                      <p>Start: {new Date(project.startDate).toLocaleDateString()}</p>
                      <p>Slut: {project.endDate ? new Date(project.endDate).toLocaleDateString() : '-'}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faCog} className="detail-icon" />
                    <div>
                      <p className="price">Pris: {project.totalPrice.toLocaleString("sv-SE")} kr</p>
                    </div>
                  </div>
                </div>
                <div className="detail-group">
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faUser} className="detail-icon" />
                    <div>
                      <p>Kund: {project.customer?.customerName || 'Ingen kund'}</p>
                      <p className="email">{project.customer?.email || ''}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faUserTie} className="detail-icon" />
                    <div>
                      <p>Projektledare: {
                        project.projectManager?.firstName && project.projectManager?.lastName
                          ? `${project.projectManager.firstName} ${project.projectManager.lastName}`
                          : 'Ingen projektledare'
                      }</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-projects">
            <p>Inga projekt hittades</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;