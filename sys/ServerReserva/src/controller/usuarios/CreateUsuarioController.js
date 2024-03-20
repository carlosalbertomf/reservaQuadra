import { prisma } from "../../database/client.js";

export class CreateUsuarioController {
  async handle(request, response) {
    const { id, nome, email, is_admin } = request.body;

    // Verifique se o nome de usuário já existe no banco de dados
    //const existingUsuario = await prisma.usuario.findUnique({
    //  where: {
    //    nome,
    //  },
    //});

    //if (existingUsuario) {
    //  return response
    //    .status(400)
    //    .json({ error: "Nome de usuário já existe no banco de dados." });
    //}

    const usuario = await prisma.usuario.create({
      data: {
        id,
        nome,
        email,
        is_admin,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    console.log(usuario);
    return response.json(usuario);
  }
}
