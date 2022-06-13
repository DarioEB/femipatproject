import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Formik,
    Form,
    Field
} from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context'; 
import {
    ErrorField, SweetAlert
} from '../../components'

const LoginPage = () => {

    const [rem, setRem] = useState(false);

    const { loginUser } = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('No puedes enviar campos vacíos'),
        password: Yup.string().required('No puedes enviar campos vacíos')
    });

    const onHandleSubmit = async (values, resetForm) => {
        const response = await loginUser(values);

        if(!response.ok) {
            SweetAlert(
                response.message,
                'Error de logueo',
                'error',
                'Ok',
                function() {
                    console.log('Error');
                }
            )
        }
    }


    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={ async (values, {resetForm}) => onHandleSubmit(values, resetForm)}
            >
                {({errors, touched}) => (
                    <Form
                        className='mt-8'
                        noValidate
                    >
                        <fieldset className='border-t'>
                            <legend className='text-red-500 text-center italic font-bold tracking-wider uppercase text-xl px-2'>Inicia sesión</legend>
                        
                            <div className='mt-4'>
                                <label
                                    htmlFor='email'
                                    className='block mb-0.5 text-xs pl-2 text-gray-600 font-medium tracking-wide'
                                >E-mail</label>
                                <div>
                                    <Field 
                                        className='p-1.5 border text-sm border-gray-300 placeholder:text-gray-300 focus:border-gray-400 outline-none transition-all duration-500 w-full rounded'
                                        id='email'
                                        name='email'
                                        placeholder='Tu Correo Electrónico'
                                        type='email'
                                    />
                                </div>
                                {(errors.email && touched.email) && (
                                    <ErrorField 
                                        message={errors.email}
                                    />
                                )}
                            </div>

                            <div className='mt-3'>
                                <label
                                    htmlFor='password'
                                    className='block mb-0.5 text-xs pl-2 text-gray-600 font-medium tracking-wide'
                                >Password</label>
                                <div>
                                    <Field 
                                        className='p-1.5 border text-sm border-gray-300 placeholder:text-gray-300 focus:border-gray-400 outline-none transition-all duration-500 w-full rounded'
                                        id='password'
                                        name='password'
                                        placeholder='Tu Contraseña'
                                        type='password'
                                    />
                                </div>
                                {(errors.password && touched.password) && (
                                    <ErrorField 
                                        message={errors.password}
                                    />
                                )}
                            </div>

                            <div className='mt-4 flex flex-row-reverse tracking-wider items-center justify-start gap-2 text-gray-400 text-sm font-medium transition-all duration-500'>
                                <button
                                    className='relative w-10 h-6 z-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl outline-none'
                                    type='button'
                                    onClick={() => setRem(!rem)}
                                >
                                    <span className={`absolute w-5 h-5 top-0.5 rounded-full ${rem ? 'right-4 bg-indigo-700' : 'bg-indigo-200 right-1'} transition-all duration-500`}></span>
                                </button>
                                <span className={`relative z-10 `}>Recordar: ({rem ? 'Sí' : 'No'})</span>
                            </div>
                        </fieldset>

                        <button
                            type='submit'
                            className='w-full block transition-all duration-500 text-white bg-indigo-800 hover:bg-indigo-700 mt-4 rounded tracking-wider uppercase font-bold py-2'
                        >
                            Iniciar sesión
                        </button>
                    </Form>
                )}
            </Formik>

            <div className='mt-4 flex items-center justify-between'>
                <Link
                    to={'/'}
                    className='transition-all duration-500 text-sm text-gray-600 md:text-xs hover:underline font-medium tracking-wide'
                >Olvidé mi contraseña</Link>
            </div>
        </>
    )
}

export default LoginPage;