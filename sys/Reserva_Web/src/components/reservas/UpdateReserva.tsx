import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { LocalInterface } from "../locais/ListLocal";

const UpdateReserva = () => {

    // const [user, setUser] = useState<UsuarioInterface[]>([]);


    // useEffect(() => {
    //     api.get('/usuario').then(response => {
    //         setUser(response.data);
    //     })
    // })



    const [hora_ini, setHoraIni] = useState('');
    const [hora_fim, setHoraFim] = useState('');
    const [usuario_id, setUsuarioId] = useState('');
    const [local_id, setLocalId] = useState(0);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/reserva/${id}`).then(response => {
            setHoraIni(response.data.hora_ini),
                setHoraFim(response.data.hora_fim),
                setUsuarioId(response.data.usuario_id),
                setLocalId(response.data.local_id);
        })
    }, [id]);


    const [locais, setLocal] = useState<LocalInterface[]>([]);

    useEffect(() => {

        api.get('/local')
            .then(response => {
                setLocal(response.data);
            })

    })

    const handleUpdateReserva = async (evenet: React.FormEvent<HTMLFormElement>) => {

        evenet.preventDefault();

        const data = {
            id: parseInt(String(id)),
            hora_ini,
            hora_fim,
            usuario_id,
            local_id
        }

        try {

            if (data.hora_ini === "" || data.hora_fim === "" || usuario_id.toString() === "" || local_id.toString() === "") {
                alert('Dados incompletos. Favor inserir todos os dados para concluir a reserva');

                return
            }



            await api.put('/reserva', data);
            alert('Reserva atualizada com sucesso');
            navigate('/reserva');

        } catch (error) {
            alert('Erro ao atualizar a Reserva');
            console.error(error);

        }

    }


    return (

        <div>
            <h3>Atualizar Reserva: </h3>

            <form onSubmit={handleUpdateReserva}>

                <div>
                    <label htmlFor="hora_ini">Início: </label>
                    <input type="datetime-local"
                        name="hora_ini"
                        id="hora_ini"
                        value={hora_ini}
                        placeholder="Horário Inicial"
                        onChange={e => setHoraIni(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="hora_fim">Final: </label>
                    <input type="datetime-local"
                        name="hora_fim"
                        id="hora_fim"
                        value={hora_fim}
                        placeholder="Horário Final"
                        onChange={e => setHoraFim(e.target.value)}
                    />
                </div>

                <div>
                    <label>Local: </label>
                    <select
                        name="local_id"
                        id="local_id"
                        value={local_id}
                        onChange={e =>
                            setLocalId(parseInt(e.target.value))}>

                        <option
                            value="0"
                            selected>Selecione</option>
                        {
                            locais.map(locais => (
                                <option
                                    value={locais.id}>
                                    {locais.descricao}
                                </option>
                            ))
                        }

                    </select>
                </div>

                <div>
                    <button type="submit">Atualizar</button>
                    <Link to="/reserva">Cancelar</Link>
                    <li> <Link to="/">Voltar</Link> </li>
                </div>
            </form>

        </div>
    );
}

export default UpdateReserva;