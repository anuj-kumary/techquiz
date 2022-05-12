import React from 'react';
import { Category, Home, Question, Rule, Signin, Signup } from './Pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components';
import './App.css';
import { useAuth } from './contexts/auth-context';
import { useData } from './contexts/data-context';
import { Result } from './Pages/Result/Result';

export const App: React.FC = () => {
  const { authToken } = useAuth()
  const { state } = useData()
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/category' element={<Category />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/:id'>
          <Route
            path='rule'
            element={
              authToken ?
                <Rule />
                :
                <Signin />
            }
          />
          <Route
            path=':questionIndex'
            element={
              authToken ?
                <Question />
                :
                <Signin />
            }
          />
          <Route
            path='result'
            element={
              state.answers.length === 0 ? (
                <Navigate to='/category' />
              )
                :
                (
                  <Result />
                )
            }
          />
        </Route>
      </Routes>

    </>
  )
}