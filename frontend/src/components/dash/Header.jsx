import { Link } from 'react-router-dom';

export const Header = () => {

    return (
        <header className='bg-white py-6 px-4 flex items-center justify-between drop-shadow-lg'>
            <Link
                to={'/'}
                className='flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 font-medium tracking-wide'
            >
                <i className="fa-solid fa-user"></i>
                Usuario: Dario, Barboza
            </Link>

            <button
                type='button'
                className='rounded text-white text-sm md:text-normal uppercase font-medium tracking-wide flex items-center gap-1 shadow py-2 px-4 bg-blue-800 hover:bg-blue-700 transition-ll duration-300'
            >
                Cerrar sesión
                <i className="fa-solid fa-right-from-bracket w-6"></i>
            </button>
        </header>
    )
}