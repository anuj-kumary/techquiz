import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '../../contexts/data-context'
import { QuizData } from '../../Data/QuizData'
import { Dispatch } from "../../utils/DataContextType"
import Stopwatch from "../../images/stopwatch.gif"
import "./Question.css"

export type QuizModelType = {
    id: string;
    img: string;
    category: string;
    desc: string;
    questions: QuesType[];
    points: number;
};

type QuesType = {
    statement: string;
    point?: number;
    options: OptionType[];
};

type OptionType = {
    value: string;
    isRight: boolean;
};


export const Question = () => {
    const { questionIndex, id } = useParams();
    const [activeButton, setActiveButton] = useState(-1);
    const [timer, setTimer] = useState(60)
    const { state, dispatch } = useData();
    const navigate = useNavigate();
    const quizData = QuizData.find((el) => el.id === id);
    const questions = quizData?.questions;
    let statement: QuesType = { statement: '', options: [] };
    if (questions) {
        statement = questions[Number(questionIndex) - 1] ?? {};
    }

    useEffect(() => {
        let timerId = setInterval(() => {
            if (timer > 1) {
                setTimer((timer) => timer - 1)
            }
            else {
                dispatchQuizAnswer(activeButton, dispatch, Number(questionIndex), questions)
            }
        }, 1000)
        return () => clearInterval(timerId)
    }, [timer])



    useEffect(() => {

        if (state.answers.length === 0 && Number(questionIndex) !== 1) {
            const recoveredData = JSON.parse(
                sessionStorage.getItem('answerData') || '[]'
            );

            if (recoveredData.length === 0)
                dispatch({
                    type: 'RECOVER_ANSWER_DATA',
                    payload: { sessionData: recoveredData },
                });
        }
    }, []);
    const dispatchQuizAnswer = (
        activeButton: number,
        dispatch: Dispatch,
        questionIndex: number,
        questions: QuesType[] | undefined
    ) => {
        dispatch({
            type: 'ADD_QUESTION_DATA',
            payload: { questionIndex, selectedOption: activeButton },
        });
        sessionStorage.setItem(
            'answerData',
            JSON.stringify([
                ...JSON.parse(sessionStorage.getItem('answerData') || '[]'),
                { questionIndex: questionIndex, selectedOption: activeButton },
            ])
        );

        if (questionIndex === questions?.length)
            navigate(`/${id}/result`);
        else navigate(`/${id}/${Number(questionIndex) + 1}`);
        setActiveButton(-1);
        setTimer(60);
    };

    return (

        <div className="quiz__container">
            <div className="box">
                <header className='quiz__header'>
                    <span className='text float__left'>Question: {questionIndex} / {questions?.length}</span>
                    <span className='timer text float__right'><img className='stopwatch' src={Stopwatch} alt="stopwatch" />{timer} sec</span>
                </header>
                <div className="quiz__question">
                    <p className='text question'>{statement?.statement}</p>
                </div>
                <ul className="question__answer">
                    {
                        statement.options.map((el, index) => {
                            return (
                                <li onClick={() => setActiveButton(index)}
                                    key={el.value}
                                    className={`text answer ${index === Number(activeButton) ? 'quiz__selected_answer' : ''}`}>{el.value}</li>
                            )
                        })
                    }
                </ul>
                <div className="quiz__button">
                    <button onClick={() => navigate('/category')} className='btn btn__quit'>Quit</button>
                    {
                        Number(questionIndex) === questions?.length ? (
                            <button onClick={() => dispatchQuizAnswer(activeButton, dispatch, Number(questionIndex), questions)} className='float__right btn'>Submit</button>
                        ) :
                            (
                                <button onClick={() => dispatchQuizAnswer(activeButton, dispatch, Number(questionIndex), questions)} className='float__right btn'>Next</button>
                            )
                    }

                </div>
            </div>
        </div>
    )
}
