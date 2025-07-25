import { api } from "./api";

export const buscarLivros = async (filtros = {}) => {
  const { data } = await api.get("/livros", { params: filtros });
  return data;
};

export const buscarLivroPorID = async (id) => {
  const { data } = await api.get(`/livros/${id}`);
  return data
};

export const criarLivro = async (novoLivro) => {
  const { data } = await api.post("/livros", novoLivro);
  return data;
};

export const editarLivro = async (id, livroAtualizado) => {
  const { data } = await api.put(`/livros/${id}`, livroAtualizado);
  return data;
};

export const deletarLivro = async (id) => {
  await api.delete(`/livros/${id}`);
};