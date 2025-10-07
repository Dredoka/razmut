// Файл: frontend/src/components/AuthForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const AuthForm = ({ isRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Стейт для хранения текста ошибки
    const [loading, setLoading] = useState(false); // Стейт для индикатора загрузки

    const navigate = useNavigate();
    const { login } = useContext(UserContext); // Получаем функцию login из контекста

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isRegister) {
                // Логика регистрации
                await axios.post('/auth/register', { email, password });
                alert('Регистрация прошла успешно! Теперь вы можете войти.');
                navigate('/login'); // Перенаправляем на страницу входа
            } else {
                // Логика входа
                await login(email, password); // Вызываем login из контекста
                navigate('/profile'); // Перенаправляем в профиль после успешного входа
            }
        } catch (err) {
            // Обрабатываем ошибки от сервера
            const errorMessage = err.response?.data?.message || 'Произошла неизвестная ошибка';
            setError(errorMessage);
            console.error(err);
        } finally {
            setLoading(false); // В любом случае убираем индикатор загрузки
        }
    };

    return (
        <div>
            <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="6"
                    />
                </div>
                {/* Показываем блок с ошибкой, если она есть */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                {/* Блокируем кнопку на время запроса */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Загрузка...' : (isRegister ? 'Зарегистрироваться' : 'Войти')}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;