import { FiBell, FiMoon, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';

export default function Topbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = ['Relatório', 'Reuniões', 'Ranking'];

  return (
    <header className="sticky top-0 z-10 bg-[#160F23]/90 flex justify-between items-center p-4 border-b border-[#2A1C3A] backdrop-blur-md">
      {/* Navegação principal */}
      <nav className="flex gap-2 md:gap-6">
        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            className="text-gray-300 hover:text-white px-2 py-1 md:px-3 rounded-md transition-all duration-200 font-medium relative group text-sm md:text-base"
          >
            {item}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-purple-500 w-0 group-hover:w-[80%] transition-all duration-300"></span>
          </a>
        ))}
      </nav>

      {/* Controles do usuário */}
      <div className="flex gap-2 md:gap-4 items-center">
        {/* Notificações */}
        <button 
          className="p-2 rounded-full hover:bg-[#2A1C3A] transition-colors duration-200 relative"
          aria-label="Notificações"
          onClick={() => {/* Lógica de notificações */}}
        >
          <FiBell size={18} className="text-gray-300 hover:text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#160F23]"></span>
        </button>

        {/* Tema */}
        <button 
          className="p-2 rounded-full hover:bg-[#2A1C3A] transition-colors duration-200"
          aria-label="Alternar tema"
          onClick={() => {/* Lógica de tema */}}
        >
          <FiMoon size={18} className="text-gray-300 hover:text-white" />
        </button>

        {/* Avatar + Menu */}
        <div className="relative">
          <button 
            className="bg-purple-800 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white hover:ring-2 hover:ring-purple-500 transition-all"
            aria-label="Menu do usuário"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <FiUser size={16} />
          </button>
          
          {/* Menu dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#2A1C3A] rounded-md shadow-lg py-1 z-20 border border-[#3A2C4A]">
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#3A2C4A] transition-colors">
                <FiUser size={14} /> Perfil
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#3A2C4A] transition-colors">
                <FiSettings size={14} /> Configurações
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#3A2C4A] transition-colors">
                <FiLogOut size={14} /> Sair
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
