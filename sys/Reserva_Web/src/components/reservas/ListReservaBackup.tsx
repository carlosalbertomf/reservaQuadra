// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom";
import api from "../../services/api"
// import { LocalInterface } from "../locais/ListLocal";
// import { UsuarioInterface } from "../usuarios/ListUsuario";

// export interface ReservaInterface { 
//     id: number;
//     hora_ini: string;
//     hora_fim: string;
//     usuario_id: string;
//     local_id: string;

//     location: LocalInterface;
//     user: UsuarioInterface;
    
// }


// //componente
// const ListReserva = () => {

//     const handleDeleteReserva = async (id: number) => {

//         //window.alert(id); //mostra o id na tela para testes
//         if(!window.confirm("Confirma a exclusão da Reserva?")){
//             return
//         }
    
//         const data = {
//             id
//         }

    
//         try {
//             await api.delete('/reserva', 
//             {
//                 data: {
//                     id
//                 }
//             });
    

//             setReserva(reserva.filter(reserva => 
//                 reserva.id != id) );
            
//         } catch (error) {
//             alert("Erro na exclusão da Reserva!");
//             console.error(error);
//         }
//     }

//     const [reserva, setReserva] = useState<ReservaInterface[]>([]);

//     useEffect(() => {

//         api.get('/reserva')
//         .then(response => {
//             console.log(response.data);
//             setReserva(response.data);
//         })
//     })


//     return (
//         <div>
//             <h2>Lista de Reservas: </h2>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Data</th>
//                         <th>Hora Inicial</th>
//                         <th>Hora Final</th>
//                         <th>Usuario</th>
//                         <th>Local</th>
//                         <th>Atualizar</th>
//                         <th>Excluir</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {reserva.map(reserva => (
//                         <tr key={reserva.id}>
//                             <td>{reserva.id}</td>
//                             <td>{reserva.hora_ini.split('T')[0]}</td>
//                             <td>{reserva.hora_ini.split('T')[1].substring(0,8)}</td>
//                             <td>{reserva.hora_fim.split('T')[1].substring(0,8)}</td>
//                             <td>{reserva.user.nome}</td>
//                             <td>{reserva.location.descricao}</td>

//                             <td><Link to={`/reserva/${reserva.id}`}>Atualizar</Link></td>
//                             <td><button type="button" 
//                                         className="btn btn-danger btn-xs" 
//                                         onClick={() => {handleDeleteReserva(reserva.id)}}>Excluir</button></td>
//                         </tr>
//                     ))
//                     }
//                 </tbody>
//             </table>

//             <li><Link to="/reserva/novo">Cadastrar Reserva</Link></li>

//             <li><Link to="/">Voltar</Link></li>
            

//         </div>
//     )


// }

// export default ListReserva;