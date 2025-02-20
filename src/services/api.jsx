//Använde Claude 3.5 Sonnet för att skapa funktionalitet.
import axios from 'axios';

const BASE_URL = 'https://localhost:7155/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
});

// Projects API
export const projectAPI = {
    getAll: async () => {
        try {
            const response = await api.get('/project');
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not fetch projects');
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/project/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error(`Could not fetch project with id ${id}`);
        }
    },

    create: async (projectData) => {
        try {
            const response = await api.post('/project', projectData);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not create project');
        }
    },

    update: async (id, projectData) => {
        try {
            const response = await api.put(`/project/${id}`, projectData);
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            console.log("PD", projectData);
            throw new Error('Could not update project');
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`/project/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not delete project');
        }
    }
};

// Customers API
export const customerAPI = {
    getAll: async () => {
        try {
            const response = await api.get('/customer');
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not fetch customers');
        }
    },
    getById: async (id) => {
        try {
            const response = await api.get(`/customer/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error(`Could not fetch customer with id ${id}`);
        }
    },
    create: async (data) => {
        try {
            const response = await api.post('/customer', data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not create customer');
        }
    },
    update: async (id, data) => {
        try {
            const response = await api.put(`/customer/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not update customer');
        }
    },
    delete: async (id) => {
        try {
            const response = await api.delete(`/customer/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not delete customer');
        }
    }
};

// Project Managers API
export const projectManagerAPI = {
    getAll: async () => {
        try {
            const response = await api.get('/projectmanager');
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not fetch project managers');
        }
    },
    getById: async (id) => {
        try {
            const response = await api.get(`/projectmanager/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error(`Could not fetch project manager with id ${id}`);
        }
    },
    create: async (data) => {
        try {
            const response = await api.post('/projectmanager', data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not create project manager');
        }
    },
    update: async (id, data) => {
        try {
            const response = await api.put(`/projectmanager/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not update project manager');
        }
    },
    delete: async (id) => {
        try {
            const response = await api.delete(`/projectmanager/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not delete project manager');
        }
    }
};

// Services API
export const serviceAPI = {
    getAll: async () => {
        try {
            const response = await api.get('/service');
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not fetch services');
        }
    },
    getById: async (id) => {
        try {
            const response = await api.get(`/service/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error(`Could not fetch service with id ${id}`);
        }
    },
    create: async (data) => {
        try {
            const response = await api.post('/service', data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not create service');
        }
    },
    update: async (id, data) => {
        try {
            const response = await api.put(`/service/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not update service');
        }
    },
    delete: async (id) => {
        try {
            const response = await api.delete(`/service/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not delete service');
        }
    }
};

// Status Types API
export const statusTypeAPI = {
    getAll: async () => {
        try {
            const response = await api.get('/statustype');
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not fetch status types');
        }
    },
    getById: async (id) => {
        try {
            const response = await api.get(`/statustype/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error(`Could not fetch status type with id ${id}`);
        }
    },
    create: async (data) => {
        try {
            const response = await api.post('/statustype', data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not create status type');
        }
    },
    update: async (id, data) => {
        try {
            const response = await api.put(`/statustype/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not update status type');
        }
    },
    delete: async (id) => {
        try {
            const response = await api.delete(`/statustype/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Could not delete status type');
        }
    }
};

export default api;