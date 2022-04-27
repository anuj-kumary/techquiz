import React from 'react';
import { Category, Home, Rule, Signin, Signup } from './Pages';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components';
import './App.css';

export const App: React.FC = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/category' element={<Category />}></Route>
        <Route path='/rule/:ruleId' element={<Rule />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>

    </>
  )
}