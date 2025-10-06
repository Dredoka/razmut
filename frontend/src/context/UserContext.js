import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // текущий пользователь
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для загрузки пользователя по ID
  const fetchUserById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}`);
      if (!res.ok) throw new Error('Пользователь не найден');
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Загружаем пользователя по умолчанию (например, ID 1)
  useEffect(() => {
    fetchUserById(1);
  }, []);

  const value = {
    user,
    setUser,
    fetchUserById,
    loading,
    error
  };

  return (
    <UserContext.Provider value={value}>
      {loading ? <p>Загрузка пользователя...</p> : children}
      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
    </UserContext.Provider>
  );
};
