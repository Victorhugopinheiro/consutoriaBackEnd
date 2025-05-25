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
exports.AuthUserService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class AuthUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const findUser = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                },
                include: {
                    subscriptions: true
                }
            });
            if (!findUser) {
                throw new Error("Email/senha inválido");
            }
            const hashPassword = findUser.password;
            const comparePassword = yield (0, bcryptjs_1.compare)(password, hashPassword);
            if (!comparePassword) {
                throw new Error("Email/senha inválido");
            }
            const tokenJWT = (0, jsonwebtoken_1.sign)({
                name: findUser.name,
                email: findUser.email
            }, process.env.JWT_SECRET, {
                subject: findUser.id,
                expiresIn: "30d"
            });
            return {
                id: findUser === null || findUser === void 0 ? void 0 : findUser.id,
                name: findUser === null || findUser === void 0 ? void 0 : findUser.name,
                email: findUser === null || findUser === void 0 ? void 0 : findUser.email,
                endereço: findUser === null || findUser === void 0 ? void 0 : findUser.endereço,
                token: tokenJWT,
                subscriptions: (findUser === null || findUser === void 0 ? void 0 : findUser.subscriptions) ? {
                    id: findUser === null || findUser === void 0 ? void 0 : findUser.subscriptions.id,
                    status: findUser === null || findUser === void 0 ? void 0 : findUser.subscriptions.status,
                    priceId: findUser === null || findUser === void 0 ? void 0 : findUser.subscriptions.priceId
                } : null
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
