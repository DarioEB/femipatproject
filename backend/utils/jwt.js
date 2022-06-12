import jwt from 'jsonwebtoken';

export const signToken = (_id, email) => {
    if (!process.env.FEMIPAT_AUTH_TOKEN) {
        throw new Error('No hay semilla de JWT - Revisar .env');
    }

    return jwt.sign({
        _id,
        email
    }, process.env.FEMIPAT_AUTH_TOKEN, {
        expiresIn: '30d'
    });
}

export const isValidToken = (token) => {

    if (!process.env.FEMIPAT_AUTH_TOKEN) {
        throw new Error('No hay semilla de JWT - Revisar variables de entrada');
    }

    return new Promise((resolve, reject) => {

        try {
            jwt.verify(token, process.env.FEMIPAT_AUTH_TOKEN || '', (err, payload) => {
                if (err) return reject('JWT no es válido');

                const { _id } = payload;
                resolve(_id);
            })
        } catch (err) {
            reject('JWT no es válido');
        }
    });
}