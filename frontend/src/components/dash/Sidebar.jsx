import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';

export const Sidebar = () => {


    return (
        <aside className='md:w-3/12 lg:w-2/12 bg-white h-full md:border-r'>
            <div className='flex py-6 px-4 items-center gap-4'>
                <img
                    src={Logo}
                    alt={'Logotipo femipat'}
                    className='w-1/4 '
                />
                <h1 className='uppercase font-bold text-2xl text-red-500 italic'>
                    Femipat
                </h1>
            </div>

            <nav className='flex flex-col gap-0.5 px-4 py-4'>
                <Link
                    to={'/dashboard'}
                    className='text-slate-600 font-medium hover:text-slate-800 hover:bg-gray-100 p-2 rounded flex items-center gap-2 transition-all duration-300'
                >
                    <i className='fa-solid w-6 flex items-center text-slate-400 justify-center fa-home'></i>
                    Dashboard
                </Link>
                <Link
                    to={'/'}
                    className='text-slate-600 font-medium hover:text-slate-800 hover:bg-gray-100 p-2 rounded flex items-center gap-2 transition-all duration-300'
                >
                    <i className='fa-solid w-6 flex items-center text-slate-400 justify-center fa-flag'></i>
                    Eventos
                </Link>

                <Link
                    to={'/'}
                    className='text-slate-600 font-medium hover:text-slate-800 hover:bg-gray-100 p-2 rounded flex items-center gap-2 transition-all duration-300'
                >
                    <i className="fa-solid w-6 flex items-center text-slate-400 justify-center fa-id-badge"></i>
                    Licencias
                </Link>

                <Link
                    to={'/'}
                    className='text-slate-600 font-medium hover:text-slate-800 hover:bg-gray-100 p-2 rounded flex items-center gap-2 transition-all duration-300'
                >
                    <i className="fa-solid w-6 flex items-center text-slate-400 justify-center fa-users-between-lines"></i>
                    Competidores
                </Link>

                <Link
                    to={'/'}
                    className='text-slate-600 font-medium hover:text-slate-800 hover:bg-gray-100 p-2 rounded flex items-center gap-2 transition-all duration-300'
                >
                    <i className="fa-solid w-6 flex items-center text-slate-400 justify-center fa-users"></i>
                    Usuarios
                </Link>
            </nav>
        </aside>
    );
}
