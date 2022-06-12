import bcryptjs from 'bcryptjs';
import { nanoid } from 'nanoid';
import User from '../models/User.js';
import { jwt } from '../utils/index.js';
export const authUser = async (req, res) => {
    const { authToken } = req.params;

    const user = await User.findOne({authToken});

    if(!user) {
        return res.status(400).json({ 
            ok: false,
            message: 'El Token es autenticación ya no es válido'
        });
    }

    user.confirmed = true;
    user.authToken = '';

    try {
        await user.save({validateBeforeSave: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error al autenticar usuario, revisar logs del servidor'
        });
    }

    return res.status(200).json({
        ok: true,
        message: 'Tu datos se validaron correctamente, ya puede iniciar sesión'
    });
}

export const checkTokenUser = async (req, res) => {
    const { femipatAuthToken } = req.cookies;

    let userID = '';

    try {
        userID = await jwt.isValidToken( femipatAuthToken.toString() ); 
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            message: 'El token no es válido'
        });
    }

    const user = await User.findById(userID);

    if(!user) {
        return res.status(400).json({
            ok: false,
            message: 'El usuario no existe'
        });
    }

    const { firstname, _id, lastname, role, email } = user;

    const token = jwt.signToken(_id, email);

    return res.status(200).json({
        user: { email, firstname, _id, lastname, role },
        token,
        message: 'Token válido' 
    });
}

export const createUser = async (req, res) => {
    const { email = '', role = '' } = req.body;

    // TODO: validación de email

    // TODO: validación de role

    const user = await User.findOne({email});
    
    if(user) {
        return res.status(401).json({
            ok: false,
            message: 'El email ingresado ya está registrado'
        });
    }

    const newUser = await new User({
        email: email.toLocaleLowerCase(),
        role,
        signToken: `${nanoid()}${email.split('@')[0].replace('.', '')}`
    });

    try {
        await newUser.save({validateBeforeSave: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error, revisar logs del servidor'
        });
    }

    // req.user = newUser;

    // TODO: enviar email luego de la creación del usuario

    return res.status(200).json({
        ok: true,
        user: newUser,
        message: 'El usuario fue registrado y en email con las instrucciones fue enviado correctamente'
    });
}

export const deleteAllUsers = async (req, res) => {
    const users = await User.deleteMany();

    console.log(users); 

    if(users.length > 0) {
        return res.status(200).json({
            ok: true,
            message: 'Usuarios eliminados correctamente'
        });
    }
    return res.status(200).json({
        ok: true,
        message: 'No habia usuarios a eliminar'
    });
}

export const getUserBySignToken = async (req, res) => {
    const { signToken } = req.params;

    const user = await User.findOne({signToken});

    if(!user) {
        return res.status(400).json({
            ok: false,
            message: 'El usuario no existe'
        }); 
    }

    return res.status(200).json({
        ok: true,
        user
    });
}

export const getAllUsers = async (req, res) => {
    const users = await User.find({});
    
    res.status(200).json({
        users
    });
}

export const signUpUser = async (req, res) => {
    const { signToken } = req.params;

    const { firstname, lastname, password, role } = req.body;

    // TODO: validar la cantidad de caracteres del password

    if( signToken !== req.body.signToken ) {
        return res.status(400).json({
            ok: false,
            message: 'No coinciden los token de registro'
        });
    }

    const user = await User.findOne({ signToken });

    if(!user) {
        return res.status(400).json({
            ok: false,
            message: 'El Token ya no es válido'
        });
    }

    if(!['admin', 'staff'].includes(role) || user.role !== role) {
        return res.status(401).json({
            ok: false,
            message: 'El Rol ingresado no es permitido o coinciden con el registrado'
        });
    }

    user.firstname = firstname;
    user.lastname = lastname;
    user.password = bcryptjs.hashSync( password, bcryptjs.genSaltSync(12) );
    user.authToken = nanoid();
    user.signToken = '';

    try {
        await user.save({validateBeforeSave: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error, no se pudo completar el registro, revisar logs del servidor'
        });
    }

    req.user = user;

    // TODO: enviar email de registro completado y token de autenticación

    return res.status(200).json({
        ok: true,
        user,
        message: 'El registro se completó correctamente, revisa tu email para confirmar tus datos'
    });
}