import { createContext } from 'react';

// создаём контекст пользователя
export const UserContext = createContext({
  id: null,        // ID пользователя
  name: '',        // Имя
  avatarUrl: ''    // Аватар
});
