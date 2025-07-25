import { NavLink } from "react-router-dom";
import "./SubHeader.css";
export function SubHeader() {
  return (
    <nav className="sub-header">
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        DASHBOARD
      </NavLink>
      <NavLink
        to="/livros"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        LIVROS
      </NavLink>
      <NavLink
        to="/usuarios"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        USUÁRIOS
      </NavLink>
    </nav>
  );
}
