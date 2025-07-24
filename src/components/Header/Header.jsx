import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SubHeader } from "../SubHeader/SubHeader";

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <>
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
      <SubHeader />
    </>
  );
};
