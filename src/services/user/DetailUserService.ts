import prismaClient from "../../prisma"

class DetailUserService{

    async execute(id:string){

        const userDetail = await prismaClient.user.findFirst({
            where:{
                id:id
            },
            select:{
                email:true,
                name:true,
                id:true,
                endereço:true,
                telefone:true,
                subscriptions:{
                    select:{
                        id:true,
                        status:true,
                        priceId:true
                        
                    }
                }
            }
        })


        if(!userDetail){
            throw new Error("Nenhum usuário encontrado")
        }

        return {userDetail}
    }
}


export {DetailUserService}