import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../contexts/data-context';
import { QuizData } from '../../Data/QuizData';
import './Result.css';

export const Result = () => {
  const { id } = useParams();
  const { state } = useData();
  const navigate = useNavigate();

  const quizData = QuizData.find((el) => el.id === id) || {
    questions: [],
    points: 5,
  };
  const results = state.answers.map((el) => {
    return { ...el, ...quizData?.questions[el.questionIndex - 1] };
  });
  const eachQuestionPoint = quizData?.points || 5;
  const totalQuestions = quizData?.questions.length;

  const points = results.reduce((acc, curr) => {
    const options = curr.options || [];

    return options[curr.selectedOption]?.isRight
      ? acc + eachQuestionPoint
      : acc;
  }, 0);
  console.log(results, points);
  useEffect(() => {
    sessionStorage.removeItem('answerData');
  }, []);

  return (
    <main className='main'>
      <h3 className='text text__center'>Result</h3>
      <p className='text text__center'>
        Final Score: {points}/{eachQuestionPoint * totalQuestions}
      </p>

      {results.map((el) => {
        const rightQuestion = el.options[el.selectedOption]?.isRight;
        return (
          <div className='quiz__result__container'>
            <div className='quiz--result' key={el.questionIndex}>
              <p className='result__question text'>{el.statement}</p>
              {el.options.map((option, index) => {
                return (
                  <div key={index}>
                    {rightQuestion ? (
                      <div
                        className={`right__answer text ${
                          option.isRight
                            ? 'background__right'
                            : 'background__normal'
                        }`}
                      >
                        <p>{option.value}</p>
                      </div>
                    ) : (
                      <div
                        className={`right__answer text ${
                          el.selectedOption === index
                            ? 'background__wrong'
                            : option.isRight
                            ? 'background__right'
                            : 'background__normal'
                        }`}
                      >
                        <p>{option.value}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className='back-btn'>
        <button onClick={() => navigate('/')} className='btn'>
          Back To Home
        </button>
      </div>
    </main>
  );
};
