import prismaClient from "../../prisma"

interface UserUpdateProps{
    name:string,
    endereço:string,
    telefone:string
    user_id:string
}


class UpdateUserService{

    async execute({endereço, user_id, name, telefone}:UserUpdateProps){

       

       try{
        const verifyId = await prismaClient.user.findFirst({
            where:{
                id:user_id
            }
        })
  
        if(!verifyId){
          throw new Error("Id do usuário invalido")
        }


        const updateUser = await prismaClient.user.update({
            where:{
                id:user_id
            },
            data:{
                endereço,
                name,
                telefone
            },
            select:{
                name:true,
                endereço:true,
                telefone:true
            }
        })


        return {updateUser}
       }


       catch(err){
        console.log(err)
        throw new Error("error em mudar informações do usuário")
       }

    }
}


export {UpdateUserService}