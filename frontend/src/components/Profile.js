import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) {
        return <div>Загрузка данных пользователя...</div>;
    }

    return (
        <div>
            <h1>Страница профиля</h1>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Роли:</strong> {user.roles && user.roles.join(', ')}</p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
};

export default Profile;
