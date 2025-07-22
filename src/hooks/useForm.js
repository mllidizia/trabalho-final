import { useState } from 'react';

/**
 * Hook customizado para gerenciar formulários
 * @param {object} initialValues - Valores iniciais do formulário
 * @param {object} validationRules - Regras de validação
 * @returns {object} - { values, errors, handleChange, handleSubmit, reset, isValid }
 */
export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Função para validar um campo específico
  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return '';

    // Validação obrigatória
    if (rule.required && (!value || value.toString().trim() === '')) {
      return rule.requiredMessage || `${name} é obrigatório`;
    }

    // Validação de comprimento mínimo
    if (rule.minLength && value && value.length < rule.minLength) {
      return rule.minLengthMessage || `${name} deve ter pelo menos ${rule.minLength} caracteres`;
    }

    // Validação de comprimento máximo
    if (rule.maxLength && value && value.length > rule.maxLength) {
      return rule.maxLengthMessage || `${name} deve ter no máximo ${rule.maxLength} caracteres`;
    }

    // Validação de email
    if (rule.email && value && !/\S+@\S+\.\S+/.test(value)) {
      return rule.emailMessage || 'Email inválido';
    }

    // Validação customizada
    if (rule.custom && typeof rule.custom === 'function') {
      const customResult = rule.custom(value, values);
      if (customResult !== true) {
        return customResult;
      }
    }

    return '';
  };

  // Função para validar todos os campos
  const validateAll = () => {
    const newErrors = {};
    let isFormValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isFormValid = false;
      }
    });

    setErrors(newErrors);
    return isFormValid;
  };

  // Manipular mudanças nos campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Marcar campo como "tocado"
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validar campo em tempo real se já foi tocado
    if (touched[name]) {
      const error = validateField(name, fieldValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Manipular blur dos campos
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, values[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Função para submeter o formulário
  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    
    // Marcar todos os campos como tocados
    const allTouched = {};
    Object.keys(validationRules).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validar todos os campos
    if (validateAll()) {
      onSubmit(values);
    }
  };

  // Resetar formulário
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  // Definir valores programaticamente
  const setFieldValue = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Verificar se o formulário é válido
  const hasRequiredFields = Object.keys(validationRules).some(key => validationRules[key].required);
  const isValid = hasRequiredFields ? 
    Object.keys(errors).every(key => !errors[key]) && 
    Object.keys(validationRules).filter(key => validationRules[key].required).every(key => values[key]) :
    Object.keys(errors).every(key => !errors[key]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    isValid,
    validateAll
  };
};
