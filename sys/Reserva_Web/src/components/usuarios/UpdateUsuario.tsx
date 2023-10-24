import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateUsuario = () => {

    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [is_admin, setAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/usuario/${id}`).then(response => {
            setNome(response.data.nome),
                setEmail(response.data.email)
        })
    }, [id]);


    const handleUpdateUsuario = async (evenet: React.FormEvent<HTMLFormElement>) => {

        evenet.preventDefault();

        const data = {
            id: parseInt(String(id)),
            nome,
            email,
            is_admin: false
        }

        try {

            if (data.nome === "" || data.email === "") {
                alert('Dados incompletos. Favor inserir a descrição do Usuário');

                return
            }

            await api.put('/usuario', data);
            alert('Usuário atualizado com sucesso');
            navigate('/usuario');


        } catch (error) {
            alert('Erro ao atualizar o Usuário');
            console.error(error);
        }
    }

    return (

        <div>
            <h3>Cadastro de Usuário: </h3>

            <form onSubmit={handleUpdateUsuario}>

                <div>
                    <label htmlFor="nome">Nome: </label>
                    <input type="text"
                        name="nome"
                        id="nome"
                        value={nome}
                        placeholder="Nome do usuário"
                        onChange={e => setNome(e.target.value)} 
                    />
                </div>


                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="text"
                        name="email"
                        id="email"
                        value={email}
                        placeholder="E-mail do Usuário"
                        onChange={e => setEmail(e.target.value)} 
                    />
                </div>

                <button type="submit">Atualizar Usuário</button>
                <Link to="/usuario">Cancelar</Link>
                <li> <Link to="/">Voltar</Link> </li>

            </form>
        </div>
    );
}

export default UpdateUsuario;