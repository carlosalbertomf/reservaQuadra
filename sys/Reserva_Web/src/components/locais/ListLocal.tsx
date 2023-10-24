import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ListLocal.css";

export interface LocalInterface {
  id: number;
  descricao: string;
  created_at: string;
  updated_at: string;
}

const ListLocal: React.FC = () => {
  const handleDeleteLocal = async (id: number) => {
    //window.alert(id); //mostra o id na tela para testes
    if (!window.confirm("Confirma a exclusão do Local?")) {
      return;
    }

    try {
      await api.delete("/local", {
        data: { id },
      });

      //Atualizar a lista após a exclusão
      fetchLocais();
    } catch (error) {
      alert("Erro na exclusão do Local!");
      console.error(error);
    }
  };

  const [locais, setLocal] = useState<LocalInterface[]>([]);

  const fetchLocais = async () => {
    try {
      const response = await api.get("/local");
      console.log(response.data);
      setLocal(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLocais();
  }, []);

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "#b0b0b0",
  };

  return (
    <div className="list-local-container">
      <div className="header">
        <h2>Lista de Locais</h2>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {locais.map((local) => (
            <tr key={local.id}>
              <td>{local.id}</td>
              <td>{local.descricao}</td>
              <td style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <Link to={`/local/${local.id}`} className="btn btn-primary" style={linkStyle}>
                  Atualizar
                </Link>
                <button className="btn btn-danger" onClick={() => handleDeleteLocal(local.id)} style={linkStyle}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="footer">
        <Link to="/local/novo" className="btn btn-success" style={linkStyle}>
          Cadastrar Local
        </Link>
        <Link to="/" className="btn btn-secondary" style={linkStyle}>
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default ListLocal;
