/* src/pages/Login.tsx */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [tentativas, setTentativas] = useState<number | null>(null);
  const [bloqueado, setBloqueado] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (bloqueado) return;

    try {
      const response = await fetch(`http://localhost:3001/users?email=${email}`);
      const data = await response.json();
      
      if (data.length > 0) {
        const usuario = data[0];

        // Verifica se já está bloqueado no banco
        if (usuario.blocked) {
          setBloqueado(true);
          alert("Esta conta está bloqueada.");
          return;
        }

        if (usuario.password === senha) {
          // Resetar tentativas no sucesso (opcional, dependendo da sua API)
          localStorage.setItem("auth", "true");
          navigate("/dashboard");
        } else {
          // Lógica de incremento de tentativas
          const novasTentativas = (usuario.attempts || 0) + 1;
          const limiteAtingido = novasTentativas >= 3;

          // Atualiza o servidor
          await fetch(`http://localhost:3001/users/${usuario.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              attempts: novasTentativas, 
              blocked: limiteAtingido 
            }),
          });

          setTentativas(novasTentativas);
          if (limiteAtingido) setBloqueado(true);
        }
      } else {
        alert("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao autenticar:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.title}>Iniciar sessão</h1>
          <p style={styles.subtitle}>Use sua Conta para acessar o sistema.</p>
        </header>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              disabled={bloqueado}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={styles.input}
              disabled={bloqueado}
              required
            />
          </div>

          {/* Feedback Visual de Tentativas */}
          {tentativas !== null && !bloqueado && (
            <p style={styles.warningText}>
              Senha incorreta. Tentativa {tentativas} de 3.
            </p>
          )}

          {bloqueado && (
            <p style={styles.errorText}>
              Acesso bloqueado. Entre em contato com o suporte.
            </p>
          )}

          <button 
            type="submit" 
            style={{
              ...styles.button,
              backgroundColor: bloqueado ? '#d2d2d7' : '#0071e3',
              cursor: bloqueado ? 'not-allowed' : 'pointer'
            }}
            disabled={bloqueado}
          >
            {bloqueado ? "Bloqueado" : "Continuar"}
          </button>
        </form>

        <footer style={styles.footer}>
          <a href="#" style={styles.link}>Esqueceu a senha?</a>
        </footer>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    backgroundColor: '#f5f5f7',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    padding: '48px 40px',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.4)',
  },
  header: { marginBottom: '32px' },
  title: { fontSize: '24px', fontWeight: 600, margin: '0 0 8px 0', letterSpacing: '-0.015em', color: '#1d1d1f' },
  subtitle: { fontSize: '14px', color: '#86868b', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: {
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #d2d2d7',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: '#fff',
    transition: 'all 0.3s ease',
  },
  warningText: {
    fontSize: '13px',
    color: '#ff9500', // Laranja Apple para aviso
    margin: '-10px 0 0 0',
    fontWeight: 500,
  },
  errorText: {
    fontSize: '13px',
    color: '#ff3b30', // Vermelho Apple para erro/bloqueio
    margin: '-10px 0 0 0',
    fontWeight: 600,
  },
  button: {
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    color: '#fff',
    fontSize: '17px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  },
  footer: { marginTop: '24px' },
  link: { fontSize: '12px', color: '#0066cc', textDecoration: 'none' }
};