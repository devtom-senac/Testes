// Implementa BusinessLogic.validateMember
export function validateMember(memberData) {
    const errors = [];
    if (!memberData.name || memberData.name.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    if (!memberData.role) {
        errors.push('Cargo é obrigatório');
    }
    return errors;
}

// Implementa BusinessLogic.validateProject
export function validateProject(projectData) {
    const errors = [];
    if (!projectData.name || projectData.name.trim().length < 3) {
        errors.push('Nome do projeto deve ter pelo menos 3 caracteres');
    }
    if (!projectData.priority) {
        errors.push('Prioridade é obrigatória');
    }
    return errors;
}

// Implementa BusinessLogic.validateSprint
export function validateSprint(sprintData) {
    const errors = [];
    if (!sprintData.name || sprintData.name.trim().length < 3) {
        errors.push('Nome da Sprint deve ter pelo menos 3 caracteres');
    }
    if (!sprintData.duration || isNaN(sprintData.duration) || sprintData.duration <= 0) {
        errors.push('Duração da Sprint inválida');
    }
    return errors;
}