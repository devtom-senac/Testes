import React from 'react';
import { NavLink } from "react-router-dom"; // Importa NavLink para navegação SPA
import { FiClipboard, FiBarChart2, FiPhone, FiUsers } from 'react-icons/fi'; // Ícones para os itens do menu

/**
 * Sidebar é o componente de navegação lateral da aplicação.
 * Gerencia seu próprio estado de visibilidade baseado em props passadas pelo pai.
 * @param {Object} props - As propriedades passadas para o componente.
 * @param {boolean} props.isMobile - Indica se a tela está em modo mobile.
 * @param {boolean} props.isSidebarOpen - Controla o estado de abertura/fechamento da Sidebar.
 * @param {Function} props.toggleSidebar - Função para alternar o estado de abertura da Sidebar.
 */
export default function Sidebar({ isMobile, isSidebarOpen, toggleSidebar }) {

  // Definição dos itens de navegação da Sidebar.
  // Cada item inclui um rótulo, um ícone e o caminho (path) para a rota correspondente.
  const items = [
    { label: "Dashboard", icon: <FiBarChart2 />, path: "/" },
    { label: "Kanban", icon: <FiClipboard />, path: "/kanban" },
    { label: "Call", icon: <FiPhone />, path: "/call" },
    { label: "Equipe", icon: <FiUsers />, path: "/equipe" }
  ];

  return (
    <>
      {/* Overlay escuro: Visível apenas em telas mobile quando a sidebar está aberta.
          Cria um fundo semitransparente que pode ser clicado para fechar a sidebar. */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={toggleSidebar} // Ao clicar no overlay, a sidebar é fechada
        ></div>
      )}

      {/* Componente Sidebar (aside) */}
      <aside
        className={`fixed sm:relative top-0 left-0 h-full z-40 w-64 bg-[#160F23] p-4 transition-transform duration-300 transform
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'} `}
        style={isMobile ? { top: '4rem' } : {}} // Adiciona um offset do Topbar em mobile (assumindo Topbar tem 4rem ou 64px de altura)
      >
        {/* Cabeçalho da Sidebar: Título da Aplicação */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Alcatteia</h1>
        </div>

        {/* Navegação Principal */}
        <nav className="space-y-2">
          {items.map(({ label, icon, path }) => (
            <NavLink // Usa NavLink do React Router DOM para navegação.
              key={label}
              to={path} // Define o caminho da rota para onde o link navegará.
              className={({ isActive }) => // Função para aplicar classes CSS baseadas no estado 'isActive' da rota.
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-[#2A1C3A] text-white font-semibold" // Estilo para link ativo
                    : "text-gray-300 hover:bg-[#2A1C3A] hover:text-white" // Estilo para link normal/hover
                }`
              }
              // Fecha a sidebar em dispositivos móveis quando um link é clicado,
              // melhorando a experiência do usuário.
              onClick={isMobile ? toggleSidebar : undefined}
              // Atributo ARIA para acessibilidade, indicando a página atual.
              aria-current={({ isActive }) => isActive ? "page" : undefined}
            >
              <span className="text-lg">{icon}</span> {/* Renderiza o ícone */}
              <span>{label}</span> {/* Renderiza o rótulo do link */}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}