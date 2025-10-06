import React, { createContext, useState, useContext } from 'react';

// Создаем контекст
const UserContext = createContext();

// Хук для удобного доступа к контексту
export const useUser = () => useContext(UserContext);

// Провайдер, который хранит данные о текущем пользователе
export const UserProvider = ({ children }) => {
  // Здесь будет временный пользователь (позже добавим авторизацию)
  const [user, setUser] = useState({
    id: 1,
    name: "Администратор",
    isAdmin: true, // 👈 пока TRUE, чтобы панель отображалась
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
