import React, { useContext } from "react";
import { UserProvider, UserContext } from "./context/UserContext";
import AuthForm from "./components/AuthForm";

function MainApp() {
  const { user, logout, authFetch } = useContext(UserContext);

  const callProtected = async () => {
    const res = await authFetch("http://localhost:8080/api/protected");
    if (res.ok) {
      const data = await res.json();
      alert(JSON.stringify(data));
    } else {
      alert("Не удалось получить защищённый ресурс: " + res.status);
    }
  };

  return user ? (
    <div>
      <h2>Привет, [{user.id}] {user.username}</h2>
      <button onClick={callProtected}>Вызвать защищённый эндпоинт</button>
      <button onClick={logout} style={{ marginLeft: 8 }}>Выйти</button>
    </div>
  ) : (
    <AuthForm />
  );
}

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}
