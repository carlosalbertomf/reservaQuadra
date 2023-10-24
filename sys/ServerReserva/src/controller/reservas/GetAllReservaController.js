import { prisma } from "../../database/client.js"

export class GetAllReservaController { 

    async handle(request,response)
    {
        const reserva = await prisma.reserva.findMany({
            include: {
                location: true,
                user: true
            }
        });
        return response.json(reserva);
    }
}
