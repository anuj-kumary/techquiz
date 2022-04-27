import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

export const Home=() =>{
  const navigate = useNavigate()
  return (
    <div className='hero'>
        <h1 className='heading'>techQuiz</h1>
        <p className='sub__heading'>Could you be our lucky winner ?</p>
        <button onClick={()=> navigate('/category')} className='btn btn__primary'>Let's find out</button>
    </div>
  )
}
