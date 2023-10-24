import { useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const CreateUsuario = () => {


    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [is_admin, setAdmin] = useState(false);


    const navigate = useNavigate();


    const handleNovoUsuario = async (evenet: React.FormEvent<HTMLFormElement>) => {

        evenet.preventDefault();

        const data = {
            nome,
            email,
            is_admin
        }

        try {
            if (data.nome === "" || data.email === "") {
                alert('Dados incompletos. Favor inserir a descrição do Usuário');

                return
            }

            await api.post('/usuario', data);
            alert('Usuário cadastrado com sucesso');
            navigate('/usuario');

        } catch (error) {
            alert('Erro ao cadastrar um novo Usuário');
            window.location.reload();
            console.error(error);

        }

    }


    return (

        <div>
            <h3>Cadastro de Usuário: </h3>

            <form onSubmit={handleNovoUsuario}>

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
                    <input type="email"
                        name="email"
                        id="email"
                        value={email}
                        placeholder="E-mail do Usuário"
                        onChange={e => setEmail(e.target.value)} 
                    />
                </div>


                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
                <li><Link to="/">Voltar</Link></li>

            </form>
        </div>
    );
}

export default CreateUsuario;