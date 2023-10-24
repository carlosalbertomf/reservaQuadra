import { prisma } from "../../database/client.js"

export class GetAllUsuarioController { 

    async handle(request,response)
    {
        const usuario = await prisma.usuario.findMany();
        return response.json(usuario);
    }
}
