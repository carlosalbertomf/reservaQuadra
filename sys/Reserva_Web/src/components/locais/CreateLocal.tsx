import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const CreateLocal: React.FC = () => {
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();

  const handleNovoLocal = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (descricao === "") {
      alert("Dados incompletos. Favor inserir a descrição do Local");
      return;
    }

    try {
      await api.post("/local", { descricao });
      alert("Local cadastrado com sucesso");
    } catch (error) {
      alert("Erro ao cadastrar um novo Local" + error);
      console.error(error);
    }
    
    navigate("/local");
  };

  return (
    <div className="container bg-dark text-light p-4 rounded">
      <div>
        <h3 className="mb-3">Cadastro de Local:</h3>
        <form onSubmit={handleNovoLocal}>
          <div className="mb-3">
            <label htmlFor="descricao" className="form-label">Descrição</label>
            <input
              type="text"
              name="descricao"
              id="descricao"
              className="form-control"
              value={descricao}
              placeholder="Nome do Local"
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              Cadastrar
            </button>
            <button type="reset" className="btn btn-secondary">
              Limpar
            </button>
          </div>
        </form>
        <button onClick={() => navigate("/local")} className="btn btn-warning mt-3">
          Voltar
        </button>
      </div>
    </div>
  );
};

export default CreateLocal;
