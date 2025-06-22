import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// Componentes de layout globais
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

// Importação dos Dashboards e Áreas de Equipe específicos por perfil
import LeaderDashboard from "./pages/Dashboard/LeaderDashboard";
import LeaderTeamArea from "./pages/TeamArea/LeaderTeamArea";
import HrDashboard from "./pages/Dashboard/HrDashboard";
import MemberDashboard from "./pages/Dashboard/MemberDashboard";

// Importação das páginas funcionais (Kanban, Call)
import KanbanPage from "./pages/Kanban";
import CallPage from "./pages/Call";

// Dados mockados para simulação de notificações e usuário.
// Em uma aplicação real, estes dados viriam de uma API ou de um contexto global de autenticação.
const notificacoes = [
  { id: 1, texto: "Reunião às 10h", lida: false },
  { id: 2, texto: "Nova tarefa atribuída", lida: true },
];
const user = {
  nome: "Heverton Souza",
  foto: "/assets/perfil.png", // Caminho da imagem do perfil do usuário
};

/**
 * AppContent é o componente principal que gerencia o estado da aplicação
 * (perfil do usuário, estado da sidebar) e define a estrutura do layout
 * com Topbar, Sidebar e o conteúdo das rotas.
 */
function AppContent() {
  // Estado para simular o perfil do usuário logado ('leader', 'hr', 'member')
  const [profile, setProfile] = useState("leader");
  // Hook de navegação do React Router DOM
  const navigate = useNavigate();

  // Estados para controlar a visibilidade e o comportamento responsivo da Sidebar
  const [isMobile, setIsMobile] = useState(false); // Indica se a tela está em tamanho mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controla a abertura/fechamento da Sidebar em mobile

  /**
   * useEffect para detectar o tamanho da tela e atualizar o estado 'isMobile'.
   * Também garante que a Sidebar esteja fechada em desktops.
   */
  useEffect(() => {
    const handleResize = () => {
      const tabletBreakpoint = 1024; // Corresponde ao breakpoint 'md' do Tailwind CSS
      const currentIsMobile = window.innerWidth < tabletBreakpoint;
      setIsMobile(currentIsMobile);

      // Se a tela se tornar desktop, garante que a Sidebar esteja fechada
      if (!currentIsMobile) {
        setIsSidebarOpen(false);
      }
    };

    // Executa a função uma vez na montagem inicial para definir o estado correto
    handleResize();
    // Adiciona o event listener para monitorar mudanças no tamanho da janela
    window.addEventListener("resize", handleResize);

    // Função de limpeza: remove o event listener ao desmontar o componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Array de dependências vazio garante que o efeito rode apenas uma vez na montagem

  /**
   * Função para alternar o estado de abertura/fechamento da Sidebar.
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  /**
   * Função para simular a mudança de perfil do usuário.
   * Redireciona para a rota raiz (dashboard) após a mudança.
   */
  const handleProfileChange = (newProfile) => {
    setProfile(newProfile);
    navigate("/"); // Navega para o dashboard do novo perfil
  };

  /**
   * Componente condicional que renderiza o Dashboard apropriado
   * com base no perfil do usuário ativo.
   */
  const CurrentDashboard = () => {
    if (profile === "leader") return <LeaderDashboard />;
    if (profile === "hr") return <HrDashboard />;
    if (profile === "member") return <MemberDashboard />;
    return <p className="text-white text-center text-xl mt-20">Selecione um perfil para visualizar o dashboard.</p>;
  };

  /**
   * Componente condicional que controla o acesso à Área da Equipe.
   * Atualmente, apenas o perfil 'leader' tem acesso. Outros perfis
   * são redirecionados e veem uma mensagem de acesso negado.
   */
  const CurrentTeamArea = () => {
    if (profile === "leader") {
      return <LeaderTeamArea />;
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center p-8">
          <p className="text-4xl mb-4">🚫</p>
          <h2 className="text-3xl font-bold text-white mb-2">Seu perfil não tem acesso à área da equipe</h2>
          <p className="text-md text-gray-400 mt-2">
            Por favor, retorne ao seu dashboard.
          </p>
          <button
            onClick={() => navigate("/")} // Botão para retornar ao dashboard
            className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition-colors font-semibold"
          >
            Voltar para o Dashboard
          </button>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0B0011]">
      {/* Seletor de perfil (apenas para simulação de desenvolvimento) */}
      <div className="bg-gray-900 text-white px-4 py-2 flex gap-4 items-center">
        <span>Perfil Ativo (Simulação):</span>
        <button
          onClick={() => handleProfileChange("leader")}
          className={`px-3 py-1 rounded transition ${profile === "leader" ? "bg-purple-600 font-bold" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          Líder
        </button>
        <button
          onClick={() => handleProfileChange("hr")}
          className={`px-3 py-1 rounded transition ${profile === "hr" ? "bg-teal-600 font-bold" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          RH
        </button>
        <button
          onClick={() => handleProfileChange("member")}
          className={`px-3 py-1 rounded transition ${profile === "member" ? "bg-blue-600 font-bold" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          Membro
        </button>
      </div>

      {/* Topbar: Barra superior de navegação/informações */}
      <Topbar
        notificacoes={notificacoes}
        user={user}
        isMobile={isMobile}         // Passa o estado de mobile para o Topbar (para mostrar/esconder o botão de menu)
        isSidebarOpen={isSidebarOpen} // Passa o estado da sidebar para o Topbar (se precisar de lógica visual)
        toggleSidebar={toggleSidebar} // Passa a função para abrir/fechar a sidebar
      />

      {/* Conteúdo principal: Sidebar e Área das Rotas */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar: Menu de navegação lateral */}
        <Sidebar
          isMobile={isMobile}         // Passa o estado de mobile para a Sidebar
          isSidebarOpen={isSidebarOpen} // Passa o estado de abertura/fechamento da Sidebar
          toggleSidebar={toggleSidebar} // Passa a função para a Sidebar se fechar ao clicar em um link em mobile
        />
        {/* Main Content Area: Onde as páginas são renderizadas pelo React Router */}
        <main className="flex-1 overflow-y-auto">
          {/* Definição das rotas da aplicação */}
          <Routes>
            {/* Rota raiz para o Dashboard dinâmico baseado no perfil */}
            <Route path="/" element={<CurrentDashboard />} />
            {/* Rota para a página Kanban */}
            <Route path="/kanban" element={<KanbanPage />} />
            {/* Rota para a página Call */}
            <Route path="/call" element={<CallPage />} />
            {/* Rota para a Área da Equipe, com controle de acesso por perfil */}
            <Route path="/equipe" element={<CurrentTeamArea />} />

            {/* Rota de fallback para caminhos não encontrados (404) */}
            <Route path="*" element={<p className="text-white text-center text-xl mt-20">404 - Página Não Encontrada.</p>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

/**
 * Componente App que envolve o AppContent com o BrowserRouter.
 * O BrowserRouter é necessário para que as rotas do React Router DOM funcionem.
 */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}