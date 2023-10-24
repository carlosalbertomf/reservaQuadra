import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateLocal = () => {
  const [descricao, setDescricao] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/local/${id}`).then(response => {
        setDescricao(response.data.descricao);
    })
  }, [id]);

  const handleUpdateDescricao = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      id: parseInt(String(id)),
      descricao
    }

    try {
      if(data.descricao === "") {
        alert('Dados incompletos. Favor inserir a descrição do Local');
        return
      }

      await api.put('/local', data);
      alert('Local atualizado com sucesso');
      navigate('/local');
    } catch (error) {
      alert('Erro ao atualizar o Local');
      console.error(error);
    }
  };

  return (
    <div className="bg-dark p-4 rounded container">
      <h3 className="text-center mb-4 text-white">Atualização de Local:</h3>

      <form onSubmit={handleUpdateDescricao} className="text-white">
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">Descrição do Local:</label>
          <input 
            type="text"
            name="descricao"
            id="descricao"
            className="form-control"
            value={descricao}
            placeholder="Nome do Local"
            onChange={e => setDescricao(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary me-2">Atualizar</button>
          <Link to="/local" className="btn btn-danger me-2">Cancelar</Link>
          <Link to="/" className="btn btn-secondary">Voltar</Link>
        </div>
      </form>
    </div>
  );
}

export default UpdateLocal;
