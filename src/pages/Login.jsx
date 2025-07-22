import { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!credentials.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email inválido";
    }

    if (!credentials.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulação de login (substituir por API real)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock de validação
      if (
        credentials.email === "admin@biblioteca.com" &&
        credentials.password === "123456"
      ) {
        onLogin(true);
      } else {
        setErrors({ general: "Email ou senha incorretos" });
      }
    } catch {
      setErrors({ general: "Erro ao fazer login. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro do campo quando começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>📚 Sistema Biblioteca</h1>
          <p>Painel Administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {errors.general && (
            <div className="error-message general-error">{errors.general}</div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              className={errors.email ? "error" : ""}
              placeholder="admin@biblioteca.com"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className={errors.password ? "error" : ""}
              placeholder="••••••"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="login-footer"></div>
      </div>
    </div>
  );
};

export default Login;
