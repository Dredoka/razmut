import React, { useEffect, useState } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Ошибка при загрузке пользователей:', err));
  }, []);

  return (
    <div>
      <h2>Список пользователей</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <span>
              {u.name || `ID ${u.id}`} -{' '}
              <img
                src={u.avatarUrl || 'https://picsum.photos/50'}
                width={50}
                alt="Аватар"
                style={{ borderRadius: '50%' }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
