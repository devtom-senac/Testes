// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiClipboard, FiPhone, FiX } from 'react-icons/fi'; // Importe FiX para o botão de fechar

export default function Sidebar({ isMobile, isSidebarOpen, toggleSidebar }) {
  // Lista de itens de navegação (exemplo)
  const navItems = [
    { name: 'Kanban', icon: FiClipboard, path: '/kanban' },
    { name: 'Dashboard', icon: FiHome, path: '/' },
    { name: 'Chamada', icon: FiPhone, path: '/call' },
    { name: 'Área da Equipe', icon: FiUsers, path: '/dashboard/equipe' },
  ];

  return (
    <>
      {/* Overlay para mobile quando a sidebar está aberta */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" // Z-index maior que o Topbar (z-10)
          onClick={toggleSidebar} // Clica no overlay para fechar a sidebar
        ></div>
      )}

      {/* Sidebar principal */}
      <aside
        className={`
          flex-shrink-0 bg-[#160F23] text-gray-200 h-full overflow-y-auto custom-scrollbar
          transform transition-transform duration-300 ease-in-out
          ${isMobile 
            ? `fixed inset-y-0 left-0 w-64 z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}` 
            : 'static w-64'
          }
          lg:static lg:translate-x-0 lg:w-64 // Garante que a sidebar esteja sempre visível no desktop (lg e acima)
        `}
      >
        <div className="p-6 flex items-center justify-between lg:justify-center border-b border-[#2A1C3A]">
          <h2 className="text-2xl font-bold text-white">Logo</h2>
          {/* Botão de fechar a sidebar (visível apenas em mobile) */}
          {isMobile && (
            <button
              className="lg:hidden p-2 rounded-full hover:bg-[#2A1C3A] text-gray-300"
              onClick={toggleSidebar}
              aria-label="Fechar menu"
            >
              <FiX size={24} />
            </button>
          )}
        </div>

        <nav className="mt-8">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-6 py-3 transition-colors duration-200
                     ${isActive
                      ? "bg-purple-700 text-white font-semibold border-l-4 border-purple-500"
                      : "hover:bg-[#2A1C3A] text-gray-300"
                    }`
                  }
                  onClick={isMobile ? toggleSidebar : undefined} // Fecha a sidebar ao clicar em um item no mobile
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}