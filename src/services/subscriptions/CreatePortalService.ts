import prismaClient from "../../prisma";
import Stripe from "stripe";

interface CreatePortalRequest {
    user_id: string;
}

class CreatePortalService {
    async execute({ user_id }: CreatePortalRequest) {

       
        const stripe = new Stripe(
            process.env.STRIPE_API_KEY,
            {
                 // @ts-ignore
                apiVersion: '2022-11-15', // Forçando o uso de uma versão estável
                appInfo: {
                    name: 'consultoria',
                    version: '1'
                }
            }
        );




        const findUser = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        })

        if (!findUser) {
            console.log("Usuário não encontradoooooooooooooooooooooooooooooooooooooooo");
            return { message: 'User not found' };
        }

        let sessionId = findUser.stripe_customer_id;

        if (!sessionId) {
            console.log("NAO TEM ")
            return { message: 'User not found' }
        }

        try {
            const portalSession = await stripe.billingPortal.sessions.create({
                customer: sessionId,
                return_url: process.env.STRIPE_SUCCESS_URL
            });
            
            return { sessionId: portalSession.url };
        } catch (error) {
            console.error("Erro ao criar sessão do portal:", error);
            return { message: 'Erro ao criar portal no Stripe' };
        }




    }
}

export { CreatePortalService }