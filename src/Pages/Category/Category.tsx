import React from 'react'
import { Link } from 'react-router-dom'
import { CategoryData } from "../../Data/CategoryData"
import "./Category.css"

export const Category = () => {
    return (
        <>
            <h1 className='text text__center category__heading'>Quiz Category</h1>
            <div className="category__card">
                {
                    CategoryData.map((cat) => (
                        <div className="card">
                            <div className="card__img">
                                <img src={cat.img} alt={cat.category} />
                            </div>
                            <header className="card__heading text text__center">{cat.category}</header>
                            <p className="text card__desc">
                                {cat.desc}
                            </p>
                            <Link to={`/rule/${cat.id}`} className='link__text text text__center' >Play Quiz</Link>
                        </div>
                    ))
                }


            </div>
        </>


    )
}
