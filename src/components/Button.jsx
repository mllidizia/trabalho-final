import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  loading = false, 
  disabled = false,
  icon,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const buttonClass = `
    btn 
    btn--${variant} 
    btn--${size}
    ${loading ? 'btn--loading' : ''}
    ${disabled ? 'btn--disabled' : ''}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className="btn__spinner">
          <span className="spinner"></span>
        </span>
      )}
      
      {icon && !loading && (
        <span className="btn__icon">{icon}</span>
      )}
      
      <span className="btn__text">{children}</span>
    </button>
  );
};

export default Button;
