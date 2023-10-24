import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioInterface } from "../usuarios/ListUsuario";
import { LocalInterface } from "../locais/ListLocal";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const CreateReserva = () => {
  const [hora_ini, setHoraIni] = useState("");
  const [hora_fim, setHoraFim] = useState("");
  const [usuario_id, setUsuarioId] = useState(0);
  const [local_id, setLocalId] = useState(0);
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<UsuarioInterface[]>([]);
  useEffect(() => {
    api.get("/usuario").then((response) => {
      setUsuario(response.data);
    });
  }, []); // Lista de dependências vazia para evitar loop infinito

  const [local, setLocal] = useState<LocalInterface[]>([]);
  useEffect(() => {
    api.get("/local").then((response) => {
      setLocal(response.data);
    });
  }, []); // Lista de dependências vazia para evitar loop infinito

  const handleNovaReserva = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      hora_ini,
      hora_fim,
      usuario_id,
      local_id,
    };

    try {
      if (
        data.hora_ini === "" ||
        data.hora_fim === "" ||
        usuario_id === 0 ||
        local_id === 0
      ) {
        alert(
          "Dados incompletos. Favor inserir todos os dados para concluir a reserva"
        );
        return;
      }

      await api.post("/reserva", data);
      alert("Reserva cadastrada com sucesso");
      navigate("/reserva");
    } catch (error) {
      alert("Erro ao cadastrar uma nova Reserva");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header bg-dark text-white">
              <h3>Reservar um Horário</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleNovaReserva}>
                <div className="mb-3">
                  <label htmlFor="hora_ini" className="form-label">
                    Início:{" "}
                  </label>
                  <input
                    type="datetime-local"
                    name="hora_ini"
                    id="hora_ini"
                    value={hora_ini}
                    className="form-control"
                    onChange={(e) => setHoraIni(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="hora_fim" className="form-label">
                    Final:{" "}
                  </label>
                  <input
                    type="datetime-local"
                    name="hora_fim"
                    id="hora_fim"
                    value={hora_fim}
                    className="form-control"
                    onChange={(e) => setHoraFim(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Local a ser Reservado: </label>
                  <select
                    name="local"
                    id="local"
                    value={local_id}
                    className="form-select"
                    onChange={(e) => setLocalId(parseInt(e.target.value))}
                  >
                    <option value="0">Selecione</option>
                    {local.map((local) => (
                      <option value={local.id} key={local.id}>
                        {local.descricao}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Nome do Usuário: </label>
                  <select
                    name="usuario"
                    id="usuario"
                    value={usuario_id}
                    className="form-select"
                    onChange={(e) => setUsuarioId(parseInt(e.target.value))}
                  >
                    <option value="0">Selecione</option>
                    {usuario.map((usuario) => (
                      <option value={usuario.id} key={usuario.id}>
                        {usuario.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary">
                    Confirmar Reserva
                  </button>
                  <button type="reset" className="btn btn-secondary">
                    Limpar
                  </button>
                </div>

                <div className="mb-3 d-flex justify-content-center">
                  <Link to="/reserva" className="btn btn-link">
                    Voltar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReserva;
