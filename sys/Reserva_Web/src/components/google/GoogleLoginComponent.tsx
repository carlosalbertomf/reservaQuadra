import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import api from "../../services/api"; // Importe o objeto api configurado com Axios
import { useUser } from "../userContext";

const LoginButton: React.FC = () => {
  const { setUserData } = useUser();

  const handleSuccess = async (credentialResponse: any) => {
    console.log("Login bem-sucedido:", credentialResponse);
    if (credentialResponse.credential) {
      try {
        const decodedToken: any = jwt_decode(credentialResponse.credential);
        console.log("Decoded Token:", decodedToken);

        // Verificar o domínio de e-mail
        const email = decodedToken.email || "";

        if (email.endsWith("@ufop.edu.br")) {
          // Usuário é um discente ou docente
          console.log("Usuário é um discente ou docente");
          // Realize as ações necessárias para discentes ou docentes

          // Crie um novo usuário com permissões de admin no banco de dados
          const data = {
            nome: decodedToken.name,
            email: decodedToken.email,
            is_admin: true,
          };

          // Faça uma solicitação POST para criar o novo usuário
          try {
            const response = await api.post("/usuario", data);

            if (response.status === 200) {
              console.log("Novo usuário criado com sucesso!");
              // Realize outras ações necessárias após a criação do usuário
            } else {
              console.error(
                "Erro ao criar o novo usuário:",
                response.statusText
              );
            }
          } catch (error) {
            console.error("Erro durante a solicitação POST:", error);
          }
        } else if (email.endsWith("@aluno.ufop.edu.br")) {
          // Usuário é um discente
          console.log("Usuário é um discente");
          // Realize as ações necessárias para discentes

          const data = {
            nome: decodedToken.name,
            email: decodedToken.email,
            is_admin: true,
          };

          // Atualize o estado do contexto com os dados do usuário decodificados
          setUserData({
            nome: decodedToken.name,
            email: decodedToken.email,
            is_admin: true, // ou apropriado com base na lógica de domínio de e-mail
          });

          try {

            //verificar se o usuario já está cadastrado, senão, cadastrá-lo
            const UsersList = await api.get("/usuario",);


            let listDeUsers = Object.values(UsersList.data);
            let userExistent = listDeUsers.find(email => data.email)
            console.log(userExistent)

            if(userExistent === null) //Se o usuário já existe no BD, não grava (necessário att os dados desse user?)
            {
              const response = await api.post("/usuario", data);

              if (response.status === 200) {
                console.log("Novo usuário criado com sucesso!");
                // Realize outras ações necessárias após a criação do usuário
              } else {
                console.error(
                  "Erro ao criar o novo usuário:",
                  response.statusText
                );
              }
            }

          } catch (error) {
            console.error("Erro durante a solicitação POST:", error);
          }
        } else if (email.endsWith("@gmail.com")) {
          // Usuário é um usuário comum
          console.log("Usuário é um usuário comum");
          // Realize as ações necessárias para usuários comuns

          // Atualize o estado do contexto com os dados do usuário decodificados
          setUserData({
            nome: decodedToken.name,
            email: decodedToken.email,
            is_admin: false, // ou apropriado com base na lógica de domínio de e-mail
          });
        } else {
          // Outro domínio de e-mail
          console.log("Outro domínio de e-mail");
          // Realize as ações necessárias para outros domínios de e-mail

          // Atualize o estado do contexto com os dados do usuário decodificados
          setUserData({
            nome: decodedToken.name,
            email: decodedToken.email,
            is_admin: false, // ou apropriado com base na lógica de domínio de e-mail
          });
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  };

  const handleError = () => {
    console.error("Erro durante o login");
  };

  return (
    <div className="">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default LoginButton;
