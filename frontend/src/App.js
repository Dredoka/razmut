import React, { useState } from 'react';
import './App.css';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import UserManagement from './components/UserManagement';
import { useUser } from './context/UserContext';

function App() {
  const [activeTab, setActiveTab] = useState('map'); // по умолчанию "Карта"
  const { user } = useUser();
  const [activeAdminTab, setActiveAdminTab] = useState(null);

  const renderContent = () => {
    // вкладки админ-панели
    if (activeAdminTab === 'users') return <UserManagement />;
    if (activeAdminTab === 'settings') return <div>Настройки сайта</div>;

    // обычные вкладки
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
      <AdminPanel onSelectTab={setActiveAdminTab} />
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