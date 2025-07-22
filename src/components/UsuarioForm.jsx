import { useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaBriefcase } from "react-icons/fa";
import { useForm } from "../hooks";
import { Input, Button } from "./index";
import "./UsuarioForm.css";

const UsuarioForm = ({
  usuario = null,
  onSubmit,
  onCancel,
  loading = false,
  modo = "criar", // 'criar' ou 'editar'
}) => {
  const validationRules = {
    name: {
      required: true,
      requiredMessage: "Nome é obrigatório",
      minLength: 2,
      minLengthMessage: "Nome deve ter pelo menos 2 caracteres",
    },
    email: {
      required: true,
      email: true,
      requiredMessage: "Email é obrigatório",
      emailMessage: "Email deve ter um formato válido",
    },
    telefone: {
      required: false,
      custom: (value) => {
        if (value && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value)) {
          return "Telefone deve ter o formato (11) 99999-9999";
        }
        return true;
      },
    },
    cargo: {
      required: true,
      requiredMessage: "Cargo é obrigatório",
      minLength: 2,
      minLengthMessage: "Cargo deve ter pelo menos 2 caracteres",
    },
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isValid,
  } = useForm(
    {
      name: "",
      email: "",
      telefone: "",
      cargo: "",
      ativo: true,
    },
    validationRules
  );

  // Preencher formulário quando em modo de edição
  useEffect(() => {
    if (usuario && modo === "editar") {
      setFieldValue("name", usuario.name || "");
      setFieldValue("email", usuario.email || "");
      setFieldValue("telefone", usuario.telefone || "");
      setFieldValue("cargo", usuario.cargo || "");
      setFieldValue("ativo", usuario.ativo ?? true);
    }
  }, [usuario, modo, setFieldValue]);

  const formatTelefone = (value) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara (11) 99999-9999
    if (numbers.length <= 11) {
      const match = numbers.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
      if (match) {
        let formatted = "";
        if (match[1]) formatted += `(${match[1]}`;
        if (match[1] && match[1].length === 2) formatted += ") ";
        if (match[2]) formatted += match[2];
        if (match[3]) formatted += `-${match[3]}`;
        return formatted;
      }
    }
    return value;
  };

  const handleTelefoneChange = (e) => {
    const formatted = formatTelefone(e.target.value);
    setFieldValue("telefone", formatted);
  };

  const onFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <div className="usuario-form">
      <div className="form-header">
        <h3>{modo === "criar" ? "Novo Usuário" : "Editar Usuário"}</h3>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="form-content">
        <div className="form-row">
          <Input
            label="Nome Completo"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            icon={<FaUser />}
            placeholder="Digite o nome completo"
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            icon={<FaEnvelope />}
            placeholder="Digite o email"
            required
          />
        </div>

        <div className="form-row">
          <Input
            label="Telefone"
            name="telefone"
            value={values.telefone}
            onChange={handleTelefoneChange}
            onBlur={handleBlur}
            error={errors.telefone}
            icon={<FaPhone />}
            placeholder="(11) 99999-9999"
            maxLength={15}
          />

          <Input
            label="Cargo"
            name="cargo"
            value={values.cargo}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.cargo}
            icon={<FaBriefcase />}
            placeholder="Digite o cargo"
            required
          />
        </div>

        <div className="form-row">
          <div className="checkbox-group">
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="ativo"
                checked={values.ativo}
                onChange={handleChange}
              />
              <span className="checkbox-label">Usuário ativo</span>
            </label>
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
            disabled={!isValid || loading}
          >
            {modo === "criar" ? "Criar Usuário" : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UsuarioForm;
