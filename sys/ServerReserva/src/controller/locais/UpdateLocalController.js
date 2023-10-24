import { prisma } from "../../database/client.js";

export class UpdateLocalController {
  async handle(request, response) {
    const { id, descricao } = request.body;

    const ExisteLocal = await prisma.local.findUnique({
      
      where: {
        id: parseInt(id),
      },
    });
    console.log(ExisteLocal);

    if (ExisteLocal != null) {
      const localUpdate = await prisma.local.update({
        where: {
          id: parseInt(id),
        },
        data: {
          descricao,
          updated_at: new Date(),
        },
      });

      return response.json(localUpdate);
    } else {
      return response.status(400).json({
        message: "ID inexistente.",
      });
    }
  }
}
