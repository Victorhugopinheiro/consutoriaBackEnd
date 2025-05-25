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
exports.SubscribeService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const stripe_1 = __importDefault(require("stripe"));
class SubscribeService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            const stripe = new stripe_1.default(process.env.STRIPE_API_KEY, {
                apiVersion: '2025-02-24.acacia',
                appInfo: {
                    name: 'consultoria',
                    version: '1',
                }
            });
            // Buscar o usuario e cadastrar ele no stripe caso nao tenha cadastrado
            const findUser = yield prisma_1.default.user.findFirst({
                where: {
                    id: user_id
                }
            });
            if (!findUser) {
                return false;
            }
            let customerId = findUser.stripe_customer_id;
            if (!customerId) {
                // Caso nao tenha criamos como cliente lá no stripe
                const stripeCustomer = yield stripe.customers.create({
                    email: findUser.email
                });
                yield prisma_1.default.user.update({
                    where: {
                        id: user_id
                    },
                    data: {
                        stripe_customer_id: stripeCustomer.id
                    }
                });
                customerId = stripeCustomer.id;
            }
            // inicializar o nosso checkout de pagamento
            const stripeCheckoutSession = yield stripe.checkout.sessions.create({
                customer: customerId,
                payment_method_types: ['card'],
                billing_address_collection: 'required',
                line_items: [
                    { price: process.env.STRIPE_PRICE, quantity: 1 }
                ],
                mode: 'subscription',
                allow_promotion_codes: true,
                success_url: process.env.STRIPE_SUCCESS_URL,
                cancel_url: process.env.STRIPE_CANCEL_URL
            });
            return { sessionId: stripeCheckoutSession.id };
        });
    }
}
exports.SubscribeService = SubscribeService;
