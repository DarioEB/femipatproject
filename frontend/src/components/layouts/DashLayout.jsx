import { useContext,useEffect } from 'react';
import { AuthContext } from '../../context';
import { useNavigate, Outlet } from 'react-router-dom';
import { Sidebar } from "../dash"
import { Header } from "../dash" 

export const DashLayout = () => {

    const navigate = useNavigate();

    const { authenticated } = useContext(AuthContext);

    useEffect( () => {
        if(!authenticated) {
            navigate('/')
        } 
    }, [authenticated])

    return (
        <main className='bg-gray-200 min-h-screen md:h-screen md:flex'>
            <Sidebar />            

            <div className='md:w-9/12 lg:w-10/12 overflow-y-scroll'>
                <Header />
                <section className='py-4 px-4 md:py-6 px:8   mt-4 rounded container border border-gray-500'>
                    <Outlet />
                </section>
            </div>
        </main>
    )
}