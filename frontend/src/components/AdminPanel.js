import React from 'react';

const AdminPanel = ({ onSelectTab }) => {
  return (
    <div style={{ border: '1px solid gray', padding: 10, marginBottom: 20 }}>
      <button onClick={() => onSelectTab('users')}>Пользователи</button>
      <button onClick={() => onSelectTab('settings')}>Настройки</button>
    </div>
  );
};

export default AdminPanel;
