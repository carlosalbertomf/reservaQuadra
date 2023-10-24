// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setUserData, clearUserData } from '../store/userSlice';
// import { RootState } from '../store/store';

// function UserProfile({ userData }) { // Receba os dados do usuário como uma prop
//   const user = useSelector((state: RootState) => state.user);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Exemplo de uso para setUserData
//     const userData = { nome: 'Exemplo', email: 'exemplo@email.com', is_admin: true };
//     dispatch(setUserData(userData));
    
//     // Para limpar os dados do usuário
//     // dispatch(clearUserData());
//   }, [dispatch]);

//   return (
//     <div>
//       <h1>Perfil do Usuário</h1>
//       {userData ? ( 
//         <div>
//           <p>Nome: {userData.nome}</p>
//           <p>Email: {userData.email}</p>
//           <p>É Admin: {userData.is_admin ? 'Sim' : 'Não'}</p>
//         </div>
//       ) : (
//         <p>Nenhum usuário logado.</p>
//       )}
//     </div>
//   );
// }

// export default UserProfile;
