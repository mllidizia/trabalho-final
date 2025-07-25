import { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import Input from "./Input";
import Button from "./Button";
import { useDebounce } from "../hooks";
import "./Filter.css";

const Filter = ({
  onFilterChange,
  categories = [],
  placeholder = "Pesquisar...",
  showCategoryFilter = true,
  showAvailabilityFilter = true,
  hideSearch = false,
}) => {
  const [filters, setFilters] = useState({
    search: "",
    categoria: "",
    disponivel: "",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  // Debounce da busca para não fazer muitas requisições
  const debouncedSearch = useDebounce(filters.search, 500);

  // Aplicar filtros quando houver mudanças
  useEffect(() => {
    const activeFilters = {
      ...(debouncedSearch && { titulo: debouncedSearch }),
      ...(filters.categoria && { categoria: filters.categoria }),
      ...(filters.disponivel !== "" && {
        disponivel: filters.disponivel === "true",
      }),
    };

    onFilterChange(activeFilters);
  }, [debouncedSearch, filters.categoria, filters.disponivel, onFilterChange]);

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      categoria: "",
      disponivel: "",
    });
    onFilterChange({});
  };

  const hasActiveFilters =
    filters.search || filters.categoria || filters.disponivel;

  return (
    <div className="filter">
      <div className="filter__main">
        {!hideSearch && (
          <div className="filter__search">
            <div className="search-input">
              <FaSearch className="search-icon" />
              <Input
                type="text"
                placeholder={placeholder}
                value={filters.search}
                onChange={(e) => handleInputChange("search", e.target.value)}
                className="search-field"
              />
            </div>
          </div>
        )}
        {showCategoryFilter && showAvailabilityFilter && (
          <div className="filter__actions">
            <Button
              variant="secondary"
              size="medium"
              icon={<FaFilter />}
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={showAdvanced ? "active" : ""}
            >
              Filtros
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="medium"
                icon={<FaTimes />}
                onClick={clearFilters}
              >
                Limpar
              </Button>
            )}
          </div>
        )}
      </div>

      {showAdvanced && (
        <div className="filter__advanced">
          <div className="filter__row">
            {showCategoryFilter && (
              <div className="filter__field">
                <label className="filter__label">Categoria:</label>
                <select
                  value={filters.categoria}
                  onChange={(e) =>
                    handleInputChange("categoria", e.target.value)
                  }
                  className="filter__select"
                >
                  <option value="">Todas as categorias</option>
                  {categories.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {showAvailabilityFilter && (
              <div className="filter__field">
                <label className="filter__label">Disponibilidade:</label>
                <select
                  value={filters.disponivel}
                  onChange={(e) =>
                    handleInputChange("disponivel", e.target.value)
                  }
                  className="filter__select"
                >
                  <option value="">Todos</option>
                  <option value="true">Disponível</option>
                  <option value="false">Indisponível</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
