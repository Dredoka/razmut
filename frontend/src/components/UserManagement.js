import React, { useEffect, useState } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(true);

  // Загружаем список пользователей
  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectUser = (user) => {
    setSelectedId(user.id);
    setName(user.name);
    setAvatar(user.avatarUrl);
  };

  const handleCreateNew = () => {
    setSelectedId(null);
    setName('');
    setAvatar('');
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
        if (selectedId) {
          setUsers(prev => prev.map(u => u.id === data.id ? data : u));
        } else {
          setUsers(prev => [...prev, data]);
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
          setUsers(prev => prev.filter(u => u.id !== selectedId));
          handleCreateNew();
        } else {
          alert('Ошибка при удалении');
        }
      })
      .catch(err => console.error('Ошибка при удалении:', err));
  };

  if (loading) return <p>Загрузка пользователей...</p>;

  return (
    <div>
      <h2>Управление пользователями</h2>

      {/* Список пользователей */}
      <div style={{ marginBottom: 20 }}>
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
          Создать нового
        </button>
      </div>

      {/* Форма редактирования / создания */}
      <div>
        {selectedId !== null || true ? (
          <>
            <img
              src={avatar || 'https://picsum.photos/100'}
              alt="Аватар"
              width={100}
              style={{ borderRadius: '50%', marginBottom: 10 }}
            />
            <div>
              <p>Имя:</p>
              <input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div style={{ marginTop: 10 }}>
              <p>Ссылка на аватар:</p>
              <input value={avatar} onChange={e => setAvatar(e.target.value)} />
            </div>
            <div style={{ marginTop: 10 }}>
              <button onClick={handleSave} style={{ marginRight: 10 }}>
                {selectedId ? 'Сохранить изменения' : 'Создать пользователя'}
              </button>
              {selectedId && (
                <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
                  Удалить пользователя
                </button>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default UserManagement;
