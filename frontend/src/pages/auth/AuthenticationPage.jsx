import {
    Link
} from 'react-router-dom';

const AuthenticationPage = () => {

    return (
        <>
            <form className='mt-8'>
                <fieldset
                    className='border-t'
                >
                    <legend className='text-red-500 text-center italic font-bold tracking-wider uppercase text-xl px-2'>Autenticación de usuario</legend>
                
                    <div className='mt-6 text-center p-4 bg-indigo-700 rounded text-white tracking-wider'>
                        <p className=''>Tu cuenta se confirmó correctamente</p>
                    </div>
                    
                </fieldset>

                <Link
                    to={'/login'}
                    className='w-full transition-all duration-500 text-center block text-indigo-500 hover:text-indigo-700 uppercase font-bold tracking-wider hover:underline mt-6'
                >Ir a Login</Link>
            </form> 
        </>
    )
}

export default AuthenticationPage;