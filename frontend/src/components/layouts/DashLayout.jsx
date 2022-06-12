

import { Sidebar } from "../dash"
import { Header } from "../dash"

export const DashLayout = () => {


    return (
        <main className='bg-gray-200 min-h-screen md:h-screen md:flex'>
            <Sidebar />            

            <div className='md:w-9/12 lg:w-10/12 overflow-y-scroll'>
                <Header />
            </div>
        </main>
    )
}