import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { AuthContext } from "../../context";

import { ErrorField, SweetAlert } from "../../components";

const validatePasswordConfirmation = (password, repeatPassword) => {
    let error = "";
    if (!password) {
        error = "Debes ingresar de ingresar la contraseña primero";
        return error;
    }
    if (password !== repeatPassword) {
        error = "Los password no son iguales, verifica tus entradas";
    }

    return error;
};

const SignUpPage = () => {
    const { authLoading, userSignUp, getUserBySignToken, signUpUser } =
        useContext(AuthContext);
    const { signToken } = useParams();

    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        role: "",
    });

    useEffect(() => {
        const getUser = async () => {
            const data = await getUserBySignToken(signToken);
            if (data.ok) {
                setUser({
                    firstname: data.user?.firstname || "",
                    lastname: data.user?.lastname || "",
                    email: data.user?.email || "",
                    role: data.user?.role || "",
                    signToken: data.user?.signToken || ''
                });
            } else {
                SweetAlert(
                    data.message,
                    "Error de autenticación, token no válido",
                    "error",
                    "Ir a Login",
                    function () {
                        navigate("/");
                    }
                );
            }
        };
        getUser();
    }, []);

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .min(3, "El Nombre es muy corto")
            .max(25, "El Nombre es muy largo")
            .required("Este campo es requirido"),
        lastname: Yup.string()
            .min(3, "El Apellido es muy corto")
            .max(25, "El Apellido es muy largo")
            .required("Este campo es requirido"),
        email: Yup.string()
            .email("El formato de E-mail no es válido")
            .required("Este campo es obligatorio"),
        password: Yup.string()
            .min(8, "La Contraseña debe tener al menos 8 caracteres")
            .required("Este campo es requerido"),
        repeatPassword: Yup.string().required("Debe confirmar su contraseña"),
    });

    const onHandleSubmit = async (values, resetForm) => {
        const response = await signUpUser(
            { 
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password,
                role: values.role,
                signToken: values.signToken
            },
            signToken
        ); 
        if (response.ok) {
            setUser({ firstname: "", lastname:  "", email:  "", role:  "", signToken:  '' });
            SweetAlert(
                response.message,
                "Registro exitoso",
                "success",
                "OK",
                function () {
                    // navigate("/");
                    resetForm();
                    console.log('Confirmado')
                }
            );
        }
    };

    console.log(authLoading);

    return (
        <>
            <Formik
                initialValues={{
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    password: "",
                    repeatPassword: "",
                    role: user.role,
                    signToken: user.signToken
                }}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={async (values, { resetForm }) =>
                    onHandleSubmit(values, resetForm)
                }
            >
                {({ errors, touched, values }) => (
                    <Form className="mt-8" noValidate>
                        <fieldset className="border-t">
                            <legend className="text-red-500 text-center italic font-bold tracking-wider uppercase text-xl px-2">
                                Registrate en Femipat
                            </legend>

                            <div className="mt-4">
                                <label
                                    htmlFor="firstname"
                                    className="block mb-0.5 text-xs pl-2 text-gray-600 font-medium tracking-wide"
                                >
                                    Nombre
                                </label>
                                <div>
                                    <Field
                                        className="p-1.5 border text-sm border-gray-200 placeholder:text-gray-300 focus:border-gray-300 outline-none transition-all duration-500 w-full rounded"
                                        id="firstname"
                                        name="firstname"
                                        placeholder="Ingresa tu Nombre"
                                        type="text"
                                    />
                                </div>
                                {errors.firstname && touched.firstname && (
                                    <ErrorField message={errors.firstname} />
                                )}
                            </div>

                            <div className="mt-3">
                                <label
                                    htmlFor="lastname"
                                    className="block mb-0.5 text-xs pl-2 text-gray-600 font-medium tracking-wide"
                                >
                                    Apellido
                                </label>
                                <div>
                                    <Field
                                        className="p-1.5 border text-sm border-gray-300 placeholder:text-gray-300 focus:border-gray-400 outline-none transition-all duration-500 w-full rounded"
                                        id="lastname"
                                        name="lastname"
                                        placeholder="Ingresa tu Apellido"
                                        type="text"
                                    />
                                </div>
                                {errors.lastname && touched.lastname && (
                                    <ErrorField message={errors.lastname} />
                                )}
                            </div>

                            <div className="mt-3">
                                <label
                                    htmlFor="email"
                                    className="block mb-0.5 text-xs pl-2 text-gray-600 font-medium tracking-wide"
                                >
                                    E-mail
                                </label>
                                <div>
                                    <Field
                                        className="p-1.5 border text-sm border-gray-300 placeholder:text-gray-300 focus:border-gray-400 outline-none transition-all duration-500 w-full rounded"
                                        id="email"
                                        name="email"
                                        placeholder="Tu Correo Electrónico"
                                        type="email"
                                    />
                                </div>
                                {errors.email && touched.email && (
                                    <ErrorField message={errors.email} />
                                )}
                            </div>

                            <div className="mt-3">
                                <label
                                    htmlFor="password"
                                    className="block mb-0.5 text-xs pl-2 text-gray-600 font-medium tracking-wide"
                                >
                                    Password
                                </label>
                                <div>
                                    <Field
                                        className="p-1.5 border text-sm border-gray-300 placeholder:text-gray-300 focus:border-gray-400 outline-none transition-all duration-500 w-full rounded"
                                        id="password"
                                        name="password"
                                        placeholder="Tu Contraseña"
                                        type="password"
                                    />
                                </div>
                                {errors.password && touched.password && (
                                    <ErrorField message={errors.password} />
                                )}
                            </div>

                            <div className="mt-3">
                                <label
                                    htmlFor="repeatPassword"
                                    className="block mb-0.5 text-xs pl-2 text-gray-600 font-medium tracking-wide"
                                >
                                    Repite tu password
                                </label>
                                <div>
                                    <Field
                                        className="p-1.5 border text-sm border-gray-300 placeholder:text-gray-300 focus:border-gray-400 outline-none transition-all duration-500 w-full rounded"
                                        id="repeatPassword"
                                        name="repeatPassword"
                                        placeholder="Confirma tu Contraseña"
                                        type="password"
                                        validate={(value) =>
                                            validatePasswordConfirmation(values.password, value)
                                        }
                                    />
                                </div>
                                {errors.repeatPassword && touched.repeatPassword && (
                                    <ErrorField message={errors.repeatPassword} />
                                )}
                            </div>
                        </fieldset>
                        <button
                            type="submit"
                            className="w-full transition-all duration-500 text-white bg-indigo-800 hover:bg-indigo-700 mt-6 rounded tracking-wider uppercase font-bold py-2"
                        >
                            Registrarme
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default SignUpPage;
