import React, { useState, useEffect } from 'react';

function Profile({ isAdmin = false }) {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetch('http://localhost:8080/api/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        .finally(() => setLoading(false));
    } else {
      fetch('http://localhost:8080/api/users/1')
        .then(res => {
          if (!res.ok) return null;
          return res.json();
        })
        .then(data => {
          if (!data) return;
          setSelectedId(data.id);
          setName(data.name || '');
          setAvatar(data.avatarUrl || '');
        })
        .finally(() => setLoading(false));
    }
  }, [isAdmin]);

  const handleSave = () => {
    const userData = { name, avatarUrl: avatar };
    const url = selectedId ? `http://localhost:8080/api/users/${selectedId}` : 'http://localhost:8080/api/users';
    const method = selectedId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        alert(selectedId ? 'Профиль обновлён!' : `Пользователь создан с ID ${data.id}`);
        if (isAdmin) {
          setUsers(prev => selectedId ? prev.map(u => u.id === data.id ? data : u) : [...prev, data]);
        }
        setSelectedId(data.id);
        setName(data.name);
        setAvatar(data.avatarUrl);
      })
      .catch(err => console.error('Ошибка при сохранении:', err));
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>Профиль</h2>
      <div>
        <img src={avatar || 'https://picsum.photos/100'} alt="Аватар" width={100} style={{ borderRadius: '50%' }} />
        <div>
          <p>Имя:</p>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p>Ссылка на аватар:</p>
          <input value={avatar} onChange={e => setAvatar(e.target.value)} />
        </div>
        <button onClick={handleSave} style={{ marginTop: '10px' }}>
          {selectedId ? 'Сохранить изменения' : 'Создать пользователя'}
        </button>
      </div>
    </div>
  );
}

export default Profile;
