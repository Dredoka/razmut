import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AuthForm from './components/AuthForm';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <UserProvider>
            <Router>
                <div>
                    <nav style={{ padding: '1rem', background: '#eee', marginBottom: '1rem' }}>
                        <Link to="/" style={{ marginRight: '1rem' }}>Главная</Link>
                        <Link to="/profile" style={{ marginRight: '1rem' }}>Профиль</Link>
                        <Link to="/admin" style={{ marginRight: '1rem' }}>Админ-панель</Link>
                        <Link to="/login" style={{ marginRight: '1rem' }}>Войти</Link>
                        <Link to="/register">Регистрация</Link>
                    </nav>

                    <div style={{ padding: '1rem' }}>
                        <Routes>
                            <Route path="/" element={<h1>Добро пожаловать в Razmut!</h1>} />
                            <Route path="/login" element={<AuthForm isRegister={false} />} />
                            <Route path="/register" element={<AuthForm isRegister={true} />} />

                            <Route element={<ProtectedRoute />}>
                                <Route path="/profile" element={<Profile />} />
                            </Route>

                            <Route element={<ProtectedRoute adminOnly={true} />}>
                                <Route path="/admin" element={<AdminPanel />} />
                            </Route>

                            <Route path="*" element={<h1>404: Страница не найдена</h1>} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
