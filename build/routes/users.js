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
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { config } = require('../config');
class Users {
    constructor() {
        this.router = express_1.Router();
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = {
                name: req.body.name,
                email: req.body.email,
                password: '',
            };
            body.password = bcrypt_1.default.hashSync(req.body.password, 10);
            try {
                const userDB = yield Users_1.default.create(body);
                return res.json(userDB);
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Ocurrio un error',
                    error,
                });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const userDB = yield Users_1.default.findOne({ email: body.email });
                if (!userDB) {
                    return res.status(400).json({
                        message: 'Email no encontrado'
                    });
                }
                if (!bcrypt_1.default.compareSync(body.password, userDB.password)) {
                    return res.status(400).json({
                        message: 'Contraseña incorrecta'
                    });
                }
                const token = jsonwebtoken_1.default.sign({ data: userDB }, config.authJwtSecret, { expiresIn: 60 * 60 * 24 * 31 });
                return res.json({
                    userDB,
                    token,
                });
            }
            catch (error) {
                return res.status(400).json({
                    message: 'Ocurrio un error',
                    error
                });
            }
        });
    }
    // getPosts(req: Request, res: Response) {
    //     res.send('Publicaciones')
    // }
    routes() {
        // this.router.get('/new-post', this.getPosts)
        this.router.post('/new-user', this.createUser);
        this.router.post('/', this.loginUser);
    }
}
const users = new Users();
users.routes();
exports.default = users.router;
