import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";


class DetailUserController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id

        const meService = new DetailUserService
        const me = await meService.execute(user_id)


        res.json(me)
    }
}

export {DetailUserController}