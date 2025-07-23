import { useState, useEffect, useCallback } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye, FaBook } from "react-icons/fa";
import { Button, Modal, Loading, Filter } from "../components";
import { livrosApi, categorias } from "../services/api";
import { useToggle } from "../hooks";
import LivroForm from "../components/LivroForm";
import LivroCard from "../components/LivroCard";
import "./Livros.css";
import {
  buscarLivros,
  deletarLivro,
  editarLivro,
  criarLivro as criarLivroApi,
} from "../services/apiLivros";

const Livros = () => {
  // Estados principais
  const [livros, setLivros] = useState([]);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados dos modais
  const [
    modalCadastro,
    { toggle: toggleModalCadastro, setFalse: fecharModalCadastro },
  ] = useToggle();
  const [
    modalEdicao,
    { toggle: toggleModalEdicao, setFalse: fecharModalEdicao },
  ] = useToggle();
  const [
    modalVisualizacao,
    { toggle: toggleModalVisualizacao, setFalse: fecharModalVisualizacao },
  ] = useToggle();
  const [
    modalExclusao,
    { toggle: toggleModalExclusao, setFalse: fecharModalExclusao },
  ] = useToggle();

  // Estados de loading das operações
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Carregar livros - GET
  const carregarLivros = useCallback(async (filtros = {}) => {
    try {
      setLoading(true);
      setError(null);

      const data = await buscarLivros();

      setLivros(data);
    } catch (err) {
      setError("Erro ao carregar livros: " + err.message);
      console.error("Erro ao carregar livros:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar livros na inicialização
  useEffect(() => {
    carregarLivros();
  }, [carregarLivros]);

  // Aplicar filtros
  const handleFilterChange = useCallback(
    (filtros) => {
      carregarLivros(filtros);
    },
    [carregarLivros]
  );

  // Criar novo livro - POST
  const criarLivro = async (dadosLivro) => {
    try {
      setLoadingCreate(true);
      const data = await criarLivroApi(dadosLivro);

      setLivros((prev) => [...prev, data]);
      fecharModalCadastro();

      // Mostrar sucesso (você pode implementar um toast aqui)
      alert("Livro cadastrado com sucesso!");
    } catch (err) {
      alert("Erro ao cadastrar livro: " + err.message);
      console.error("Erro ao criar livro:", err);
    } finally {
      setLoadingCreate(false);
    }
  };

  // Atualizar livro - PUT
  const atualizarLivro = async (dadosLivro) => {
    try {
      setLoadingUpdate(true);
      const data = await editarLivro(livroSelecionado.id, dadosLivro);

      setLivros((prev) =>
        prev.map((livro) => (livro.id === livroSelecionado.id ? data : livro))
      );

      fecharModalEdicao();
      setLivroSelecionado(null);

      alert("Livro atualizado com sucesso!");
    } catch (err) {
      alert("Erro ao atualizar livro: " + err.message);
      console.error("Erro ao atualizar livro:", err);
    } finally {
      setLoadingUpdate(false);
    }
  };

  // Excluir livro - DELETE
  const excluirLivro = async () => {
    try {
      setLoadingDelete(true);
      await deletarLivro(livroSelecionado.id);

      setLivros((prev) =>
        prev.filter((livro) => livro.id !== livroSelecionado.id)
      );

      fecharModalExclusao();
      setLivroSelecionado(null);

      alert("Livro excluído com sucesso!");
    } catch (err) {
      alert("Erro ao excluir livro: " + err.message);
      console.error("Erro ao excluir livro:", err);
    } finally {
      setLoadingDelete(false);
    }
  };

  // Abrir modal de edição
  const abrirEdicao = (livro) => {
    setLivroSelecionado(livro);
    toggleModalEdicao();
  };

  // Abrir modal de visualização
  const abrirVisualizacao = (livro) => {
    setLivroSelecionado(livro);
    toggleModalVisualizacao();
  };

  // Abrir modal de exclusão
  const abrirExclusao = (livro) => {
    setLivroSelecionado(livro);
    toggleModalExclusao();
  };

  if (loading && livros.length === 0) {
    return <Loading message="Carregando livros..." fullscreen />;
  }

  return (
    <div className="livros-page">
      <div className="livros-header">
        <div className="livros-title">
          <FaBook className="title-icon" />
          <h1>Gerenciamento de Livros</h1>
        </div>

        <Button
          variant="primary"
          icon={<FaPlus />}
          onClick={toggleModalCadastro}
        >
          Novo Livro
        </Button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <Button variant="ghost" size="small" onClick={() => carregarLivros()}>
            Tentar novamente
          </Button>
        </div>
      )}

      <Filter
        onFilterChange={handleFilterChange}
        categories={categorias}
        placeholder="Pesquisar livros por título ou autor..."
      />

      {loading && livros.length > 0 && (
        <Loading message="Atualizando..." overlay />
      )}

      <div className="livros-grid">
        {livros.length === 0 && !loading ? (
          <div className="empty-state">
            <FaBook className="empty-icon" />
            <h3>Nenhum livro encontrado</h3>
            <p>Comece cadastrando o primeiro livro da biblioteca.</p>
            <Button
              variant="primary"
              icon={<FaPlus />}
              onClick={toggleModalCadastro}
            >
              Cadastrar Primeiro Livro
            </Button>
          </div>
        ) : (
          livros.map((livro) => (
            <LivroCard
              key={livro.id}
              livro={livro}
              onEdit={() => abrirEdicao(livro)}
              onView={() => abrirVisualizacao(livro)}
              onDelete={() => abrirExclusao(livro)}
            />
          ))
        )}
      </div>

      {/* Modal de Cadastro */}
      <Modal
        isOpen={modalCadastro}
        onClose={fecharModalCadastro}
        title="Cadastrar Novo Livro"
        size="large"
      >
        <LivroForm
          onSubmit={criarLivro}
          onCancel={fecharModalCadastro}
          loading={loadingCreate}
        />
      </Modal>

      {/* Modal de Edição */}
      <Modal
        isOpen={modalEdicao}
        onClose={fecharModalEdicao}
        title="Editar Livro"
        size="large"
      >
        {livroSelecionado && (
          <LivroForm
            livro={livroSelecionado}
            onSubmit={atualizarLivro}
            onCancel={fecharModalEdicao}
            loading={loadingUpdate}
          />
        )}
      </Modal>

      {/* Modal de Visualização */}
      <Modal
        isOpen={modalVisualizacao}
        onClose={fecharModalVisualizacao}
        title="Detalhes do Livro"
        size="medium"
      >
        {livroSelecionado && (
          <div className="livro-detalhes">
            <div className="detalhe-grupo">
              <label>Título:</label>
              <p>{livroSelecionado.titulo}</p>
            </div>

            <div className="detalhe-grupo">
              <label>Autor:</label>
              <p>{livroSelecionado.autor}</p>
            </div>

            <div className="detalhe-grupo">
              <label>ISBN:</label>
              <p>{livroSelecionado.isbn}</p>
            </div>

            <div className="detalhe-grupo">
              <label>Categoria:</label>
              <p>{livroSelecionado.categoria}</p>
            </div>

            <div className="detalhe-grupo">
              <label>Ano de Publicação:</label>
              <p>{livroSelecionado.anoPublicacao}</p>
            </div>

            <div className="detalhe-grupo">
              <label>Status:</label>
              <p
                className={`status ${
                  livroSelecionado.disponivel ? "disponivel" : "indisponivel"
                }`}
              >
                {livroSelecionado.disponivel ? "Disponível" : "Indisponível"}
              </p>
            </div>

            {livroSelecionado.descricao && (
              <div className="detalhe-grupo">
                <label>Descrição:</label>
                <p>{livroSelecionado.descricao}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Modal de Exclusão */}
      <Modal
        isOpen={modalExclusao}
        onClose={fecharModalExclusao}
        title="Confirmar Exclusão"
        size="small"
      >
        {livroSelecionado && (
          <div className="modal-exclusao">
            <p>Tem certeza que deseja excluir o livro:</p>
            <strong>"{livroSelecionado.titulo}"</strong>
            <p>Esta ação não pode ser desfeita.</p>

            <div className="modal-actions">
              <Button
                variant="secondary"
                onClick={fecharModalExclusao}
                disabled={loadingDelete}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                icon={<FaTrash />}
                onClick={excluirLivro}
                loading={loadingDelete}
              >
                Excluir
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Livros;
