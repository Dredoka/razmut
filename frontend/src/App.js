import React, { useState } from 'react';
import './App.css';
import Profile from './components/Profile';


function App() {
  const [activeTab, setActiveTab] = useState('profile');

    const renderContent = () => {
      switch (activeTab) {
        case 'profile':
          return <Profile />;
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
  );
}

export default App;
