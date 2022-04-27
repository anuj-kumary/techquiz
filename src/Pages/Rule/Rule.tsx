import React from 'react'
import { useParams } from 'react-router-dom'
import "./Rule.css"

export const Rule = () => {
    const params = useParams()
    return (
        <>
            <h1 className='text text__center category__heading'>Rules</h1>
            <div className='rules__container'>
                <ul className='text__left text'>
                    <li className='rule__list '>For each question, you will get 60 seconds to answer.</li>
                    <li className='rule__list '>Each correct answer will give you 10 points.</li>
                    <li className='rule__list'>You cannot select multiple answers for one question.</li>
                    <li className='rule__list'>You cannot go back to the previous question.</li>
                </ul>
            </div>

            <div className='rule__btn'>
                <button className='btn'>Let's Start</button>
            </div>

        </>
    )
}
