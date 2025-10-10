export const getMoodEmoji = (mood) => {
    const emojis = {
        excellent: '😄',
        energetic: '🚀',
        good: '😊',
        neutral: '😐',
        low: '😔',
        stressed: '😰'
    };
    return emojis[mood] || '😐';
}

export const getMoodText = (mood) => {
    const texts = {
        excellent: 'Excelente',
        energetic: 'Energético',
        good: 'Bom',
        neutral: 'Neutro',
        low: 'Baixo',
        stressed: 'Estressado'
    };
    return texts[mood] || 'Neutro';
}

export const getMoodBgColor = (mood) => {
    const colors = {
        excellent: 'bg-green-500',
        energetic: 'bg-purple-500',
        good: 'bg-blue-500',
        neutral: 'bg-slate-500',
        low: 'bg-yellow-500',
        stressed: 'bg-red-500'
    };
    return colors[mood] || 'bg-slate-500';
}

export const getPriorityClass = (priority) => {
    const classes = {
        high: 'bg-red-500/20 text-red-400',
        medium: 'bg-yellow-500/20 text-yellow-400',
        low: 'bg-green-500/20 text-green-400'
    };
    return classes[priority] || 'bg-slate-500/20 text-slate-400';
}

export const getRoleIcon = (role) => {
    const icons = {
        'Tech Lead': 'fas fa-crown',
        'Frontend Developer': 'fas fa-code',
        'Backend Developer': 'fas fa-server',
        'Full Stack Developer': 'fas fa-layer-group',
        'DevOps Engineer': 'fas fa-cloud',
        'UX/UI Designer': 'fas fa-palette',
        'QA Engineer': 'fas fa-bug',
        'Product Manager': 'fas fa-clipboard-list'
    };
    return icons[role] || 'fas fa-user';
}