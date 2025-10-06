import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const UserSwitcher = () => {
  const { fetchUserById } = useUser();
  const [id, setId] = useState('');

  const handleSwitch = () => {
    if (!id) return;
    fetchUserById(id);
    setId('');
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="number"
        placeholder="Введите ID пользователя"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button onClick={handleSwitch}>Сменить пользователя</button>
    </div>
  );
};

export default UserSwitcher;
