import React from 'react';

function AdminPanel({ onSelectTab }) {
  return (
    <div style={{ padding: 10, backgroundColor: '#eee', marginBottom: 10 }}>
      <button onClick={() => onSelectTab('users')} style={{ marginRight: 10 }}>Управление пользователями</button>
      <button onClick={() => onSelectTab('settings')}>Настройки сайта</button>
    </div>
  );
}

export default AdminPanel;
