// Файл: frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AuthForm from './components/AuthForm';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute'; // <-- Импортируем

function App() {
    return (
        <UserProvider>
            <Router>
                <div>
                    <nav>
                        {/* Ваша навигация */}
                    </nav>

                    <Routes>
                        {/* Публичные роуты */}
                        <Route path="/" element={<h1>Добро пожаловать!</h1>} />
                        <Route path="/login" element={<AuthForm isRegister={false} />} />
                        <Route path="/register" element={<AuthForm isRegister={true} />} />

                        {/* Защищенные роуты */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/profile" element={<Profile />} />
                        </Route>

                        {/* Роуты только для админа */}
                        <Route element={<ProtectedRoute adminOnly={true} />}>
                            <Route path="/admin" element={<AdminPanel />} />
                        </Route>
                        
                        {/* Страница не найдена */}
                        <Route path="*" element={<h1>404: Страница не найдена</h1>} />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;