"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importStar(require("express"));
const CreateUserControllers_1 = require("./controllers/user/CreateUserControllers");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const UpdateUserController_1 = require("./controllers/user/UpdateUserController");
const isAutheticated_1 = require("./middleweres/isAutheticated");
const SubscriptionController_1 = require("./controllers/subscriptions/SubscriptionController");
const WebhooksController_1 = require("./controllers/subscriptions/WebhooksController");
const CreatePortalController_1 = require("./controllers/subscriptions/CreatePortalController");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/teste', (req, res) => {
    res.json({ ok: true });
});
//User
router.post("/users", new CreateUserControllers_1.CreateUserController().handle);
router.post("/session", new AuthUserController_1.AuthUserController().handle);
router.get("/me", isAutheticated_1.MiddlewareAuth, new DetailUserController_1.DetailUserController().handle);
router.put("/users", isAutheticated_1.MiddlewareAuth, new UpdateUserController_1.UpdateUserController().handle);
//--Pagamentos
router.post("/subscribe", isAutheticated_1.MiddlewareAuth, new SubscriptionController_1.SubscriptionController().handle);
router.post('/webhook', express_1.default.raw({ type: "application/json" }), new WebhooksController_1.WebhooksController().handle);
router.post('/create-portal', isAutheticated_1.MiddlewareAuth, new CreatePortalController_1.CreatePortalController().handle);
