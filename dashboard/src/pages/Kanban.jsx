// src/pages/Kanban.jsx
import React, { useMemo, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KanbanProvider, { KanbanContext } from '../../contexts/KanbanContext';
import CategoryPanel from '../components/CategoryPanel';
import NotificationModal from '../components/NotificationModal';
// Você precisará importar Topbar aqui se ele for um componente do projeto
// Se Topbar for um componente global do App, ele não deveria estar aqui
// Se Topbar for específico do Kanban, importe-o aqui:
// import Topbar from './components/Topbar'; // ou o caminho correto

// Detecta se é um dispositivo touch
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// =====================================================================
// NOVO COMPONENTE: KanbanContent
// Este componente vai consumir os contextos após eles serem providos.
// =====================================================================
function KanbanContent() {
  const navigate = useNavigate(); // <-- Se você for usar navigate aqui, lembre-se que ele está no App.jsx e não aqui.
                                  // Se Topbar não for global, e você precisar de dados de usuário, etc.
                                  // Talvez Topbar precise de props passadas de KanbanPage.

  // Consome o contexto KanbanContext AQUI, DENTRO do provedor
  const {
    participationRequests = [],
    acceptParticipation,
    rejectParticipation
  } = useContext(KanbanContext) || {}; // Agora KanbanContext deve estar disponível

  const currentRequest = participationRequests[0];

  // IMPORTANTE: Seu Topbar no Kanban está diferente do Topbar global.
  // Ele parece ser um componente Topbar *específico* do Kanban,
  // pois está recebendo `participationRequests` como prop.
  // Você precisa importar este Topbar específico do Kanban, se ele existir.
  // Por exemplo: import KanbanTopbar from './components/KanbanTopbar'; ou similar
  // Se for o mesmo Topbar global, ele não deve ser renderizado aqui.

  return (
    <>
      {/* Notificação de pedido de participação */}
      {currentRequest && (
        <NotificationModal
          requester={currentRequest.requester}
          onAccept={() => acceptParticipation(currentRequest.taskId, currentRequest.requester)}
          onReject={() => rejectParticipation(currentRequest.taskId, currentRequest.requester)}
        />
      )}
      <div className="flex h-screen bg-[#160F23] text-white overflow-hidden">
        {/* Remover Sidebar e Topbar daqui se eles já forem renderizados no App.jsx (DashboardLayoutContent) */}
        {/* Se a Sidebar e Topbar do App.jsx já estão envolvendo o <main> que renderiza o KanbanPage,
            então você não precisa (e não deve) renderizá-los novamente aqui. */}
        {/* <Sidebar />  <--- PROVAVELMENTE REMOVER ESTA LINHA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* <Topbar ... />  <--- PROVAVELMENTE REMOVER ESTA LINHA, OU SE FOR UMA TOPBAR ESPECÍFICA DO KANBAN, IMPORTE E USE-A. */}
          <main className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-[#2D1B4F] scrollbar-track-transparent">
            <CategoryPanel />
          </main>
        </div>
      </div>
    </>
  );
}

// =====================================================================
// Componente Kanban Principal
// Este componente agora apenas configura os Provedores.
// =====================================================================
export default function Kanban() {
  const backend = useMemo(() => {
    // A lógica de detecção de touch pode ser um pouco redundante aqui,
    // pois ambos os casos retornam HTML5Backend. Mas sem problemas.
    return isTouchDevice() ? HTML5Backend : HTML5Backend;
  }, []);

  return (
    <DndProvider backend={backend}> {/* DndProvider deve envolver KanbanProvider se KanbanProvider usar dnd hooks */}
      <KanbanProvider> {/* KanbanProvider deve envolver KanbanContent */}
        <KanbanContent /> {/* O conteúdo que precisa dos contextos */}
      </KanbanProvider>
    </DndProvider>
  );
}