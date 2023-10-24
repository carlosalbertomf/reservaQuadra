import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { UsuarioInterface } from "../usuarios/ListUsuario";
import { LocalInterface } from "../locais/ListLocal";
import "bootstrap/dist/css/bootstrap.min.css"; 

const ListReserva = () => {
  const [hora_ini, setHoraIni] = useState("");
  const [hora_fim, setHoraFim] = useState("");
  const [usuario_id, setUsuarioId] = useState(0);
  const [local_id, setLocalId] = useState(0);

  const [usuario, setUsuario] = useState<UsuarioInterface[]>([]);
  useEffect(() => {
    api.get("/usuario").then((response) => {
      setUsuario(response.data);
    });
  }, []);

  const [local, setLocal] = useState<LocalInterface[]>([]);
  useEffect(() => {
    api.get("/local").then((response) => {
      setLocal(response.data);
    });
  }, []);

  

  const handleDeleteReserva = async (id: number) => {
    try {
      await api.delete(`/reserva/${id}`);
      alert('Reserva excluída com sucesso');
      // ... Qualquer lógica adicional necessária, tal como refetching os dados.
    } catch (error) {
      console.error('Erro ao excluir a reserva:', error);
      alert('Erro ao excluir a reserva');
    }
  };

  const handleNovaReserva = async (diaSemana: number, hora: number) => {
    const data = {
      hora_ini,
      hora_fim,
      usuario_id,
      local_id,
    };

    try {
      if (data.hora_ini === "" || data.hora_fim === "" || usuario_id === 0 || local_id === 0) {
        alert("Dados incompletos. Favor inserir todos os dados para concluir a reserva");
        return;
      }

      await api.post("/reserva", data);
      alert("Reserva cadastrada com sucesso");
    } catch (error) {
      alert("Erro ao cadastrar uma nova Reserva");
      console.error(error);
    }
  };

  const turnos = [
    { nome: "Matutino", inicio: 6, fim: 12 },
    { nome: "Vespertino", inicio: 12, fim: 18 },
    { nome: "Noturno", inicio: 18, fim: 22 },
  ];

  const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  const criarReserva = useCallback((diaSemana: number, hora: number) => {
    setHoraIni(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}T${String(hora).padStart(2, '0')}:00`);
    setHoraFim(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}T${String(hora + 1).padStart(2, '0')}:00`);
    handleNovaReserva(diaSemana, hora);
  }, [hora_ini, hora_fim, usuario_id, local_id]);

  return (
    <div className="container mt-5 bg-dark p-5 rounded">
      <h2 className="text-center text-white mb-5">Calendário de Reservas</h2>
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th>Hora/Dia</th>
            <th>Segunda</th>
            <th>Terça</th>
            <th>Quarta</th>
            <th>Quinta</th>
            <th>Sexta</th>
            <th>Sábado</th>
            <th>Domingo</th>
          </tr>
        </thead>
        <tbody>
          {/* {Array.from({ length: 17 }, (_, i) => i + 8).map((hourIndex) => (
            <tr key={hourIndex}>
              <td>{`${hourIndex}:00 - ${hourIndex + 1}:00`}</td>
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const reservaEncontrada = findReserva(dayIndex, hourIndex);
                console.log(
                  `Dia: ${dayIndex}, Hora: ${hourIndex}, Reserva:`,
                  reservaEncontrada
                );
                return (
                  <td
                    key={dayIndex}
                    className={reservaEncontrada ? "bg-success" : ""}
                  >
                    {reservaEncontrada ? (
                      <>
                        <span>{`${reservaEncontrada.user.nome} (${reservaEncontrada.location.descricao})`}</span>
                        <div className="mt-2">
                          <Link
                            to={`/reserva/${reservaEncontrada.id}`}
                            className="btn btn-warning btn-sm me-2"
                          >
                            Atualizar
                          </Link>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDeleteReserva(reservaEncontrada.id)
                            }
                          >
                            Excluir
                          </button>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                );
              })}
            </tr>
          ))} */}
        </tbody>
      </table>
      <div className="text-center mt-3">
        <Link to="/reserva/novo" className="btn btn-primary">
          Cadastrar Reserva
        </Link>
        <Link to="/" className="btn btn-secondary ms-2">
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default ListReserva;
