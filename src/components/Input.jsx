import { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  placeholder,
  required = false,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`input-field ${error ? 'error' : ''}`}
        {...props}
      />
      
      {error && (
        <span className="input-error">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
