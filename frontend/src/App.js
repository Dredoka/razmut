import React, { useState } from 'react';
import './App.css';
import Profile from './components/Profile';
import { UserContext } from './context/UserContext'; // ✅ добавили импорт

function App() {
  const [activeTab, setActiveTab] = useState('profile');

  // ✅ добавили временного пользователя
  const currentUser = {
    id: 1,
    name: 'Тестовый пользователь',
    avatarUrl: 'https://picsum.photos/100'
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />; // пока обычный пользователь
      case 'map':
        return <div>Карта</div>;
      case 'rexis':
        return <div>Рексис</div>;
      case 'messages':
        return <div>Сообщения</div>;
      case 'search':
        return <div>Поиск</div>;
      default:
        return <Profile />;
    }
  };

  return (
    // ✅ оборачиваем всё приложение в контекст
    <UserContext.Provider value={currentUser}>
      <div className="App">
        <div className="content">
          {renderContent()}
        </div>
        <div className="bottom-nav">
          <button onClick={() => setActiveTab('profile')}>Профиль</button>
          <button onClick={() => setActiveTab('map')}>Карта</button>
          <button onClick={() => setActiveTab('rexis')}>Рексис</button>
          <button onClick={() => setActiveTab('messages')}>Сообщения</button>
          <button onClick={() => setActiveTab('search')}>Поиск</button>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
