import api from './axiosConfig';
import { mockService } from './mockService'; 
import { isMockMode } from '../modeState.js';

export async function getEmployees() {
  if (isMockMode.value) {
    const allEmployees = await mockService.getEmployees();
    return allEmployees.filter(e => e.isActive);
  }
  
  try {
    const response = await api.get('/Employee');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar funcionários na API:', error);
    throw error;
  }
}

export async function authenticateLogin(employeeId, password) {
  if (isMockMode.value) {
    return mockService.authenticateLoginMock(employeeId, password);
  }

  try {
    const response = await api.post('/Employee/login', {
      employeeId: employeeId,
      password: password
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Senha incorreta ou perfil inválido.');
    }
    console.error('Erro de autenticação:', error);
    throw error;
  }
}

export async function getInactiveEmployees() {
  if (isMockMode.value) {
    const allEmployees = await mockService.getEmployees();
    return allEmployees.filter(e => !e.isActive);
  }

  try {
    const response = await api.get('/Employee/Inactive');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar funcionários inativos:', error);
    throw error;
  }
}

export async function getEmployeeById(id) {
  if (isMockMode.value) {
    return mockService.getEmployeeById(id);
  }

  try {
    const response = await api.get(`/Employee/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar funcionário ${id}:`, error);
    throw error;
  }
}

export async function createEmployee(newEmployee) {
  if (isMockMode.value) {
    return mockService.addEmployee(newEmployee);
  }

  try {
    const response = await api.post('/Employee', newEmployee);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar funcionário:', error);
    throw error;
  }
}

export async function updateEmployee(id, updateData) {
  if (isMockMode.value) {
    return mockService.updateEmployee(updateData);
  }

  try {
    await api.put(`/Employee/${id}`, updateData);
  } catch (error) {
    console.error(`Erro ao atualizar funcionário ${id}:`, error);
    throw error;
  }
}
