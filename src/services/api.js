import axios from 'axios';

// Mock de dados para simular uma API real
let mockUsuarios = [
  {
    id: 1,
    name: 'Admin Biblioteca',
    email: 'admin@biblioteca.com',
    telefone: '(11) 99999-9999',
    cargo: 'Bibliotecário Chefe',
    ativo: true,
    dataCadastro: '2024-01-15'
  },
  {
    id: 2,
    name: 'Maria Silva',
    email: 'maria@biblioteca.com',
    telefone: '(11) 88888-8888',
    cargo: 'Bibliotecária',
    ativo: true,
    dataCadastro: '2024-02-20'
  }
];

let nextUserId = 3;

let mockLivros = [
  {
    id: 1,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    isbn: '9788594318602',
    categoria: 'Literatura',
    anoPublicacao: 1899,
    disponivel: true,
    descricao: 'Romance clássico da literatura brasileira que narra a história de Bentinho e Capitu.'
  },
  {
    id: 2,
    titulo: '1984',
    autor: 'George Orwell',
    isbn: '9788535914849',
    categoria: 'Ficção Científica',
    anoPublicacao: 1949,
    disponivel: true,
    descricao: 'Distopia que retrata um regime totalitário em uma sociedade do futuro.'
  },
  {
    id: 3,
    titulo: 'O Pequeno Príncipe',
    autor: 'Antoine de Saint-Exupéry',
    isbn: '9788595081413',
    categoria: 'Infantil',
    anoPublicacao: 1943,
    disponivel: false,
    descricao: 'Fábula poética sobre um pequeno príncipe que viaja entre planetas.'
  },
  {
    id: 4,
    titulo: 'Código Limpo',
    autor: 'Robert C. Martin',
    isbn: '9788576082675',
    categoria: 'Tecnologia',
    anoPublicacao: 2008,
    disponivel: true,
    descricao: 'Manual de boas práticas para desenvolvimento de software.'
  },
  {
    id: 5,
    titulo: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    isbn: '9788595084738',
    categoria: 'Fantasia',
    anoPublicacao: 1954,
    disponivel: true,
    descricao: 'Épica fantasia sobre a jornada para destruir o Um Anel.'
  }
];

let nextId = 6;

// Simulação de delay de rede
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Serviço da API de Livros
export const livrosApi = {
  // GET - Buscar todos os livros
  async getAll() {
    await delay(800);
    return { data: mockLivros };
  },

  // GET - Buscar livro por ID
  async getById(id) {
    await delay(500);
    const livro = mockLivros.find(l => l.id === parseInt(id));
    if (!livro) {
      throw new Error('Livro não encontrado');
    }
    return { data: livro };
  },

  // POST - Criar novo livro
  async create(livroData) {
    await delay(1000);
    
    // Validação básica
    if (!livroData.titulo || !livroData.autor) {
      throw new Error('Título e autor são obrigatórios');
    }

    // Verificar se ISBN já existe
    if (mockLivros.some(l => l.isbn === livroData.isbn)) {
      throw new Error('ISBN já cadastrado');
    }

    const novoLivro = {
      id: nextId++,
      ...livroData,
      disponivel: livroData.disponivel ?? true
    };

    mockLivros.push(novoLivro);
    return { data: novoLivro };
  },

  // PUT - Atualizar livro
  async update(id, livroData) {
    await delay(800);
    
    const index = mockLivros.findIndex(l => l.id === parseInt(id));
    if (index === -1) {
      throw new Error('Livro não encontrado');
    }

    // Verificar se ISBN já existe em outro livro
    if (livroData.isbn && mockLivros.some(l => l.isbn === livroData.isbn && l.id !== parseInt(id))) {
      throw new Error('ISBN já cadastrado em outro livro');
    }

    mockLivros[index] = { ...mockLivros[index], ...livroData };
    return { data: mockLivros[index] };
  },

  // DELETE - Deletar livro
  async delete(id) {
    await delay(600);
    
    const index = mockLivros.findIndex(l => l.id === parseInt(id));
    if (index === -1) {
      throw new Error('Livro não encontrado');
    }

    const livroRemovido = mockLivros.splice(index, 1)[0];
    return { data: livroRemovido };
  },

  // Buscar livros com filtros
  async search(filtros = {}) {
    await delay(700);
    
    let resultado = [...mockLivros];

    if (filtros.titulo) {
      resultado = resultado.filter(livro => 
        livro.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())
      );
    }

    if (filtros.autor) {
      resultado = resultado.filter(livro => 
        livro.autor.toLowerCase().includes(filtros.autor.toLowerCase())
      );
    }

    if (filtros.categoria) {
      resultado = resultado.filter(livro => 
        livro.categoria.toLowerCase() === filtros.categoria.toLowerCase()
      );
    }

    if (filtros.disponivel !== undefined) {
      resultado = resultado.filter(livro => livro.disponivel === filtros.disponivel);
    }

    return { data: resultado };
  }
};

// Serviço da API de Usuários
export const usuariosApi = {
  // GET - Buscar todos os usuários
  async getAll() {
    await delay(600);
    return { data: mockUsuarios };
  },

  // GET - Buscar usuário por ID
  async getById(id) {
    await delay(400);
    const usuario = mockUsuarios.find(u => u.id === parseInt(id));
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    return { data: usuario };
  },

  // POST - Criar novo usuário
  async create(usuarioData) {
    await delay(1000);
    
    // Validação básica
    if (!usuarioData.name || !usuarioData.email) {
      throw new Error('Nome e email são obrigatórios');
    }

    // Verificar se email já existe
    if (mockUsuarios.some(u => u.email === usuarioData.email)) {
      throw new Error('Email já cadastrado');
    }

    const novoUsuario = {
      id: nextUserId++,
      ...usuarioData,
      ativo: usuarioData.ativo ?? true,
      dataCadastro: new Date().toISOString().split('T')[0]
    };

    mockUsuarios.push(novoUsuario);
    return { data: novoUsuario };
  },

  // PUT - Atualizar usuário
  async update(id, usuarioData) {
    await delay(800);
    
    const index = mockUsuarios.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar se email já existe em outro usuário
    if (usuarioData.email && mockUsuarios.some(u => u.email === usuarioData.email && u.id !== parseInt(id))) {
      throw new Error('Email já cadastrado em outro usuário');
    }

    mockUsuarios[index] = { ...mockUsuarios[index], ...usuarioData };
    return { data: mockUsuarios[index] };
  },

  // DELETE - Deletar usuário
  async delete(id) {
    await delay(600);
    
    const index = mockUsuarios.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
      throw new Error('Usuário não encontrado');
    }

    const usuarioRemovido = mockUsuarios.splice(index, 1)[0];
    return { data: usuarioRemovido };
  },

  // Buscar usuários com filtros
  async search(filtros = {}) {
    await delay(500);
    
    let resultado = [...mockUsuarios];

    if (filtros.name) {
      resultado = resultado.filter(usuario => 
        usuario.name.toLowerCase().includes(filtros.name.toLowerCase())
      );
    }

    if (filtros.email) {
      resultado = resultado.filter(usuario => 
        usuario.email.toLowerCase().includes(filtros.email.toLowerCase())
      );
    }

    if (filtros.cargo) {
      resultado = resultado.filter(usuario => 
        usuario.cargo.toLowerCase().includes(filtros.cargo.toLowerCase())
      );
    }

    if (filtros.ativo !== undefined) {
      resultado = resultado.filter(usuario => usuario.ativo === filtros.ativo);
    }

    return { data: resultado };
  }
};

// Lista de categorias disponíveis
export const categorias = [
  'Literatura',
  'Ficção Científica',
  'Fantasia',
  'Romance',
  'Tecnologia',
  'História',
  'Biografia',
  'Infantil',
  'Educação',
  'Filosofia'
];

// Configuração do Axios (para APIs reais)
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptador para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptador para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

