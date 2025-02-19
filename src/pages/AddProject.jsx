// Använde Claude 3.5 Sonnet för att skapa det mesta av UI och funktionalitet.
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectAPI, customerAPI, projectManagerAPI, serviceAPI, statusTypeAPI } from '../services/api';
import '../styling/AddProject.css';

function AddProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    totalPrice: '',
    projectManagerId: '',
    customerId: '',
    serviceId: '',
    statusTypeId: ''
  });

  const [customers, setCustomers] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);
  const [services, setServices] = useState([]);
  const [statusTypes, setStatusTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [customersRes, managersRes, servicesRes, statusTypesRes] = await Promise.all([
          customerAPI.getAll(),
          projectManagerAPI.getAll(),
          serviceAPI.getAll(),
          statusTypeAPI.getAll()
        ]);

        setCustomers(customersRes || []);
        setProjectManagers(managersRes || []);
        setServices(servicesRes || []);
        setStatusTypes(statusTypesRes || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load form data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        totalPrice: parseFloat(formData.totalPrice),
        customerId: parseInt(formData.customerId),
        projectManagerId: parseInt(formData.projectManagerId),
        serviceId: parseInt(formData.serviceId),
        statusTypeId: parseInt(formData.statusTypeId)
      };

      await projectAPI.create(formattedData);
      navigate('/');
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Failed to create project. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading-container">Laddar formulär...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Ett fel uppstod</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Försök igen</button>
      </div>
    );
  }

  return (
    <div className="add-project-container">
      <h1>Lägg till nytt projekt</h1>
      <form onSubmit={handleSubmit} className="project-form">        
        <div className="form-group">
          <label htmlFor="title">Titel</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Beskrivning</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Startdatum</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Slutdatum</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalPrice">Totalt pris</label>
          <input
            type="number"
            id="totalPrice"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerId">Kund</label>
          <select
            id="customerId"
            name="customerId"
            value={formData.customerId}
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
          <label htmlFor="projectManagerId">Projektledare</label>
          <select
            id="projectManagerId"
            name="projectManagerId"
            value={formData.projectManagerId}
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
          <label htmlFor="serviceId">Tjänst</label>
          <select
            id="serviceId"
            name="serviceId"
            value={formData.serviceId}
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
          <label htmlFor="statusTypeId">Status</label>
          <select
            id="statusTypeId"
            name="statusTypeId"
            value={formData.statusTypeId}
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
          <button type="button" onClick={() => navigate('/')} className="cancel-button">
            Avbryt
          </button>
          <button type="submit" className="submit-button">
            Skapa projekt
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;