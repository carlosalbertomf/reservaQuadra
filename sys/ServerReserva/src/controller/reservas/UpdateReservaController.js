import { prisma } from "../../database/client.js";

export class UpdateReservaController {
  async handle(request, response) {
    const { id,             
        hora_ini,
        hora_fim,
        usuario_id,
        local_id } = request.body;

    const ExisteReserva = await prisma.reserva.findUnique({
      
      where: {
        id: parseInt(id),
      },
    });
    console.log(ExisteReserva);

    if (ExisteReserva != null) {
      const reservaUpdate = await prisma.reserva.update({
        where: {
          id: parseInt(id),
        },
        data: {
            hora_ini,
            hora_fim,
            usuario_id,
            local_id,
          updated_at: new Date(),
        },
      });

      return response.json(reservaUpdate);
    } else {
      return response.status(400).json({
        message: "ID inexistente.",
      });
    }
  }
}
