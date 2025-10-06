import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

const UserManagement = ({ onSelectTab }) => {
  const [users, setUsers] = useState([]);
  const { fetchUserById, user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:8080/api/users');
        if (!res.ok) throw new Error('Ошибка загрузки пользователей');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  const handleSelectUser = async (id) => {
    await fetchUserById(id);
    if (onSelectTab) onSelectTab('users'); // остаёмся на вкладке пользователей
  };

  const handleSearch = async () => {
    if (!searchId) return;
    const id = parseInt(searchId);
    if (isNaN(id)) {
      alert('Введите корректный ID');
      return;
    }
    await handleSelectUser(id);
  };

  if (loading) return <p>Загрузка пользователей...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Список пользователей</h2>

      {/* Поле поиска пользователя по ID */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Введите ID пользователя"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={handleSearch}>Найти</button>
      </div>

      <ul>
        {users.map(u => (
          <li key={u.id} style={{ marginBottom: 10 }}>
            [{u.id}] {u.name || 'Без имени'} -
            <img
              src={u.avatarUrl || 'https://picsum.photos/50'}
              width={50}
              alt="Аватар"
              style={{ marginLeft: 10 }}
            />
            <button style={{ marginLeft: 10 }} onClick={() => handleSelectUser(u.id)}>
              Сделать текущим
            </button>
          </li>
        ))}
      </ul>

      {user && (
        <p>Текущий выбранный пользователь: [{user.id}] {user.name || 'Без имени'}</p>
      )}
    </div>
  );
};

export default UserManagement;
