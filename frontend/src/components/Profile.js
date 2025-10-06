import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

function Profile() {
  const { user } = useUser(); // получаем текущего пользователя из контекста
  const [users, setUsers] = useState([]); // список всех пользователей (для админа)
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.isAdmin; // автоматически определяем роль

  // загружаем данные
  useEffect(() => {
    if (isAdmin) {
      fetch('http://localhost:8080/api/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        .finally(() => setLoading(false));
    } else {
      fetch(`http://localhost:8080/api/users/${user?.id}`)
        .then(res => res.json())
        .then(data => {
          setSelectedId(data.id);
          setName(data.name || '');
          setAvatar(data.avatarUrl || '');
        })
        .finally(() => setLoading(false));
    }
  }, [isAdmin, user]);

  const handleSelectUser = (u) => {
    setSelectedId(u.id);
    setName(u.name);
    setAvatar(u.avatarUrl);
  };

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

  const handleDelete = () => {
    if (!selectedId) return;
    if (!window.confirm('Вы действительно хотите удалить этого пользователя?')) return;

    fetch(`http://localhost:8080/api/users/${selectedId}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          alert('Пользователь удалён!');
          if (isAdmin) setUsers(prev => prev.filter(u => u.id !== selectedId));
          setSelectedId(null);
          setName('');
          setAvatar('');
        } else {
          alert('Ошибка при удалении');
        }
      })
      .catch(err => console.error('Ошибка при удалении:', err));
  };

  const handleCreateNew = () => {
    setSelectedId(null);
    setName('');
    setAvatar('');
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>Профиль</h2>

      {/* Показываем, какой профиль открыт */}
      {selectedId ? (
        <p>Текущий профиль: {name || `ID ${selectedId}`}</p>
      ) : (
        isAdmin && <p>Создание нового пользователя</p>
      )}

      {/* Список пользователей только для админа */}
      {isAdmin && !selectedId && (
        <div>
          <p>Список пользователей:</p>
          {users.map(u => (
            <button
              key={u.id}
              onClick={() => handleSelectUser(u)}
              style={{ marginRight: 5, fontWeight: selectedId === u.id ? 'bold' : 'normal' }}
            >
              {u.name || `ID ${u.id}`}
            </button>
          ))}
          <button onClick={handleCreateNew} style={{ marginLeft: 10, backgroundColor: 'green', color: 'white' }}>
            Создать нового пользователя
          </button>
        </div>
      )}

      {/* Форма профиля */}
      {(selectedId || !isAdmin || !selectedId) && (
        <div style={{ marginTop: 20 }}>
          <img
            src={avatar || 'https://picsum.photos/100'}
            alt="Аватар"
            width={100}
            style={{ borderRadius: '50%' }}
          />
          <div>
            <p>Имя:</p>
            <input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div style={{ marginTop: '10px' }}>
            <p>Ссылка на аватар:</p>
            <input value={avatar} onChange={e => setAvatar(e.target.value)} />
          </div>
          <button onClick={handleSave} style={{ marginTop: '10px', marginRight: 10 }}>
            {selectedId ? 'Сохранить изменения' : 'Создать пользователя'}
          </button>
          {isAdmin && selectedId && (
            <>
              <button onClick={handleDelete} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
                Удалить пользователя
              </button>
              <button onClick={handleCreateNew} style={{ marginTop: '10px', marginLeft: 10, backgroundColor: 'blue', color: 'white' }}>
                Назад к списку
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
