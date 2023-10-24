import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import Dropdown from "react-bootstrap/Dropdown";
import api from "../../services/api";
import { Row } from "react-bootstrap";
import "../calendario/MeuComponenteTableCSS.css"
import React from "react";



interface Reserva {
  id: number;
  hora_ini: string; // ou tipo adequado para a data
  user: string;
  usuario_id: string;
  local_id: string;
  data: string;
  // outras propriedades
}


interface PeriodoProps {
  nome: string;
  inicio: number;
  fim: number;
}

const Periodo: React.FC<PeriodoProps> = ({ nome, inicio, fim }) => {
  const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  return (
    <div>
      <h4>{nome}</h4>
      <table className="table w-100">
        <thead>
          <tr>
            <th>Hora</th>
            {diasDaSemana.map(dia => (
              <th key={dia}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: fim - inicio + 1 }).map((_, index) => {
            const hora = inicio + index;
            return (
              <tr key={hora}>
                <td>{hora}:00</td>
                {diasDaSemana.map(dia => (
                  <td className="p-0" key={dia}>
                    <CardComponent data={""} hora={hora} dia={dia} />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface CardComponentTableProps {
  // Adicione propriedades, se necessário
}

const CardComponentTable: React.FC<CardComponentTableProps> = (
  {
    /* Adicione propriedades, se necessário */
  }
) => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // ou alguma data padrão
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    const carregarReservas = async () => {
      try {
        const response = await api.get("/reservas", {
          params: { data: selectedDate.toISOString().split("T")[0] },
        });
        setReservas(response.data);
        console.log(response.data +" Para a data -> "+selectedDate)
      } catch (error) {
        console.error("Erro ao carregar reservas:", error);
      }
    };

    carregarReservas();
  }, [selectedDate]);


  //Verificar o eventKey do setSelectedPeriod: <Dropdown onSelect={(eventKey) => setSelectedPeriod(eventKey)}> - não att os cards com o retorno da request


  const [selectedPeriod, setSelectedPeriod] = React.useState("Matutino");

  return (
    <div className="container col-sm-6">
      <div className="">
        <div className="container row-0">
          <div className="d-flex">
            <Dropdown onSelect={(eventKey) => setSelectedPeriod(eventKey || "")}>
              <Dropdown.Toggle variant="danger" id="periodDropdown">
                Selecione um período
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="Matutino">Matutino</Dropdown.Item>
                <Dropdown.Item eventKey="Vespertino">Vespertino</Dropdown.Item>
                <Dropdown.Item eventKey="Noturno">Noturno</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="container col-5">
              <label htmlFor="data">Selecionar Data:</label>
              <input
                type="date"
                id="data"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />

              {reservas.map((reserva) => (
                <CardComponent
                  key={reserva.id.toString()}
                  data={reserva.data || ""}
                  hora={0} // Aqui você pode passar a hora correta
                  dia={""} // Aqui você pode passar o dia correto
                />
              ))}
            </div>
          </div>
          {selectedPeriod === "Matutino" && <Periodo nome="Matutino" inicio={6} fim={11} />}
          {selectedPeriod === "Vespertino" && <Periodo nome="Vespertino" inicio={12} fim={17} />}
          {selectedPeriod === "Noturno" && <Periodo nome="Noturno" inicio={18} fim={22} />}
        </div>
      </div>
    </div>
  );
};

export default CardComponentTable;