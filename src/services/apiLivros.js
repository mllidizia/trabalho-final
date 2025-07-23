import { api } from "./api";

export const buscarLivros = async () => {
  const { data } = await api.get("/livros");
  return data
}

export const buscarLivroPorID = async (id) => {
  const { data } = await api.get(`/livros/${id}`);
  return data
};

export const criarLivro = async (novoLivro) => {
  const { data } = await api.post("/livros", novaTarefa);
  return data;
};

export const editarLivro = async (id, livroAtualizado) => {
  const { data } = await api.put(`/livros/${id}`, tarefaAtualizada);
  return data;
};

export const deletarLivro = async (id) => {
  await api.delete(`/livros/${id}`);
};