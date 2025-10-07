// Файл: frontend/src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Флаг для первоначальной проверки авторизации

    // Эта функция будет проверять при загрузке приложения, авторизован ли пользователь
    // Например, можно сделать запрос на бэкенд /api/me, который вернет инфо о юзере по cookie
    const checkUser = async () => {
        try {
            // В реальном приложении лучше создать эндпоинт /api/users/me,
            // который по cookie вернет информацию о текущем пользователе
            // Пока мы можем просто проверять, есть ли данные в localStorage от прошлого сеанса
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Нет активной сессии", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Проверяем пользователя при первом рендере
    useEffect(() => {
        checkUser();
    }, []);

    const login = async (email, password) => {
        // axios будет автоматически отправлять cookie, которые установит сервер
        const response = await axios.post('/auth/login', { email, password });
        
        // Сохраняем информацию о пользователе, полученную от сервера
        const userData = response.data;
        setUser(userData);
        
        // Дублируем в localStorage, чтобы быстро восстанавливать сессию при перезагрузке страницы
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        // Здесь нужно будет также отправлять запрос на бэкенд (/auth/logout),
        // который удалит httpOnly cookie.
        setUser(null);
        localStorage.removeItem('user');
    };
    
    // Передаем состояние и функции в провайдер
    const value = { user, loading, login, logout };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};