// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// Componentes de layout globais
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

// Importação dos Dashboards e Áreas de Equipe específicos por perfil
import LeaderDashboard from "./pages/Dashboard/LeaderDashboard";
import LeaderTeamArea from "./pages/TeamArea/LeaderTeamArea";
import HrDashboard from "./pages/Dashboard/HrDashboard";
import MemberDashboard from "./pages/Dashboard/MemberDashboard";

// Importação das páginas funcionais (Kanban, Call)
import Kanban from "./pages/Kanban";
import CallPage from "./pages/Call";

// Importe a página de acesso (AccountAccess)
import AccountAccess from "./pages/AccountAccess/AccountAccess";

// Dados mockados
const notificacoes = [
  { id: 1, texto: "Reunião às 10h", lida: false },
  { id: 2, texto: "Nova tarefa atribuída", lida: true },
];
const user = {
  nome: "Heverton Souza",
  foto: "/assets/perfil.png",
};

// ============================================================================
// COMPONENTE: DashboardLayoutContent
// ============================================================================
function DashboardLayoutContent() {
  const [profile, setProfile] = useState("leader"); // O estado profile ainda pode ser útil para outras lógicas ou para inicializar
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const tabletBreakpoint = 1024;
      const currentIsMobile = window.innerWidth < tabletBreakpoint;
      setIsMobile(currentIsMobile);
      if (!currentIsMobile) {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Ajustar a navegação para as novas rotas de perfil
  const handleProfileChange = (newProfile) => {
    setProfile(newProfile); // Atualiza o estado interno
    // Navega para a rota específica do dashboard do novo perfil
    navigate(`/dashboard/${newProfile}`);
  };

  // CurrentDashboard não é mais necessário aqui, as rotas cuidarão disso.

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
            onClick={() => navigate(`/dashboard/${profile}`)} // Retorna para o dashboard do perfil atual
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
      {/* Seletor de perfil (simulação) */}
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

      <Topbar
        notificacoes={notificacoes}
        user={user}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex flex-1 min-h-0">
        <Sidebar
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        {/* Main Content Area para as rotas internas do dashboard */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            {/* Rotas dos Dashboards por perfil */}
            <Route path="/leader" element={<LeaderDashboard />} />
            <Route path="/hr" element={<HrDashboard />} />
            <Route path="/member" element={<MemberDashboard />} />

            {/* Rota padrão para /dashboard (redireciona para /dashboard/leader) */}
            <Route path="/" element={<LeaderDashboard />} />
            {/* Ou, se preferir redirecionar: */}
            {/* <Route path="/" element={<Navigate to="/dashboard/leader" replace />} /> */}


            {/* Outras rotas internas (relativas a /dashboard/) */}
        
            <Route path="/call" element={<CallPage />} />
            <Route path="/equipe" element={<CurrentTeamArea />} />

            {/* 404 para rotas dentro de /dashboard/* que não forem encontradas */}
            <Route path="*" element={<p className="text-white text-center text-xl mt-20">404 - Página Interna do Dashboard Não Encontrada.</p>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// ============================================================================
// Componente App principal
// ============================================================================
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota principal de acesso */}
        <Route path="/" element={<AccountAccess />} />
        <Route path="/account-access" element={<AccountAccess />} />

        {/* A rota /dashboard/* que renderiza o novo componente DashboardLayoutContent */}
        <Route path="/dashboard/*" element={<DashboardLayoutContent />} />

        {/* Rota de fallback para qualquer caminho não encontrado na aplicação */}
        <Route path="*" element={<p className="text-white text-center text-xl mt-20">404 - Página Principal Não Encontrada.</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;