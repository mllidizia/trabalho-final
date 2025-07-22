import { FaEdit, FaTrash, FaEye, FaBook, FaUser, FaCalendar, FaTag } from 'react-icons/fa';
import { Button } from './index';
import './LivroCard.css';

const LivroCard = ({ livro, onEdit, onView, onDelete }) => {
  return (
    <div className="livro-card">
      <div className="livro-card__header">
        <div className="livro-icon">
          <FaBook />
        </div>
        <div className={`livro-status ${livro.disponivel ? 'disponivel' : 'indisponivel'}`}>
          {livro.disponivel ? 'Disponível' : 'Indisponível'}
        </div>
      </div>

      <div className="livro-card__content">
        <h3 className="livro-titulo" title={livro.titulo}>
          {livro.titulo}
        </h3>
        
        <div className="livro-info">
          <div className="info-item">
            <FaUser className="info-icon" />
            <span>{livro.autor}</span>
          </div>
          
          <div className="info-item">
            <FaTag className="info-icon" />
            <span>{livro.categoria}</span>
          </div>
          
          <div className="info-item">
            <FaCalendar className="info-icon" />
            <span>{livro.anoPublicacao}</span>
          </div>
        </div>

        {livro.descricao && (
          <p className="livro-descricao" title={livro.descricao}>
            {livro.descricao.length > 100 
              ? `${livro.descricao.substring(0, 100)}...` 
              : livro.descricao
            }
          </p>
        )}

        <div className="livro-isbn">
          <small>ISBN: {livro.isbn}</small>
        </div>
      </div>

      <div className="livro-card__actions">
        <Button
          variant="ghost"
          size="small"
          icon={<FaEye />}
          onClick={onView}
          title="Visualizar detalhes"
        />
        
        <Button
          variant="ghost"
          size="small"
          icon={<FaEdit />}
          onClick={onEdit}
          title="Editar livro"
        />
        
        <Button
          variant="ghost"
          size="small"
          icon={<FaTrash />}
          onClick={onDelete}
          title="Excluir livro"
          className="delete-btn"
        />
      </div>
    </div>
  );
};

export default LivroCard;
