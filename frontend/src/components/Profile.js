import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext'; // <-- исправленный импорт

function Profile() {
  const { user } = useUser(); // получаем текущего пользователя из контекста
  const isAdmin = user?.role === 'admin'; // проверяем, админ ли он

  const [users, setUsers] = useState([]);       // список всех пользователей (только для админа)
  const [selectedId, setSelectedId] = useState(null); // выбранный пользователь
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(true);

  // 🔹 Загружаем данные
  useEffect(() => {
    if (isAdmin) {
      fetch('http://localhost:8080/api/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        .finally(() => setLoading(false));
    } else {
      const userId = user?.id || 1; // если нет авторизации, по умолчанию ID=1
      fetch(`http://localhost:8080/api/users/${userId}`)
        .then(res => {
          if (!res.ok) throw new Error('not found');
          return res.json();
        })
        .then(data => {
          setSelectedId(data.id);
          setName(data.name || '');
          setAvatar(data.avatarUrl || '');
        })
        .finally(() => setLoading(false));
    }
  }, [isAdmin, user]);

  // 🔹 Выбор пользователя (для админа)
  const handleSelectUser = (user) => {
    setSelectedId(user.id);
    setName(user.name);
    setAvatar(user.avatarUrl);
  };

  // 🔹 Сохранить (обновить или создать)
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
          setUsers(prev => selectedId
            ? prev.map(u => u.id === data.id ? data : u)
            : [...prev, data]
          );
        }
        setSelectedId(data.id);
        setName(data.name);
        setAvatar(data.avatarUrl);
      })
      .catch(err => console.error('Ошибка при сохранении:', err));
  };

  // 🔹 Удалить пользователя
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

  // 🔹 Создать нового пользователя
  const handleCreateNew = () => {
    setSelectedId(null);
    setName('');
    setAvatar('');
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>Профиль</h2>

      {/* Показываем, кто вошёл */}
      <p>Текущий пользователь: <b>{user?.name || 'Гость'}</b> {isAdmin && '(Администратор)'}</p>

      {/* Если админ — показываем список пользователей */}
      {isAdmin && (
        <div style={{ marginBottom: 20 }}>
          <h3>Список пользователей:</h3>
          {users.map(u => (
            <button
              key={u.id}
              onClick={() => handleSelectUser(u)}
              style={{
                margin: '4px',
                fontWeight: selectedId === u.id ? 'bold' : 'normal'
              }}
            >
              {u.name || `ID ${u.id}`}
            </button>
          ))}
          <button
            onClick={handleCreateNew}
            style={{ marginLeft: 10, backgroundColor: 'green', color: 'white' }}
          >
            Создать нового
          </button>
        </div>
      )}

      {/* Редактирование профиля */}
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
          {selectedId ? 'Сохранить' : 'Создать'}
        </button>
        {isAdmin && selectedId && (
          <button
            onClick={handleDelete}
            style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
