// src/data/mockTasks.js

export const mockTasks = [
    {
        id: 1,
        title: "Finalizar Componente MetricCard.vue",
        description: "Revisar o HTML do Canva e refatorar para props reativas.",
        status: "in_progress", // 'completed', 'in_progress', 'pending'
        priority: "high", // 'high', 'medium', 'low'
        assignedTo: 1, // ID do membro
        dueDate: "2025-10-15",
        projectId: 1,
    },
    {
        id: 2,
        title: "Reunião de humor semanal",
        description: "Agendar com a equipe para coletar feedback e humor.",
        status: "pending",
        priority: "medium",
        assignedTo: 2,
        dueDate: "2025-10-18",
        projectId: 1,
    },
    {
        id: 3,
        title: "Atualizar documentação de Pinia",
        description: "Incluir o novo padrão de uso de services nas stores.",
        status: "completed",
        priority: "low",
        assignedTo: 1,
        dueDate: "2025-10-10",
        projectId: 2,
    }
];