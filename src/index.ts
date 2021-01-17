import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import userRoutes from './routes/users';
const { config } = require('./config');

class Server {

    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    config() {
        const MONGO_URI = `mongodb+srv://${config.dbUser}:${config.dbPassword}${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
        
        mongoose.connect(MONGO_URI, options).then(
            () => {
                console.log('connected to mongodb');
            },
            err => {
                console.log('err', err);
            }
        );
        this.app.set('port', config.port || 3000)
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(cors())
    }

    routes() {
        this.app.use(indexRoutes)
        this.app.use('/users', userRoutes)
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        })
    }
}

const server = new Server()
server.start()