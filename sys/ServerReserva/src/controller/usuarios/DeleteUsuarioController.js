import { prisma } from "../../database/client.js";

export class DeleteUsuarioController{

    async handle(request,response){

        const { id } = request.body;

        try{

            const usuario = await prisma.usuario.delete({
                where: {
                    id: parseInt(id)
                }
            });
            
            return response.json(usuario);
        } catch(error) {
             
            if(error.code === "P2025"){
                 return response.status(400).json({
                    message: `[Delete User] - Impossível excluir pois o id: ${id} não existe!`
                 });
            }
        }

    }
}