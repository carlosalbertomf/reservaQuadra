import { prisma } from "../../database/client.js";

export class CreateLocalController{

    async handle(request,response)
    {
        const {id, descricao} = request.body;

        const local = await prisma.local.create({
            data: {
                id,
                descricao,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        console.log(local);
        return response.json(local);
    }

}

