import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaUsers, FaArrowLeft } from "react-icons/fa";
import { Button, Loading } from "../components";
import { usuariosApi } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await usuariosApi.getAll();
      setUsuarios(response.data);
      console.log("Usuários carregados:", response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      setError("Erro ao carregar usuários: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Carregando usuários..." fullscreen />;
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Erro</h2>
        <p>{error}</p>
        <Button onClick={() => navigate("/dashboard")}>
          Voltar ao Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <header
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          padding: "1rem 2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Button
              variant="ghost"
              icon={<FaArrowLeft />}
              onClick={() => navigate("/dashboard")}
              style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
            >
              Voltar
            </Button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "white",
              }}
            >
              <FaUsers style={{ fontSize: "1.5rem" }} />
              <h1 style={{ margin: 0, fontSize: "1.8rem" }}>
                Gerenciar Usuários
              </h1>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              color: "white",
            }}
          >
            <span>{user?.name || user?.email}</span>
            <Button
              variant="ghost"
              size="small"
              onClick={logout}
              style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Lista de Usuários ({usuarios.length})</h2>

          {usuarios.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            <div style={{ display: "grid", gap: "1rem" }}>
              {usuarios.map((usuario) => (
                <div
                  key={usuario.id}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h4 style={{ margin: "0 0 0.5rem 0" }}>{usuario.name}</h4>
                    <p style={{ margin: "0", color: "#666" }}>
                      {usuario.email} • {usuario.cargo}
                    </p>
                    {usuario.telefone && (
                      <p
                        style={{
                          margin: "0",
                          color: "#666",
                          fontSize: "0.9rem",
                        }}
                      >
                        Tel: {usuario.telefone}
                      </p>
                    )}
                  </div>
                  <div
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      backgroundColor: usuario.ativo ? "#c6f6d5" : "#fed7d7",
                      color: usuario.ativo ? "#22543d" : "#742a2a",
                    }}
                  >
                    {usuario.ativo ? "ATIVO" : "INATIVO"}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Button onClick={() => alert("Funcionalidade em desenvolvimento")}>
              Adicionar Usuário
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Usuarios;
