// Файл: frontend/src/components/Profile.js
import React, { useContext } from 'react'; // <-- Импортируем useContext
import { UserContext } from '../context/UserContext'; // <-- Импортируем сам UserContext
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    // Правильно получаем данные из контекста
    const { user, logout } = useContext(UserContext); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Вызываем функцию выхода из контекста
        navigate('/login'); // Перенаправляем на страницу входа
    };

    // Если по какой-то причине нет данных о пользователе, показываем сообщение
    if (!user) {
        return <div>Загрузка данных пользователя...</div>;
    }

    return (
        <div>
            <h1>Страница профиля</h1>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Преобразуем массив ролей в строку для отображения */}
            <p><strong>Роли:</strong> {user.roles.map(role => role.authority).join(', ')}</p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
};

export default Profile;