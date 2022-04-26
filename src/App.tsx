import React from 'react';
import './App.css';
import { Category, Home, Rule } from './Pages';
import { Navbar } from './components';
import { Route, Routes } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/category' element={<Category />}></Route>
        <Route path='/rule/:ruleId' element={<Rule />}></Route>
      </Routes>

    </>
  )
}