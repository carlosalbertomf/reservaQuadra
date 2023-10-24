import { prisma } from "../../database/client.js";

export class GetByIdReservaController {
    async handle(request, response)
    {
        const {id} = request.params;

        const reserva = await prisma.reserva.findUnique({
            where: 
            {
                id: parseInt(id)
            }
        });

        return response.json(reserva);
    }

    
}