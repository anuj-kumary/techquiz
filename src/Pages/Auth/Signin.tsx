import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from "../../firebaseConfig";
import { useAuth } from '../../contexts/auth-context';
import { signinServices } from '../../Services/Services';
import './Auth.css';

export const Signin = () => {

    const { setAuthToken, setAuthUser } = useAuth()
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: "",
        password: ''
    })

    const loginHandller = async (e: FormEvent) => {
        e.preventDefault()
        try {
            let response;
            if ((e.target as HTMLInputElement).innerText === 'Sign In as Guest') {
                setLogin({
                    email: "adarshbalak@gmail.com",
                    password: "adarshBalak123",
                });
                response = await signinServices('adarshbalak@gmail.com', 'adarshBalak123')
            } else {
                response = await signinServices(login.email, login.password)
            }
            if (response) {
                const responseUser: any = response?.user;

                localStorage.setItem('token', JSON.stringify(responseUser?.accessToken));

                setAuthToken(responseUser?.accessToken)
                const q = query(
                    collection(db, 'users'),
                    where("uid", '==', responseUser.uid)
                )
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const userObj: any = doc.data();
                    setAuthUser(userObj);
                    localStorage.setItem("user", JSON.stringify(userObj))
                })
                navigate('/category')

            }
        } catch (err) {
            console.error(err)
        }

    }

    return (
        <div className='container'>
            <div className='auth__form'>
                <div className='auth__title'>
                    <h2 className='auth__heading text text__center'>Sign In</h2>
                </div>
                <div className='input'>
                    <label className='label__text'>Email</label>
                    <input
                        className='input-txt'
                        placeholder='abc@gmail.com'
                        type='email'
                        value={login.email}
                        onChange={(e) => setLogin({ ...login, email: e.target.value })}
                    />
                </div>
                <div className='input'>
                    <label className='label__text'>Password</label>
                    <input className='input-txt' type='password'
                        value={login.password}
                        onChange={(e) => setLogin({ ...login, password: e.target.value })}
                        placeholder='********' />
                </div>

                <div className='btn__signup text__center'>
                    <button onClick={(e) => loginHandller(e)} className='btn btn__primary'>Sign In</button>
                    <button onClick={(e) => loginHandller(e)} className='btn btn__secondary'>Sign In as Guest</button>
                </div>
                <div className='text__center'>
                    <p className='login__nav'>
                        Don't have an Account?
                        <Link to='/signup' className='login___btn--now'>
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
