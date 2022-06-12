import express from 'express';
import http from 'http'; 
import cors from 'cors'; 
import cookieParser from 'cookie-parser';

// rutas
import auth from '../routes/auth.js';
import { connect } from '../database/index.js';
class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.server = http.createServer( this.app );
        // conexión a la base de datos
        connect();
    }

    middlewares() {
        this.app.use( cors({
            credentials: true, 
            origin: true
        }) );
        this.app.options('*', cors() );
        this.app.use( express.json({
            extended: true
        }) );
        this.app.use( cookieParser() );

        this.app.use('/api/auth', auth);
    }

    exec() {
        this.middlewares();
        this.server.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export default Server;