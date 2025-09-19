const employeesData = [
    {
      employeeId: 1,
      name: 'João Victor',
      position: 'Desenvolvedor Frontend',
      photo: 'https://images.unsplash.com/photo-1534528736945-f09b57954546?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      isActive: true,
      status: {
        customText: 'Finalizando projeto UX',
        updateAt: '2025-09-17T10:30:00Z',
        statusType: {
          statusTypeId: 1,
          description: 'Foco Total',
          iconUrl: 'https://www.websupply.com.br/assets/focus-icon.png'
        }
      }
    },
    {
      employeeId: 2,
      name: 'Maria Julia',
      position: 'Designer UX/UI',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      isActive: true,
      status: {
        customText: null,
        updateAt: '2025-09-17T12:00:00Z',
        statusType: {
          statusTypeId: 2,
          description: 'Modo Criativo',
          iconUrl: 'https://www.websupply.com.br/assets/creative-icon.png'
        }
      }
    },
    {
      employeeId: 3,
      name: 'Fernando Rocha',
      position: 'Especialista em Dados',
      photo: 'https://cdn.pixabay.com/photo/2018/01/15/07/52/woman-3083377_1280.jpg',
      isActive: true,
      status: {
        customText: null,
        updateAt: '2025-09-16T15:45:00Z',
        statusType: {
          statusTypeId: 3,
          description: 'Codando',
          iconUrl: 'https://www.websupply.com.br/assets/coding-icon.png'
        }
      }
    }
  ];
  
  const generateNewId = () => {
    const ids = employeesData.map(e => e.employeeId);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  };
  
  export const mockService = {
    getEmployees: async () => {
      // Simula o delay de uma chamada de API
      return new Promise(resolve => setTimeout(() => resolve(employeesData), 500));
    },
    addEmployee: async (employeeData) => {
      return new Promise(resolve => {
        const newEmployee = { ...employeeData, employeeId: generateNewId() };
        employeesData.push(newEmployee);
        resolve(newEmployee);
      });
    },
    updateEmployee: async (updatedData) => {
      return new Promise(resolve => {
        const index = employeesData.findIndex(e => e.employeeId === updatedData.employeeId);
        if (index !== -1) {
          employeesData[index] = updatedData;
        }
        resolve(updatedData);
      });
    }
  };