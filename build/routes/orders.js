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
const express_1 = require("express");
const Orders_1 = __importDefault(require("../models/Orders"));
class Orders {
    constructor() {
        this.router = express_1.Router();
    }
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('pase por aquí');
                const ordersDB = yield Orders_1.default.find();
                console.log('ordersDB', ordersDB);
                res.json(ordersDB);
            }
            catch (error) {
                console.log('error', error);
                return res.status(400).json({
                    mensaje: 'Ocurrio un error',
                    error,
                });
            }
        });
    }
    updateOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const body = req.body;
                console.log('_id', _id);
                console.log('body', body);
                const orderDB = yield Orders_1.default.findByIdAndUpdate(_id, body, { new: true });
                if (!orderDB) {
                    return res.status(400).json({
                        message: 'No se encontró el id indicado',
                    });
                }
                res.json(orderDB);
            }
            catch (error) {
                console.log('error', error);
                return res.status(400).json({
                    message: 'Ocurrio un error',
                    error,
                });
            }
        });
    }
    routes() {
        this.router.get('/order', this.getOrders);
        this.router.put('/order/:id', this.updateOrders);
    }
}
const orders = new Orders();
orders.routes();
exports.default = orders.router;
