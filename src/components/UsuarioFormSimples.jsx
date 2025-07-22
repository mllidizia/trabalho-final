import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaBriefcase } from "react-icons/fa";
import { Input, Button } from "./index";

const UsuarioFormSimples = ({
  usuario = null,
  onSubmit,
  onCancel,
  loading = false,
  modo = "criar",
}) => {
  const [formData, setFormData] = useState({
    name: usuario?.name || "",
    email: usuario?.email || "",
    telefone: usuario?.telefone || "",
    cargo: usuario?.cargo || "",
    ativo: usuario?.ativo ?? true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Limpar erro quando usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.cargo.trim()) {
      newErrors.cargo = "Cargo é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "600" }}>
          {modo === "criar" ? "Novo Usuário" : "Editar Usuário"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <Input
            label="Nome Completo"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            icon={<FaUser />}
            placeholder="Digite o nome completo"
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={<FaEnvelope />}
            placeholder="Digite o email"
            required
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <Input
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            error={errors.telefone}
            icon={<FaPhone />}
            placeholder="(24) 99999-9999"
          />

          <Input
            label="Cargo"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            error={errors.cargo}
            icon={<FaBriefcase />}
            placeholder="Digite o cargo"
            required
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              cursor: "pointer",
              padding: "0.75rem",
              borderRadius: "8px",
              border: "2px solid #e2e8f0",
              background: "#f8fafc",
            }}
          >
            <input
              type="checkbox"
              name="ativo"
              checked={formData.ativo}
              onChange={handleChange}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ color: "#4a5568", fontWeight: "500" }}>
              Usuário ativo
            </span>
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid #e2e8f0",
          }}
        >
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
            {modo === "criar" ? "Criar Usuário" : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UsuarioFormSimples;
