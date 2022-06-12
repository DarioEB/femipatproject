import dotenv from 'dotenv';
import Server from './server/index.js';

dotenv.config(); 

const server = new Server(); 
server.exec();