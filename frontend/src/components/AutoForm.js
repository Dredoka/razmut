import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function AuthForm() {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`http://localhost:8080/api/auth/${isRegister ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data);
      login(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>{isRegister ? "Регистрация" : "Вход"}</h2>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Логин" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
        <button type="submit">{isRegister ? "Зарегистрироваться" : "Войти"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Уже есть аккаунт?" : "Создать аккаунт"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
