import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  email: string;
  password: string;
  attempts: number;
  blocked: boolean;
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:3001/users?email=${email}`
    );

    const data: User[] = await response.json();

    if (data.length === 0) {
      alert("Usuário não encontrado");
      return;
    }

    const user = data[0];

    if (user.blocked) {
      alert("Usuário bloqueado após 3 tentativas!");
      return;
    }

    if (user.password === senha) {
      // reset attempts
      await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attempts: 0 }),
      });

      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      const newAttempts = user.attempts + 1;
      const isBlocked = newAttempts >= 3;

      await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attempts: newAttempts,
          blocked: isBlocked,
        }),
      });

      if (isBlocked) {
        alert("Usuário bloqueado após 3 tentativas!");
      } else {
        alert(`Senha incorreta. Tentativa ${newAttempts}/3`);
      }
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}