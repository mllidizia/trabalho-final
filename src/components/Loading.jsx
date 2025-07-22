import './Loading.css';

const Loading = ({ 
  message = 'Carregando...', 
  size = 'medium',
  overlay = false,
  fullscreen = false 
}) => {
  const loadingClass = `
    loading
    loading--${size}
    ${overlay ? 'loading--overlay' : ''}
    ${fullscreen ? 'loading--fullscreen' : ''}
  `.trim();

  return (
    <div className={loadingClass}>
      <div className="loading__content">
        <div className="loading__spinner">
          <div className="spinner-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        
        {message && (
          <p className="loading__message">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Loading;
