import { prisma } from "../../database/client.js";

export class DeleteReservaController{

    async handle(request,response){

        const { id } = request.body;

        try{

            const reserva = await prisma.reserva.delete({
                where: {
                    id: parseInt(id)
                }
            });
            
            return response.json(reserva);
        } catch(error) {
             
            if(error.code === "P2025"){
                 return response.status(400).json({
                    message: `[Delete Reserva] - Impossível excluir pois o id: ${id} não existe!`
                 });
            }
        }

    }
}