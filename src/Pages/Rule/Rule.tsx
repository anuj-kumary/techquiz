import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { QuizData } from '../../Data/QuizData'
import "./Rule.css"

export const Rule = () => {
    const location = useLocation()
    const quizData = QuizData.filter((el) => el.category === location?.state)

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
                <Link to={`/${quizData[0]?.id}/1`}
                    className='btn text link__text'>Let's Start</Link>
            </div>

        </>
    )
}
