"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePortalService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const stripe_1 = __importDefault(require("stripe"));
class CreatePortalService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            const stripe = new stripe_1.default(process.env.STRIPE_API_KEY, {
                // @ts-ignore
                apiVersion: '2022-11-15', // Forçando o uso de uma versão estável
                appInfo: {
                    name: 'consultoria',
                    version: '1'
                }
            });
            const findUser = yield prisma_1.default.user.findFirst({
                where: {
                    id: user_id
                }
            });
            if (!findUser) {
                console.log("Usuário não encontradoooooooooooooooooooooooooooooooooooooooo");
                return { message: 'User not found' };
            }
            let sessionId = findUser.stripe_customer_id;
            if (!sessionId) {
                console.log("NAO TEM ");
                return { message: 'User not found' };
            }
            try {
                const portalSession = yield stripe.billingPortal.sessions.create({
                    customer: sessionId,
                    return_url: process.env.STRIPE_SUCCESS_URL
                });
                return { sessionId: portalSession.url };
            }
            catch (error) {
                console.error("Erro ao criar sessão do portal:", error);
                return { message: 'Erro ao criar portal no Stripe' };
            }
        });
    }
}
exports.CreatePortalService = CreatePortalService;
