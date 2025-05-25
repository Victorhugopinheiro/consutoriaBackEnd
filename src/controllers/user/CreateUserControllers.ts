import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserServices";

class CreateUserController{

    async handle(req:Request, res:Response){
        const {name, email, password, telefone}  = req.body

        const functionService = new CreateUserService
        const returnService = await functionService.execute({name, email, password, telefone})


        res.json(returnService)
    }
}


export {CreateUserController}