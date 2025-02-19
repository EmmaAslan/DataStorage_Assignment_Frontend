import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectAPI, customerAPI, projectManagerAPI, serviceAPI, statusTypeAPI } from '../services/api';
import '../styling/EditProject.css';

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);
  const [services, setServices] = useState([]);
  const [statusTypes, setStatusTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          projectResponse,
          customersResponse,
          managersResponse,
          servicesResponse,
          statusResponse
        ] = await Promise.all([
          projectAPI.getById(id),
          customerAPI.getAll(),
          projectManagerAPI.getAll(),
          serviceAPI.getAll(),
          statusTypeAPI.getAll()
        ]);
        setProject(projectResponse);
        setCustomers(customersResponse || []);
        setProjectManagers(managersResponse || []);
        setServices(servicesResponse || []);
        setStatusTypes(statusResponse || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load project data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedProject = {
        ...project,
        totalPrice: parseFloat(project.totalPrice),
        customerId: parseInt(project.customerId),
        projectManagerId: parseInt(project.projectManagerId),
        serviceId: parseInt(project.serviceId),
        statusTypeId: parseInt(project.statusTypeId)
      };
      await projectAPI.update(id, formattedProject);
      navigate('/');
    } catch (error) {
      console.error('Error updating project:', error);
      setError('Failed to update project');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Laddar projekt...</p>
      </div>
    );
  }
    

  if (error) {
    return (
      <div className="error-container">
        <h2>Ett fel uppstod</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Gå tillbaka</button>
      </div>
    );
  }
    
  if (!project) {
    return (
      <div className="error-container">
        <h2>Projektet hittades inte</h2>
        <button onClick={() => navigate('/')}>Gå tillbaka</button>
      </div>
    );
  }
    

  return (
    <div className="edit-project-container">
      <h1>Redigera Projekt</h1>
      <form onSubmit={handleSubmit} className="edit-project-form">
        <div className="form-group">
          <label htmlFor="Title">Titel:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={project.title || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Beskrivning:</label>
          <textarea
            id="description"
            name="description"
            value={project.description || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Startdatum:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={project.startDate?.split('T')[0]}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">Slutdatum:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={project.endDate?.split('T')[0]}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="totalPrice">Pris (kr):</label>
          <input
            type="number"
            id="totalPrice"
            name="totalPrice"
            value={project.totalPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerId">Kund:</label>
          <select
            id="customerId"
            name="customerId"
            value={project.customerId || ""}
            onChange={handleChange}
            required
          >
            <option value="">Välj kund</option>
            {customers && customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.customerName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="projectManagerId">Projektledare:</label>
          <select
            id="projectManagerId"
            name="projectManagerId"
            value={project.projectManagerId || ""}
            onChange={handleChange}
            required
          >
            <option value="">Välj projektledare</option>
            {projectManagers && projectManagers.map(manager => (
              <option key={manager.id} value={manager.id}>
                {`${manager.firstName} ${manager.lastName}`}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="serviceId">Tjänst:</label>
          <select
            id="serviceId"
            name="serviceId"
            value={project.serviceId || ""}
            onChange={handleChange}
            required
          >
            <option value="">Välj tjänst</option>
            {services && services.map(service => (
              <option key={service.id} value={service.id}>
                {service.serviceName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="statusTypeId">Status:</label>
          <select
            id="statusTypeId"
            name="statusTypeId"
            value={project.statusTypeId}
            onChange={handleChange}
            required
          >
            <option value="">Välj status</option>
            {statusTypes && statusTypes.map(status => (
              <option key={status.id} value={status.id}>
                {status.statusName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
            Avbryt
          </button>
          <button type="submit" className="btn-save">
            Spara ändringar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProject;