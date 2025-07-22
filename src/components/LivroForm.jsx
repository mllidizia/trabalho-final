import { useState, useEffect } from 'react';
import { Input, Button } from './index';
import { categorias } from '../services/api';
import './LivroForm.css';

const LivroForm = ({ livro, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    categoria: '',
    anoPublicacao: '',
    descricao: '',
    disponivel: true
  });

  const [errors, setErrors] = useState({});

  // Preencher formulário quando receber dados do livro
  useEffect(() => {
    if (livro) {
      setFormData({
        titulo: livro.titulo || '',
        autor: livro.autor || '',
        isbn: livro.isbn || '',
        categoria: livro.categoria || '',
        anoPublicacao: livro.anoPublicacao?.toString() || '',
        descricao: livro.descricao || '',
        disponivel: livro.disponivel ?? true
      });
    } else {
      setFormData({
        titulo: '',
        autor: '',
        isbn: '',
        categoria: '',
        anoPublicacao: '',
        descricao: '',
        disponivel: true
      });
    }
  }, [livro]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    }

    if (!formData.autor.trim()) {
      newErrors.autor = 'Autor é obrigatório';
    }

    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN é obrigatório';
    }

    if (!formData.categoria) {
      newErrors.categoria = 'Categoria é obrigatória';
    }

    if (!formData.anoPublicacao) {
      newErrors.anoPublicacao = 'Ano de publicação é obrigatório';
    } else {
      const ano = parseInt(formData.anoPublicacao);
      const anoAtual = new Date().getFullYear();
      if (isNaN(ano) || ano < 1 || ano > anoAtual) {
        newErrors.anoPublicacao = `Ano deve estar entre 1 e ${anoAtual}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const dadosLivro = {
        ...formData,
        anoPublicacao: parseInt(formData.anoPublicacao),
        disponivel: Boolean(formData.disponivel)
      };
      
      onSubmit(dadosLivro);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="livro-form">
      <div className="form-grid">
        <Input
          label="Título"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          error={errors.titulo}
          placeholder="Digite o título do livro"
          required
          disabled={loading}
        />

        <Input
          label="Autor"
          name="autor"
          value={formData.autor}
          onChange={handleChange}
          error={errors.autor}
          placeholder="Digite o nome do autor"
          required
          disabled={loading}
        />
      </div>

      <div className="form-grid">
        <Input
          label="ISBN"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          error={errors.isbn}
          placeholder="Digite o ISBN"
          required
          disabled={loading}
        />

        <div className="input-group">
          <label className="input-label">Categoria *</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className={`select-field ${errors.categoria ? 'error' : ''}`}
            disabled={loading}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.categoria && (
            <span className="input-error">{errors.categoria}</span>
          )}
        </div>
      </div>

      <div className="form-grid">
        <Input
          label="Ano de Publicação"
          name="anoPublicacao"
          type="number"
          min="1"
          max={new Date().getFullYear()}
          value={formData.anoPublicacao}
          onChange={handleChange}
          error={errors.anoPublicacao}
          placeholder="Digite o ano"
          required
          disabled={loading}
        />

        <div className="input-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="disponivel"
              checked={formData.disponivel}
              onChange={handleChange}
              disabled={loading}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
            Livro disponível para empréstimo
          </label>
        </div>
      </div>

      <div className="form-full">
        <div className="input-group">
          <label className="input-label">Descrição</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="textarea-field"
            placeholder="Digite uma descrição do livro (opcional)"
            rows="4"
            disabled={loading}
          />
        </div>
      </div>

      <div className="form-actions">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          {livro ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
};

export default LivroForm;
