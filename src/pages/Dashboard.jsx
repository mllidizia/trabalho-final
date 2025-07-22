import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navegarPara = (rota) => {
    navigate(rota);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>📚 Painel Administrativo - Biblioteca</h1>
          <div className="user-info">
            <span>Bem-vindo, {user?.name || user?.email}</span>
            <button onClick={logout} className="logout-btn">
              Sair
            </button>
          </div>
        </div>
      </header>
      
      <main className="dashboard-main">
        <div className="dashboard-grid">
          <div className="card" onClick={() => navegarPara('/livros')}>
            <h3>📖 Gerenciar Livros</h3>
            <p>Cadastrar, editar, buscar e remover livros do acervo</p>
            <button className="card-button">Acessar</button>
          </div>
          
          <div className="card" onClick={() => navegarPara('/usuarios')}>
            <h3>👥 Gerenciar Usuários</h3>
            <p>Cadastrar e gerenciar usuários do sistema</p>
            <button className="card-button">Acessar</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
