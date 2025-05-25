import { Request, Response } from "express"
import { AuthUserService } from "../../services/user/AuthUserService"


class AuthUserController{

    async handle(req:Request, res:Response){
        const {email, password} = req.body

        const AuthService = new AuthUserService;
        const sessionAuth = await AuthService.execute({email, password})



        res.json(sessionAuth)
    }
}


export {AuthUserController}