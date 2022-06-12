import { Router } from 'express';
import { check } from 'express-validator';
import {
    authUser,
    checkTokenUser,
    createUser, 
    deleteAllUsers,
    getAllUsers,
    getUserBySignToken,
    signUpUser
} from '../controllers/authController.js';
import validateFields from '../middlewares/validateFields.js';
const router = Router();

router.get(
    '/authentication/:authToken',
    authUser
);


router.post(
    '/',
    [ 
        check('email', 'El E-mail es obligatorio').not().isEmpty(),
        check('email', 'El formato del E-mail no es válido').isEmail(), 
        validateFields
    ],
    createUser
);

router.put(
    '/sign-up/:signToken',
    [
        check(['firstname', 'lastname'], 'El Nombre y el Apellido son obligatorios').not().isEmpty(),
        check(['firstname', 'lastname'], 'El Nombre y el Apellido tienen un mínimo de 3 caracteres y 25 caracteres').isLength({min: 3, max: 25}),
        check('email', 'El E-mail es obligatorio').not().isEmpty(),
        check('email', 'El formato del E-mail no es válido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({min: 8}),
        validateFields
    ],
    signUpUser
);

router.get(
    '/sign-up/:signToken',
    getUserBySignToken
);

router.get(
    '/',
    deleteAllUsers
);

router.get(
    '/users',
    getAllUsers
);

router.get(
    '/check',
    checkTokenUser
);

export default router;

