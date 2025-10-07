// Файл: frontend/src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

/**
 * Компонент для защиты роутов.
 * Он проверяет, есть ли пользователь в контексте.
 * Если пользователя нет, он перенаправляет на страницу логина.
 * Если пользователь есть, он отображает дочерний компонент (например, страницу профиля).
 */
const ProtectedRoute = ({ adminOnly = false }) => {
    const { user, loading } = useContext(UserContext);

    // Пока идет проверка пользователя (например, запрос к /api/me), можно показывать заглушку
    if (loading) {
        return <div>Загрузка...</div>;
    }

    // Если проверка завершилась и пользователя нет - редирект на логин
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Если роут только для админа, проверяем роль
    if (adminOnly && !user.roles.includes('ADMIN')) {
        // Можно перенаправить на главную или на страницу "доступ запрещен"
        return <Navigate to="/" replace />;
    }

    // Если все проверки пройдены, показываем запрошенную страницу
    return <Outlet />;
};

export default ProtectedRoute;