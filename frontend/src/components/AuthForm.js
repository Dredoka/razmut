import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function AuthForm() {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const api = "http://localhost:8080/api/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${api}/${isRegister ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data?.error || JSON.stringify(data);
        throw new Error(msg);
      }
      // ожидаем { token, username, id? }
      const userData = {
        username: data.username,
        token: data.token,
        id: data.id,
      };
      login(userData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 360 }}>
      <h3>{isRegister ? "Регистрация" : "Вход"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br/>
        <input
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>
        <button type="submit">{isRegister ? "Зарегистрироваться" : "Войти"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)} style={{ marginTop: 8 }}>
        {isRegister ? "Уже есть аккаунт? Войти" : "Создать аккаунт"}
      </button>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </div>
  );
}
