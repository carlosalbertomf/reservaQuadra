import { prisma } from "../../database/client.js"

export class GetAllLocalController { 

    async handle(request,response)
    {
        const local = await prisma.local.findMany();
        return response.json(local);
    }
}
