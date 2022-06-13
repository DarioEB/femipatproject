import { Link } from 'react-router-dom'

const UsersPage = () => {

    return (
        <>
            <Link
                to={'/'}
                className='p-2 inline-block font-medium bg-indigo-800 hover:bg-indigo-700 rounded text-white transition-all duration-500'
            >
                Nuevo usuario
                <i className="fa-solid fa-user-plus ml-2"></i>
            </Link>
        </>
    );
}

export default UsersPage;