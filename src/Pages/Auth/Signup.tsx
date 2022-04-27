import { collection, where, query, getDocs } from 'firebase/firestore'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'
import { signupServices } from '../../Services/Services'
import { db } from "../../firebaseConfig";
import "./Auth.css"

export const Signup = () => {
    const { setAuthToken, setAuthUser } = useAuth()
    const navigate = useNavigate()
    const [signup, setSignup] = useState({
        name: '',
        email: '',
        password: ''
    })
    const signupHandler = async (name: string, email: string, password: string) => {
        try {
            const response = await signupServices(name, email, password)
            if (response) {
                const responseUser: any = response?.user;

                localStorage.setItem('token', JSON.stringify(responseUser?.accessToken));
                setAuthToken(responseUser?.accessToken)
                const q = query(
                    collection(db, 'users'),
                    where("uid", "==", responseUser.uid)
                )
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const userObj: any = doc.data();
                    localStorage.setItem('user', JSON.stringify(userObj));
                    setAuthUser(userObj)
                })
                navigate('/category')

            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='container signup__container'>
            <div className='auth__form'>
                <div className='auth__title'>
                    <h2 className='auth__heading text text__center'>Sign Up</h2>
                </div>
                <div className='input'>
                    <label className='label__text'>Name</label>
                    <input
                        className='input-txt'
                        type='text'
                        placeholder='John Doe'
                        onChange={(e) => setSignup({ ...signup, name: e.target.value })}

                    />
                </div>
                <div className='input'>
                    <label className='label__text'>Email</label>
                    <input
                        className='input-txt'
                        type='email'
                        placeholder='abc@gmail.com' onChange={(e) => setSignup({ ...signup, email: e.target.value })}

                    />
                </div>
                <div className='input'>
                    <label className='label__text'>Password</label>
                    <input
                        className='input-txt'
                        type='password'
                        onChange={(e) => setSignup({ ...signup, password: e.target.value })}
                        placeholder='*********'

                    />
                </div>

                <div className='btn__signup text__center'>
                    <button
                        onClick={() => signupHandler(signup.name, signup.email, signup.password)}
                        className='btn btn__primary'
                    >
                        Create New Account
                    </button>
                </div>
                <div className='text__center'>
                    <p className='login__nav'>
                        Alredy a Member?
                        <Link to='/signin' className='login___btn--now'>
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
