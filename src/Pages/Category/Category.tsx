import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/data-context';
import { CategoryData } from '../../Data/CategoryData';
import './Category.css';

export const Category = () => {
  const { dispatch } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('answerData');
    dispatch({ type: 'RESET' });
  }, []);

  return (
    <>
      <h1 className='text text__center category__heading'>Quiz Category</h1>
      <div className='category__card'>
        {CategoryData.map((cat) => (
          <div className='card' key={cat.id}>
            <div className='card__img'>
              <img src={cat.img} alt={cat.category} />
            </div>
            <header className='card__heading text text__center'>
              {cat.category}
            </header>
            <p className='text card__desc'>{cat.desc}</p>

            <button
              onClick={() => {
                navigate(`/${cat.id}/rule`, { state: cat.category });
              }}
              className='btn__play link__text  text__center'
            >
              Play Quiz
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
