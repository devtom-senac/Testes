# Tutorial de Instalação e Configuração do Frontend com Vue.js e Tailwind CSS

Este documento serve como um guia passo a passo para configurar o frontend do projeto utilizando Vue.js, Tailwind CSS e Vite. Vamos criar a estrutura inicial do projeto e entender a função de cada arquivo e pasta.

---

## **1. Configuração do Ambiente**

### **Pré-requisitos**
Certifique-se de ter as seguintes ferramentas instaladas:
- **Node.js**: Para gerenciar pacotes e executar o projeto.
- **npm**: Gerenciador de pacotes que vem com o Node.js.
- **Vite**: Ferramenta para desenvolvimento rápido de aplicações Vue.js.

### **Passo 1: Criar o Projeto Vue.js**
1. No terminal, execute o comando para criar um novo projeto Vue.js:
   ```bash
   npm create vite@latest websupply-frontend
   ```
2. Escolha as opções:
   - Framework: `Vue`
   - Variante: `JavaScript`

3. Acesse a pasta do projeto:
   ```bash
   cd websupply-frontend
   ```

4. Instale as dependências:
   ```bash
   npm install
   ```

5. Execute o servidor de desenvolvimento para testar:
   ```bash
   npm run dev
   ```
   Acesse o projeto no navegador em `http://localhost:5173`.

---

## **2. Configuração do Tailwind CSS**

### **Passo 1: Instalar o Tailwind CSS**
1. Instale o Tailwind CSS e suas dependências:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

2. Gere o arquivo de configuração do Tailwind:
   ```bash
   npx tailwindcss init
   ```

### **Passo 2: Configurar o Tailwind**
1. No arquivo `tailwind.config.js`, configure os caminhos dos arquivos Vue:
   ```javascript
   module.exports = {
     content: [
       "./index.html",
       "./src/**/*.{vue,js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

2. Crie o arquivo CSS do Tailwind em `src/assets/tailwind.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. Importe o arquivo CSS no `src/main.js`:
   ```javascript
   import './assets/tailwind.css';
   ```

4. Execute o servidor novamente para verificar se o Tailwind está funcionando:
   ```bash
   npm run dev
   ```

---

## **3. Estrutura do Projeto**

Abaixo está a estrutura inicial do projeto:

```
websupply-frontend/
├── src/
│   ├── assets/          # Arquivos estáticos (CSS, imagens, etc.)
│   ├── components/      # Componentes Vue reutilizáveis
│   ├── views/           # Páginas principais do projeto
│   ├── App.vue          # Componente raiz
│   ├── main.js          # Arquivo de entrada
│   └── router.js        # Configuração de rotas
├── index.html           # Arquivo HTML principal
├── package.json         # Gerenciador de dependências
├── tailwind.config.js   # Configuração do Tailwind CSS
└── vite.config.js       # Configuração do Vite
```

---

## **4. Componentes Vue.js**

### **Componente: Header.vue**
**Descrição**: Este componente será o cabeçalho do site, contendo a navegação entre as páginas.

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
          <button class="nav-btn active px-6 py-3 rounded-xl font-medium transition-all duration-300">
            📊 Dashboard
          </button>
          <button class="nav-btn px-6 py-3 rounded-xl font-medium transition-all duration-300">
            👥 Equipe
          </button>
          <button class="nav-btn px-6 py-3 rounded-xl font-medium transition-all duration-300">
            🏷️ Status
          </button>
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
}
.nav-btn.active {
  background-color: #2563eb;
  color: white;
}
</style>
```

**Explicação**:
- **Template**: Define a estrutura HTML do cabeçalho.
- **Script**: Define o nome do componente.
- **Style**: Estiliza os botões de navegação.

---

### **Próximos Passos**
1. Criar os componentes `Dashboard.vue`, `Team.vue` e `Status.vue`.
2. Configurar o roteamento entre as páginas.
3. Integrar com a API (que será criada posteriormente).

Se precisar de mais explicações ou ajustes, é só pedir!
