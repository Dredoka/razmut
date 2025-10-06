import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserById = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}`);
      if (!res.ok) throw new Error('Пользователь не найден');
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
