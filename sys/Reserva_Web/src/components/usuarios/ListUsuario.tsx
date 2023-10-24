import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import api from "../../services/api"

export interface UsuarioInterface { 
    id: number;
    nome: string;
    email: string;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
}


//componente
const ListUsuario = () => {

    const handleDeleteUsuario = async (id: number) => {

        if(!window.confirm("Confirma a exclusão do Usuário?")){
            return
        }
    
        const data = {
            id
        }

    
        try {
            await api.delete('/usuario', 
            {
                data: {
                    id
                }
            });
    
            setUsuario(usuario.filter(usuario => 
                usuario.id != id) );
            
        } catch (error) {
            alert("Erro na exclusão do Usuário!");
            console.error(error);
        }
    }

    const [usuario, setUsuario] = useState<UsuarioInterface[]>([]);

    useEffect(() => {

        api.get('/usuario')
        .then(response => {
            console.log(response.data);
            setUsuario(response.data);
        })

    })


    return (

        <div>
            <h2>Lista de Usuários</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>

                <tbody>
                    {usuario.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>

                            <td><Link to={`/usuario/${usuario.id}`}>Atualizar</Link></td>
                            <td><button onClick={() => {handleDeleteUsuario(usuario.id)}}>Excluir</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>

            <li><Link to="/usuario/novo">Cadastrar Usuário</Link></li>

            <li><Link to="/">Voltar</Link></li>
            

        </div>
    )


}

export default ListUsuario;