# Documentação Completa do Projeto Websupply

Esta documentação detalha os passos para configurar e desenvolver o projeto Websupply, incluindo o frontend com Vue.js e Tailwind CSS e o backend com .NET 8 e Visual Studio 2022. O objetivo é criar um sistema completo com funcionalidades de CRUD e boas práticas de desenvolvimento. Além disso, explicaremos como consumir a API usando Axios no frontend.

---

## **Frontend Completo**

### **1. Estrutura do Frontend**
O frontend será baseado no Vue.js com Tailwind CSS. Ele terá as seguintes páginas:
- **Dashboard**: Exibe estatísticas gerais e atividades recentes.
- **Team**: Gerencia os funcionários (CRUD).
- **Status**: Gerencia os status dos funcionários.

### **2. Código Completo do Frontend**

#### **Arquivo: `src/main.js`**
Este é o ponto de entrada do aplicativo Vue.js.

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
```

#### **Arquivo: `src/router.js`**
Configuração das rotas para navegação entre as páginas.

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Team from './views/Team.vue';
import Status from './views/Status.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/team', name: 'Team', component: Team },
  { path: '/status', name: 'Status', component: Status },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

#### **Arquivo: `src/App.vue`**
Componente raiz que inclui o cabeçalho e o `<router-view>`.

```vue
<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style>
/* Estilos globais podem ser adicionados aqui */
</style>
```

#### **Arquivo: `src/components/Header.vue`**
Cabeçalho com navegação.

```vue
<template>
  <header class="bg-gray-800 shadow-xl border-b border-gray-700 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="gradient-bg p-3 rounded-xl shadow-lg">
            <span class="text-white text-xl font-bold">W</span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">Websupply</h1>
            <p class="text-sm text-gray-400">Dashboard de Equipe</p>
          </div>
        </div>
        <nav class="flex space-x-2">
          <router-link to="/" class="nav-btn">📊 Dashboard</router-link>
          <router-link to="/team" class="nav-btn">👥 Equipe</router-link>
          <router-link to="/status" class="nav-btn">🏷️ Status</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
.nav-btn {
  background-color: transparent;
  color: #9ca3af;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
}
.nav-btn:hover {
  background-color: #2563eb;
  color: white;
}
</style>
```

#### **Arquivo: `src/views/Dashboard.vue`**
Página inicial com estatísticas e atividades recentes.

```vue
<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="glass-effect rounded-2xl p-6">
        <p class="text-sm font-medium text-gray-400">Total de Funcionários</p>
        <p class="text-3xl font-bold text-white">{{ totalEmployees }}</p>
      </div>
      <div class="glass-effect rounded-2xl p-6">
        <p class="text-sm font-medium text-gray-400">Status Ativos</p>
        <p class="text-3xl font-bold text-white">{{ activeStatuses }}</p>
      </div>
    </div>
    <div class="glass-effect rounded-2xl p-6">
      <h3 class="text-lg font-semibold text-white mb-4">Atividade Recente</h3>
      <ul>
        <li v-for="activity in recentActivities" :key="activity.id" class="text-gray-300">
          {{ activity }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      totalEmployees: 4,
      activeStatuses: 3,
      recentActivities: ['Funcionário A atualizou o status.', 'Funcionário B foi adicionado.'],
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para o Dashboard */
</style>
```

---

## **Backend Completo**

### **1. Estrutura do Backend**
O backend será baseado no .NET 8 com Entity Framework Core e SQL Server. Ele terá os seguintes endpoints:
- **GET /api/employees**: Lista todos os funcionários.
- **POST /api/employees**: Adiciona um novo funcionário.
- **GET /api/statuses**: Lista todos os status.
- **POST /api/statuses**: Atualiza o status de um funcionário.

### **2. Código Completo do Backend**

#### **Modelo: Employee**
```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Position { get; set; }
    public string Nickname { get; set; }
    public string Image { get; set; }
    public DateTime CreatedAt { get; set; }
}
```

#### **Modelo: Status**
```csharp
public class Status
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public string StatusType { get; set; }
    public string CustomText { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```

#### **DbContext**
```csharp
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Employee> Employees { get; set; }
    public DbSet<Status> Statuses { get; set; }
}
```

#### **Controlador: EmployeesController**
```csharp
[Route("api/[controller]")]
[ApiController]
public class EmployeesController : ControllerBase
{
    private readonly AppDbContext _context;

    public EmployeesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetEmployees()
    {
        return Ok(_context.Employees.ToList());
    }

    [HttpPost]
    public IActionResult AddEmployee(Employee employee)
    {
        _context.Employees.Add(employee);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetEmployees), new { id = employee.Id }, employee);
    }
}
```

#### **Controlador: StatusesController**
```csharp
[Route("api/[controller]")]
[ApiController]
public class StatusesController : ControllerBase
{
    private readonly AppDbContext _context;

    public StatusesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetStatuses()
    {
        return Ok(_context.Statuses.ToList());
    }

    [HttpPost]
    public IActionResult UpdateStatus(Status status)
    {
        _context.Statuses.Add(status);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetStatuses), new { id = status.Id }, status);
    }
}
```

---

Se precisar de mais explicações ou ajustes, é só avisar!
