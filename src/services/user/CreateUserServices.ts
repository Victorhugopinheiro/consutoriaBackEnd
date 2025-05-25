import prismaClient from "../../prisma"
import {hash} from "bcryptjs"

interface UserProps{
    name:string
    email:string
    password:string
    telefone: string
}


class CreateUserService{

    async execute({email, name, password, telefone}:UserProps){

        if(!email){
            throw new Error("Envie um email")
        }

        const findEmail = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })


        if(findEmail){
            throw new Error("Email já existe")
        }



        const passwordHash = await hash(password, 8)



        const createUser = await prismaClient.user.create({
            data:{
                name,
                email,
                password: passwordHash,
                telefone
            },
            select:{
                name:true,
                email:true,
                id:true
            }
        })



        return createUser
        
    }

}


export {CreateUserService}