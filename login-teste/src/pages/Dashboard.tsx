import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = (): void => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <span style={styles.emoji}>🎉</span>
        </div>
        
        <h2 style={styles.title}>Bem-vindo de volta</h2>
        <p style={styles.subtitle}>Sua sessão está ativa e você tem acesso total ao painel.</p>

        <div style={styles.statsContainer}>
          <div style={styles.statBox}>
            <span style={styles.statLabel}>Status</span>
            <span style={styles.statValue}>Conectado</span>
          </div>
        </div>

        <button onClick={logout} style={styles.button}>
          Finalizar Sessão
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f5f5f7', // Fundo cinza claro clássico da Apple
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
    width: '100%',
    maxWidth: '440px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  iconContainer: {
    width: '64px',
    height: '64px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 24px auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  emoji: {
    fontSize: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 600,
    color: '#1d1d1f',
    margin: '0 0 8px 0',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '16px',
    color: '#86868b',
    lineHeight: '1.5',
    margin: '0 0 32px 0',
  },
  statsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: '14px',
    padding: '16px',
    marginBottom: '32px',
  },
  statBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: '14px',
    color: '#86868b',
  },
  statValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#34c759', // Verde do iOS
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#1d1d1f', // Botão preto/escuro elegante
    color: '#fff',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};