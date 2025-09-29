import { ref } from 'vue';

const STORAGE_KEY = 'user_session';
const MOCK_MODE_KEY = 'is_mock_mode';

const loadSession = () => {
  const session = localStorage.getItem(STORAGE_KEY);
  return session ? JSON.parse(session) : null;
};

const initialSession = loadSession();

export const isMockMode = ref(localStorage.getItem(MOCK_MODE_KEY) === 'true');
export const usuarioLogado = ref(initialSession);

export const setUsuarioLogado = (id, data) => {
  const sessionData = { 
    id: id, 
    ...data 
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
  usuarioLogado.value = sessionData;
};

export const getUsuarioLogado = () => {
  return usuarioLogado.value;
};

export const logoutUsuario = () => {
  localStorage.removeItem(STORAGE_KEY);
  usuarioLogado.value = null;
};

export const toggleMockMode = () => {
  isMockMode.value = !isMockMode.value;
  localStorage.setItem(MOCK_MODE_KEY, isMockMode.value);
};
