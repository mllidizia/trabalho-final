import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import { Button, Loading, Modal, Filter } from "../components";
import UsuarioFormSimples from "../components/UsuarioFormSimples";

import { useAuth } from "../context/AuthContext";
import "./Usuarios.css";
import {
  buscarUsuarios,
  criarUsuario,
  deletarUsuario,
  editarUsuario,
} from "../services/apiUsuarios";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [modoForm, setModoForm] = useState("criar");
  const [loadingForm, setLoadingForm] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      const data = await buscarUsuarios();
      setUsuarios(data);
      setFilteredUsuarios(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      alert("Erro ao carregar usuários: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filtros) => {
    let resultado = usuarios;

    if (filtros.titulo) {
      // O Filter usa 'titulo' como chave de busca
      resultado = resultado.filter(
        (usuario) =>
          usuario.name.toLowerCase().includes(filtros.titulo.toLowerCase()) ||
          usuario.email.toLowerCase().includes(filtros.titulo.toLowerCase()) ||
          usuario.cargo.toLowerCase().includes(filtros.titulo.toLowerCase())
      );
    }

    setFilteredUsuarios(resultado);
  };

  const abrirModalCriar = () => {
    setUsuarioEditando(null);
    setModoForm("criar");
    setShowModal(true);
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setModoForm("editar");
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setUsuarioEditando(null);
    setLoadingForm(false);
  };

  const handleSubmitForm = async (dadosUsuario) => {
    try {
      setLoadingForm(true);

      if (modoForm === "criar") {
        await criarUsuario(dadosUsuario);
        alert("Usuário criado com sucesso!");
      } else {
        await editarUsuario(usuarioEditando.id, dadosUsuario);
        alert("Usuário atualizado com sucesso!");
      }

      await carregarUsuarios();
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário: " + error.message);
    } finally {
      setLoadingForm(false);
    }
  };

  const handleDelete = async (usuario) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o usuário "${usuario.name}"?`
      )
    ) {
      try {
        setLoading(true);
        await deletarUsuario(usuario.id);
        alert("Usuário excluído com sucesso!");
        await carregarUsuarios();
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        alert("Erro ao excluir usuário: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loading message="Carregando usuários..." fullscreen />;
  }

  return (
    <div className="usuarios-page">
      <header className="page-header">
        <div className="header-content">
          <div className="header-left">
            <Button
              variant="ghost"
              icon={<FaArrowLeft />}
              onClick={() => navigate("/dashboard")}
              className="back-btn"
            >
              Voltar
            </Button>
            <div className="page-title">
              <FaUsers className="title-icon" />
              <h1>Gerenciar Usuários</h1>
            </div>
          </div>
          <div className="user-info">
            <span>{user?.name || user?.email}</span>
          </div>
        </div>
      </header>

      <main className="usuarios-main">
        <div className="toolbar">
          <div className="toolbar-left">
            <Filter
              onFilterChange={handleFilter}
              placeholder="Buscar por nome, email ou cargo..."
              showCategoryFilter={false}
              showAvailabilityFilter={false}
            />
          </div>
          <div className="toolbar-right">
            <Button
              variant="primary"
              icon={<FaPlus />}
              onClick={abrirModalCriar}
            >
              Novo Usuário
            </Button>
          </div>
        </div>

        <div className="usuarios-grid">
          {filteredUsuarios.length === 0 ? (
            <div className="empty-state">
              <FaUsers className="empty-icon" />
              <h3>Nenhum usuário encontrado</h3>
              <p>Clique em "Novo Usuário" para cadastrar o primeiro usuário.</p>
            </div>
          ) : (
            filteredUsuarios.map((usuario) => (
              <div key={usuario.id} className="usuario-card">
                <div className="usuario-header">
                  <div className="usuario-avatar">
                    <FaUsers />
                  </div>
                  <div className="usuario-info">
                    <h3>{usuario.name}</h3>
                    <p className="usuario-cargo">{usuario.cargo}</p>
                  </div>
                  <div
                    className={`usuario-status ${
                      usuario.ativo ? "ativo" : "inativo"
                    }`}
                  >
                    {usuario.ativo ? "Ativo" : "Inativo"}
                  </div>
                </div>

                <div className="usuario-details">
                  <div className="detail-item">
                    <strong>Email:</strong>
                    <span>{usuario.email}</span>
                  </div>
                  {usuario.telefone && (
                    <div className="detail-item">
                      <strong>Telefone:</strong>
                      <span>{usuario.telefone}</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <strong>Cadastrado em:</strong>
                    <span>
                      {new Date(usuario.dataCadastro).toLocaleDateString(
                        "pt-BR"
                      )}
                    </span>
                  </div>
                </div>

                <div className="usuario-actions">
                  <Button
                    variant="secondary"
                    size="small"
                    icon={<FaEdit />}
                    onClick={() => abrirModalEditar(usuario)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    icon={<FaTrash />}
                    onClick={() => handleDelete(usuario)}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal do Formulário */}
      <Modal isOpen={showModal} onClose={fecharModal} size="large">
        <UsuarioFormSimples
          usuario={usuarioEditando}
          onSubmit={handleSubmitForm}
          onCancel={fecharModal}
          loading={loadingForm}
          modo={modoForm}
        />
      </Modal>
    </div>
  );
};

export default Usuarios;
