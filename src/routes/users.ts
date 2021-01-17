import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Users';
import jwt from 'jsonwebtoken';
const { config } = require('../config');

class Users {

    router: Router;

    constructor() {
        this.router = Router()
    }

    async createUser(req: Request, res: Response) {
        let body = {
            name: req.body.name,
            email: req.body.email,
            password: '',
        };

        body.password = bcrypt.hashSync(req.body.password, 10)
        
        try {
            const userDB: any = await User.create(body)
            return res.json(userDB)
        } catch (error) {
            return res.status(500).json({
                message: 'Ocurrio un error',
                error,
            })
        }
    }

    async loginUser(req: Request, res: Response) {
        const body = req.body
        try {
            const userDB: any = await User.findOne({ email: body.email })
            if (!userDB) {
                return res.status(400).json({
                    message: 'Email no encontrado'
                })
            }
            
            if (!bcrypt.compareSync(body.password, userDB.password)) {
                return res.status(400).json({
                    message: 'Contraseña incorrecta'
                })
            }
    
            const token = jwt.sign(
                { data: userDB },
                config.authJwtSecret,
                { expiresIn: 60 * 60 * 24 * 31 }
            )
    
            return res.json({
                userDB,
                token,
            })
        } catch (error) {
            return res.status(400).json({
                message: 'Ocurrio un error',
                error
            })
        }
    }

    // getPosts(req: Request, res: Response) {
    //     res.send('Publicaciones')
    // }

    routes() {
        // this.router.get('/new-post', this.getPosts)
        this.router.post('/new-user', this.createUser)
        this.router.post('/', this.loginUser)
    }
    
}

const users = new Users()
users.routes()

export default users.router;

