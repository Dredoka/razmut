import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const AdminPanel = () => {
    // Состояние для хранения списка пользователей
    const [users, setUsers] = useState([]);
    // Состояние для отслеживания процесса загрузки
    const [loading, setLoading] = useState(true);
    // Состояние для отображения ошибок
    const [error, setError] = useState(null);

    // Получаем текущего пользователя из контекста, чтобы убедиться, что он админ
    const { user } = useContext(UserContext);

    // useEffect будет выполнен один раз при монтировании компонента
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Отправляем GET-запрос на защищенный эндпоинт.
                // Axios автоматически прикрепит httpOnly cookie, который мы получили при логине.
                // Если у пользователя нет прав админа, сервер вернет ошибку 403 Forbidden.
                const response = await axios.get('/api/users');

                // Сохраняем полученный список пользователей в состоянии
                setUsers(response.data);
                setError(null);
            } catch (err) {
                console.error("Ошибка при загрузке пользователей:", err);
                setError("Не удалось загрузить список пользователей. Возможно, у вас нет прав доступа.");
            } finally {
                // Вне зависимости от результата, убираем индикатор загрузки
                setLoading(false);
            }
        };

        // Вызываем функцию загрузки данных
        fetchUsers();
    }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз

    // Пока идет загрузка, показываем сообщение
    if (loading) {
        return <p>Загрузка списка пользователей...</p>;
    }

    // Если произошла ошибка, показываем ее
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h1>Панель администратора</h1>
            <p>Вы вошли как: <strong>{user?.email}</strong></p>
            <h2>Список всех пользователей системы</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f2f2f2' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Роли</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Проходим по массиву пользователей и рендерим строку для каждого */}
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{u.id}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{u.email}</td>
                            {/* roles - это массив, преобразуем его в строку */}
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{u.roles.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
