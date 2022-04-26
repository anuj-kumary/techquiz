import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

export const Navbar = () => {
    return (
        <>

            <nav className='navigation'>
                <div className='navigation__logo'>
                    <Link to='/' className='text navigation__heading'>
                        techQuiz
                    </Link>
                </div>

                <ul className='navbar__social'>

                    <Link to='/' className='text navbar__social-link' title='Login'>
                        Login
                    </Link>
                </ul>
            </nav>

        </>
    )
}
