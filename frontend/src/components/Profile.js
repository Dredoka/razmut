import React, { useState } from 'react';

function Profile() {
  // Тестовые данные пользователя
  const [name, setName] = useState('Иван S.');
  const [avatar, setAvatar] = useState('https://via.placeholder.com/100');

  return (
    <div>
      <h2>Профиль</h2>
      <img src={avatar} alt="Аватар" width={100} style={{ borderRadius: '50%' }} />
      <p>Имя: {name}</p>

      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Ссылка на аватар"
        />
      </div>
    </div>
  );
}

export default Profile;
