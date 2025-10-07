import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkUserStatus = useCallback(async () => {
        try {
            // Пытаемся восстановить пользователя из localStorage для быстрого отображения
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            // Можно добавить запрос к /api/me для валидации сессии на сервере
        } catch (error) {
            console.error("Нет активной сессии", error);
            setUser(null);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkUserStatus();
    }, [checkUserStatus]);

    const login = async (email, password) => {
        const response = await axios.post('/auth/login', { email, password });
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        // В будущем здесь будет POST запрос на /auth/logout для удаления cookie на сервере
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = { user, loading, login, logout };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
