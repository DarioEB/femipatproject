import { Outlet } from 'react-router-dom';
import Logo from '../../assets/img/logo-femipat.png'

export const AuthLayout = () => {

    return (
        <main className='bg-gray-100 '>
            <div className='min-h-screen flex flex-col justify-center py-6 md:py-8 px-4 md:px-0'>

                <div className='shadow-lg drop-shadow-lg w-full md:w-3/5 lg:w-4/12 mx-auto bg-white py-6 rounded-lg px-4 md:px-8'>
                    <div className='w-60 mx-auto'>
                        <img
                            src={Logo}
                            alt={'Logotipo Femipat'}
                            className=''
                        />
                    </div>

                    <Outlet />
                </div>



                {/* <div className='mt-8 text-center italic text-red-300 flex flex-col gap-2'>
                    <p className='uppercase font-bold '>Sitio web Federación Misionera de Patinaje</p>
                    <p className='text-sm font-bold text-gray-300'>&copy; Copyright {new Date().getFullYear()} </p>
                </div> */}
            </div>
        </main>
    )
}