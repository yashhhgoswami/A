// Base API configuration and common utilities
const API_BASE_URL = 'http://localhost:3001/api'; // Mock API endpoint

// Mock API delay to simulate network requests
const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  await mockDelay(); // Simulate network delay
  
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add token to headers if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // For mock purposes, we'll simulate responses
  console.log(`Mock API call: ${config.method || 'GET'} ${url}`, config.body);
  
  return {
    ok: true,
    status: 200,
    json: async () => ({ success: true, data: null }),
  };
};

const api = {
  get: (endpoint, options = {}) => apiRequest(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options = {}) => apiRequest(endpoint, { 
    ...options, 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  put: (endpoint, data, options = {}) => apiRequest(endpoint, { 
    ...options, 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  delete: (endpoint, options = {}) => apiRequest(endpoint, { ...options, method: 'DELETE' }),
};

export default api;