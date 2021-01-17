import { Request, Response, Router } from 'express';
import Order from '../models/Orders';

class Orders {

    router: Router;

    constructor() {
        this.router = Router()
    }

    async getOrders(req: Request, res: Response) {
        try {
            const ordersDB = await Order.find()
            res.json(ordersDB)
        } catch (error) {
            return res.status(400).json({
                mensaje: 'Ocurrio un error',
                error,
            })
        }
    }

    async updateOrders(req: Request, res: Response) {
        try {
            const _id = req.params.id;
            const body = req.body;

            console.log('_id', _id);
            console.log('body', body);

            const orderDB = await Order.findByIdAndUpdate(
                _id,
                body,
                { new: true }
            )
            if (!orderDB) {
                return res.status(400).json({
                    message: 'No se encontró el id indicado',
                })
            }
            res.json(orderDB)
        } catch (error) {
            return res.status(400).json({
                message: 'Ocurrio un error',
                error,
            })
        }
    }

    routes() {
        this.router.get('/order', this.getOrders)
        this.router.put('/order/:id', this.updateOrders)
    }
    
}

const orders = new Orders()
orders.routes()

export default orders.router;

