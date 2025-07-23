import { api } from "./api";

export const buscarUsuarios = async () => {
  const { data } = await api.get("/usuarios");
  return data
}

export const buscarUsuarioPorID = async (id) => {
  const { data } = await api.get(`/usuarios/${id}`);
  return data
};

export const criarUsuario = async (novoUsuario) => {
  const { data } = await api.post("/usuarios", novoUsuario);
  return data;
};

export const editarUsuario = async (id, usuarioAtualizado) => {
  const { data } = await api.put(`/usuarios/${id}`, livroAtualizado);
  return data;
};

export const deletarUsuario = async (id) => {
  await api.delete(`/usuarios/${id}`);
};