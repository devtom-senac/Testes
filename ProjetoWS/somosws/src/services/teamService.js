import { mockService } from './mockService';

const API_URL = 'http://localhost:3000/api/employees';

// Variável de controle para alternar entre API e dados mock
let useMocks = false;

export const teamService = {
  getEmployees: async () => {
    if (useMocks) {
      return mockService.getEmployees();
    } else {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Falha ao buscar funcionários da API');
      }
      return response.json();
    }
  },
  
  addEmployee: async (employeeData) => {
    if (useMocks) {
      return mockService.addEmployee(employeeData);
    } else {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) {
        throw new Error('Falha ao adicionar funcionário na API');
      }
      return response.json();
    }
  },
  
  updateEmployee: async (employeeData) => {
    if (useMocks) {
      return mockService.updateEmployee(employeeData);
    } else {
      const response = await fetch(`${API_URL}/${employeeData.employeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) {
        throw new Error('Falha ao atualizar funcionário na API');
      }
      return response.json();
    }
  },

  // Método para alternar o modo de uso
  setMode: (mode) => {
    useMocks = mode === 'mock';
  }
};