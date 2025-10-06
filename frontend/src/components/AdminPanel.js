import React from 'react';

function AdminPanel({ onSelectTab, activeTab }) {
  const tabs = [
    { key: 'users', label: 'Пользователи' },
    { key: 'settings', label: 'Настройки' },
  ];

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: 10, display: 'flex', gap: 10 }}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onSelectTab(tab.key)}
          style={{
            fontWeight: activeTab === tab.key ? 'bold' : 'normal',
            backgroundColor: activeTab === tab.key ? '#ddd' : '#fff'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default AdminPanel;
