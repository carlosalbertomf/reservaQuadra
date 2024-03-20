import { prisma } from "../../database/client.js";

export class GetByEmailUsuarioController {
    async handle(request, response)
    {

        const {email} = request.params;

        const usuario = await prisma.usuario.findUnique({
            where: 
            {

                email: email
            }
        });

        return response.json(usuario);
    }

    
}