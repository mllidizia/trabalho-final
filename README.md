# 📚 Sistema da Biblioteca com React + Vite + JSON Server

Painel administrativo para gerenciamento de biblioteca, com cadastro de livros, organização por categorias e simulação de backend com JSON Server.

---

## 🚀 Tecnologias

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [JSON Server](https://github.com/typicode/json-server)

---

## 📦 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/mllidizia/trabalho-final.git
cd trabalho-final
```

2. **Instale as dependências:**

```bash
npm install
```

---

## ▶️ Como rodar localmente

### 1. Inicie o JSON Server (backend fake):

```bash
npm run mock
```

> Isso irá iniciar o JSON Server em: `http://localhost:3001`

---

### 2. Inicie o frontend com Vite:

Em outro terminal:

```bash
npm run dev
```

> O frontend estará disponível em: `http://localhost:5173`

---

## 🗂 Estrutura do Projeto

```
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── routes/
│   └── App.jsx
├── db.json            # banco de dados simulado
├── package.json
└── vite.config.js
```

---

## ✅ Funcionalidades

- Cadastro, edição e exclusão de livros
- Organização por categorias ou status
- Interface intuitiva e responsiva
- Backend mock com persistência via `db.json`

---

## 🧑‍💻 Autores

- [Renan Neves](https://github.com/renanneves)
- [Caique Caetano](https://github.com/caiquecdsn)
- [Luiza Lidizia](https://github.com/mllidizia)
