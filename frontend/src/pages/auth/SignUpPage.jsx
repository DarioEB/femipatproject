import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import { AuthContext } from '../../context';

const SignUpPage = () => {

    const { getUserBySignToken } = useContext(AuthContext);
    const { signToken } = useParams();

    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const data = await getUserBySignToken(signToken); 
            if (data.ok) {
                setUser(data.user);
            }
        }
        getUser();
    }, [signToken]);

    console.log(user);

    return (
        <>
            <Formik
                initialValues={{
                    firstname: user?.firstname || '',
                    lastname: user?.lastname || '',
                    email: user?.email || '',
                    password: '',
                    repeatPassword: ''
                }}
            >
                <Form
                    className='mt-8'
                    noValidate
                >
                    <fieldset className='border-t'>
                        <legend className='text-red-500 text-center italic font-bold tracking-wider uppercase text-xl px-2'>Registrate en Femipat</legend>

                        <div className='mt-4'>
                            <label
                                htmlFor='firstname'
                                className='block mb-0.5 text-xs pl-2 text-gray-600 font-medium tracking-wide'
                            >Nombre</label>
                            <Field
                                className='p-1.5 border border-gray-200 placeholder:text-gray-200 focus:border-gray-300 outline-none transition-all duration-500 w-full rounded'
                                id='firstname'
                                name='firstname'
                                placeholder='Ingresa tu Nombre'
                                type='text'
                            />
                        </div>

                        <div className='mt-3'>
                            <label
                                htmlFor='lastname'
                                className='block mb-0.5 text-xs pl-2 text-gray-600 font-medium tracking-wide'
                            >Apellido</label>
                            <Field
                                className='p-1.5 border border-gray-200 placeholder:text-gray-200 focus:border-gray-300 outline-none transition-all duration-500 w-full rounded'
                                id='lastname'
                                name='lastname'
                                placeholder='Ingresa tu Apellido'
                                type='text'
                            />
                        </div>

                        <div className='mt-3'>
                            <label
                                htmlFor='email'
                                className='block mb-0.5 text-xs pl-2 text-gray-600 font-medium tracking-wide'
                            >E-mail</label>
                            <Field
                                className='p-1.5 border border-gray-200 placeholder:text-gray-200 focus:border-gray-300 outline-none transition-all duration-500 w-full rounded'
                                id='email'
                                name='email'
                                placeholder='Tu Correo Electrónico'
                                type='email'
                            />
                        </div>

                        <div className='mt-3'>
                            <label
                                htmlFor='password'
                                className='block mb-0.5 text-xs pl-2 text-gray-600 font-medium tracking-wide'
                            >Password</label>
                            <Field
                                className='p-1.5 border border-gray-200 placeholder:text-gray-200 focus:border-gray-300 outline-none transition-all duration-500 w-full rounded'
                                id='password'
                                name='password'
                                placeholder='Tu Contraseña'
                                type='password'
                            />
                        </div>

                        <div className='mt-3'>
                            <label
                                htmlFor='repeatPassword'
                                className='block mb-0.5 text-xs pl-2 text-gray-600 font-medium tracking-wide'
                            >Repite tu password</label>
                            <Field
                                className='p-1.5 border border-gray-200 placeholder:text-gray-200 focus:border-gray-300 outline-none transition-all duration-500 w-full rounded'
                                id='repeatPassword'
                                name='repeatPassword'
                                placeholder='Confirma tu Contraseña'
                                type='password'
                            />
                        </div>
                    </fieldset>
                    <button
                        type='submit'
                        className='w-full transition-all duration-500 text-white bg-indigo-800 hover:bg-indigo-700 mt-6 rounded tracking-wider uppercase font-bold py-2'
                    >
                        Registrarme
                    </button>
                </Form>
            </Formik>
        </>
    )
}

export default SignUpPage;