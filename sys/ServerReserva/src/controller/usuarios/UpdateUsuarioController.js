import { prisma } from "../../database/client.js";

export class UpdateUsuarioController {
  async handle(request, response) {
    const {             
        id, 
        nome,
        email,
        is_admin} = request.body;

    const ExisteUsuario = await prisma.usuario.findUnique({
      
      where: {
        id: parseInt(id),
      },
    });
    console.log(ExisteUsuario);

    if (ExisteUsuario != null) {
      const usuarioUpdate = await prisma.usuario.update({
        where: {
          id: parseInt(id),
        },
        data: {
            nome,
            email,
            is_admin,
          updated_at: new Date(),
        },
      });

      return response.json(usuarioUpdate);
    } else {
      return response.status(400).json({
        message: "ID inexistente.",
      });
    }
  }
}
