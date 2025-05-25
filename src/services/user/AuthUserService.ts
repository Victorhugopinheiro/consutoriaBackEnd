import { sign } from "jsonwebtoken"
import prismaClient from "../../prisma"
import { compare } from "bcryptjs"

interface AuthUser{
    email:string
    password:string
}

class AuthUserService{

    async execute({email, password}:AuthUser){
        const findUser = await prismaClient.user.findFirst({
            where:{
                email:email
            },
            include:{
                subscriptions:true
            }
        })


        if(!findUser){
            throw new Error("Email/senha inválido")
        }


        const hashPassword = findUser.password

        const comparePassword = await compare(password, hashPassword)

        if(!comparePassword){
            throw new Error("Email/senha inválido")
        }



        const tokenJWT = sign(
            {
                name:findUser.name,
                email:findUser.email
            },
            process.env.JWT_SECRET,
            {
                subject:findUser.id,
                expiresIn:"30d"
            }

        )


        return{
            id:findUser?.id,
            name:findUser?.name,
            email:findUser?.email,
            endereço: findUser?.endereço,
            token: tokenJWT,
            subscriptions: findUser?.subscriptions ?{
                id:findUser?.subscriptions.id,
                status:findUser?.subscriptions.status,
                priceId:findUser?.subscriptions.priceId
            }: null
        }


    }

}


export {AuthUserService}