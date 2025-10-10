/**
 * Helper para corretamente desserializar objetos Date.
 */
function dateReviver(key, value) {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
        return new Date(value);
    }
    return value;
}

/**
 * Carrega dados do localStorage, fiel à implementação original.
 */
export function loadData(key, defaultValue) {
    try {
        const stored = localStorage.getItem(`alcateia_${key}`);
        return stored ? JSON.parse(stored, dateReviver) : defaultValue;
    } catch {
        return defaultValue;
    }
}

/**
 * Persiste dados no localStorage.
 */
export function saveData(key, data) {
    try {
        localStorage.setItem(`alcateia_${key}`, JSON.stringify(data));
    } catch (e) {
        console.error(`Erro ao salvar 'alcateia_${key}' no localStorage.`, e);
    }
}