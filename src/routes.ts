import express,{ Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserControllers";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { MiddlewareAuth } from "./middleweres/isAutheticated";
import { SubscriptionController } from "./controllers/subscriptions/SubscriptionController";
import { WebhooksController } from "./controllers/subscriptions/WebhooksController";
import { CreatePortalController } from "./controllers/subscriptions/CreatePortalController";
import MercadoPagoConfig from "mercadopago";


const router = Router();

router.get('/teste', (req: Request, res: Response) =>  {
    res.json({ok:true})
})



//User

router.post("/users", new CreateUserController().handle)
router.post("/session", new AuthUserController().handle)
router.get("/me", MiddlewareAuth, new DetailUserController().handle)
router.put("/users", MiddlewareAuth, new UpdateUserController().handle)


//--Pagamentos
router.post("/subscribe", MiddlewareAuth, new SubscriptionController().handle )
router.post('/webhook',express.raw({type:"application/json"}), new WebhooksController().handle)
router.post('/create-portal', MiddlewareAuth, new CreatePortalController().handle)



export {router}