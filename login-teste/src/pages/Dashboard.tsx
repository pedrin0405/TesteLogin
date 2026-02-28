import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = (): void => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>
      <p>Você está logado 🎉</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}