import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

class UpdateUserController{

async handle(req:Request, res:Response){
    const user_id = req.user_id
    const {name, endereço, telefone} = req.body

    const UpdateService = new UpdateUserService
    const updateUser = await UpdateService.execute({name, endereço, telefone, user_id})

    res.json(updateUser)
}
}


export {UpdateUserController}