import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'
import "./Navbar.css"

export const Navbar = () => {
    const { authToken, setAuthToken, setAuthUser } = useAuth()
    const navigate = useNavigate()

    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuthToken("");
        setAuthUser(null);
        navigate("/");
    }
    return (
        <>

            <nav className='navigation'>
                <div className='navigation__logo'>
                    <Link to='/' className='text navigation__heading'>
                        techQuiz
                    </Link>
                </div>

                <ul className='navbar__social'>
                    {
                        authToken ? <Link onClick={logoutHandler} to='/' className='text navbar__social-link' title='Logout'>
                            Logout
                        </Link>
                            :
                            <Link to='/signin' className='text navbar__social-link' title='Login'>
                                Signin
                            </Link>

                    }

                </ul>
            </nav>

        </>
    )
}
