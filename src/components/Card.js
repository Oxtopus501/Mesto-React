import React from 'react';

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    } 

    return(
        <div className='place-card'>
                <div className='place-card__image' style={{backgroundImage: `url(${props.card.link})`}} onClick={handleClick}>
                <button className='place-card__delete-icon' />
                </div>
                <div className='place-card__description'>
                <h3 className='place-card__name'>{props.card.name}</h3>
                <div className='place-card__like-container'>
                    <button className='place-card__like-icon' />
                    <p className='place-card__like-counter'>{props.card.likes.length}</p>
                </div>
                </div>
        </div>
    )
}

export default Card;