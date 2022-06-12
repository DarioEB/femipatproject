import mongoose from 'mongoose';

export const connect = async () => {
    try{ 
        const connection = await mongoose.connect( process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        const url = `${connection.connection.host}:${connection.connection.port}`; 
        console.log(`MongoDB conectado en: ${url}`);
    } catch (err) {
        console.log(err);
        throw new Error('Error en la bases de datos - view logs');
    }
} 