import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Button } from '../components';
import { useAuth } from '../context/AuthContext';
import './Relatorios.css';

const Relatorios = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relatorios-page">
      <header className="page-header">
        <div className="header-content">
          <div className="header-left">
            <Button
              variant="ghost"
              icon={<FaArrowLeft />}
              onClick={() => navigate('/dashboard')}
              className="back-btn"
            >
              Voltar
            </Button>
            <div className="page-title">
              <h1>Relatórios (Em Desenvolvimento)</h1>
            </div>
          </div>
          <div className="user-info">
            <span>{user?.name || user?.email}</span>
            <Button variant="ghost" size="small" onClick={logout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="relatorios-main">
        <div className="coming-soon">
          <h2>📊 Relatórios em Breve</h2>
          <p>Esta funcionalidade estará disponível em uma próxima versão.</p>
          <Button
            variant="primary"
            onClick={() => navigate('/dashboard')}
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Relatorios;
