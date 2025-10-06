import React, { useState, useEffect } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка пользователей...</p>;

  return (
    <div>
      <h2>Управление пользователями</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} (ID {user.id})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
