import { prisma } from "../../database/client.js";

export class CreateReservaController{

    async handle(request,response)
    {
        const {
            id, 
            hora_ini,
            hora_fim,
            usuario_id,
            local_id
        } = request.body;

        const reserva = await prisma.reserva.create({
            data: {
                id, 
                hora_ini: new Date(hora_ini),
                hora_fim: new Date(hora_fim),
                usuario_id: usuario_id,
                local_id: local_id,
                updated_at: new Date()
            }
        });

        console.log(reserva);
        return response.json(reserva);
    }

}

