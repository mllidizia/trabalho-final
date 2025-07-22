import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import Button from './Button';
import './Modal.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  showCloseButton = true,
  closeOnBackdrop = true,
  footer
}) => {
  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  const modalContent = (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className={`modal modal--${size}`}>
        {(title || showCloseButton) && (
          <div className="modal__header">
            {title && <h2 className="modal__title">{title}</h2>}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="small"
                icon={<FaTimes />}
                onClick={onClose}
                className="modal__close"
                aria-label="Fechar modal"
              />
            )}
          </div>
        )}
        
        <div className="modal__body">
          {children}
        </div>
        
        {footer && (
          <div className="modal__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
