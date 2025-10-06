import React from 'react';
import { useUser } from '../context/UserContext';

function AdminPanel({ onSelectTab }) {
  const { user } = useUser();
  const isAdmin = user?.role === 'admin';

  if (!isAdmin) return null; // показываем панель только админу

  return (
    <div style={{ padding: 10, backgroundColor: '#333', color: 'white', display: 'flex', gap: 10 }}>
      <span>Админ-панель:</span>
      <button onClick={() => onSelectTab('users')} style={{ backgroundColor: '#555', color: 'white', border: 'none', padding: '5px 10px' }}>
        Управление пользователями
      </button>
      <button onClick={() => onSelectTab('settings')} style={{ backgroundColor: '#555', color: 'white', border: 'none', padding: '5px 10px' }}>
        Настройки сайта
      </button>
    </div>
  );
}

export default AdminPanel;
