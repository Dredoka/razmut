import React, { useState } from 'react';
import './App.css';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import UserManagement from './components/UserManagement';
import UserSwitcher from './components/UserSwitcher';
import { useUser } from './context/UserContext';

function App() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('map');
  const [activeAdminTab, setActiveAdminTab] = useState(null);

  const renderContent = () => {
    if (user?.isAdmin && activeAdminTab) {
      switch(activeAdminTab) {
        case 'users': return <UserManagement />;
        case 'settings': return <div>Настройки сайта</div>;
        default: return <div>Админ-панель</div>;
      }
    }

    switch(activeTab) {
      case 'profile': return <Profile />;
      case 'map': return <div>Карта</div>;
      case 'rexis': return <div>Рексис</div>;
      case 'messages': return <div>Сообщения</div>;
      case 'search': return <div>Поиск</div>;
      default: return <div>Карта</div>;
    }
  };

  return (
    <div className="App">
      {/* Только если текущий пользователь админ */}
      {user?.isAdmin && <AdminPanel onSelectTab={setActiveAdminTab} />}

      {/* Возможность смены пользователя */}
      <UserSwitcher />

      <div className="content">
        {renderContent()}
      </div>

      <div className="bottom-nav">
        <button onClick={() => { setActiveTab('profile'); setActiveAdminTab(null); }}>Профиль</button>
        <button onClick={() => { setActiveTab('map'); setActiveAdminTab(null); }}>Карта</button>
        <button onClick={() => { setActiveTab('rexis'); setActiveAdminTab(null); }}>Рексис</button>
        <button onClick={() => { setActiveTab('messages'); setActiveAdminTab(null); }}>Сообщения</button>
        <button onClick={() => { setActiveTab('search'); setActiveAdminTab(null); }}>Поиск</button>
      </div>
    </div>
  );
}

export default App;
