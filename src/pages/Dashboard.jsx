import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";
import { Header } from "../components/Header/Header";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navegarPara = (rota) => {
    navigate(rota);
  };

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <div className="dashboard-grid">
          <div className="card" onClick={() => navegarPara("/livros")}>
            <h3>📖 Gerenciar Livros</h3>
            <p>Cadastrar, editar, buscar e remover livros do acervo</p>
            <button className="card-button">Acessar</button>
          </div>

          <div className="card" onClick={() => navegarPara("/usuarios")}>
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
