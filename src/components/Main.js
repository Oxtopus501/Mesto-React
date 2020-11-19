import React from 'react';
import ReactDOM from 'react-dom';
import close from '../images/close.svg';
import PopupWtihForm from './PopupWithForm.js'; //Компонент любого попапа, все внутреннее наполнение передаётся через children
import ImagePopup from './ImagePopup.js'; //Компонент попапа с картинкой
import api from '../utils/Api.js'; //В Api.js создаём экземпляр *const api = new Api()* и передаём его сюда

function Main(props) {
    //Хуки обновляют имя пользователя и описание
    const [userName, setUserName] = React.useState('Мой дед');
    const [userDescription, setUserDescription] = React.useState('Sailor, Researcher');
    const [userAvatar, setUserAvatar] = React.useState('../../../images/avatar.jpg'); //По умолчанию используем путь до аватара в локальной папке
    const [cards, setCards] = React.useState([]); //Стэйт с массивом карточек, изначально пустым
    //Эффект, который при монтировании Main отправляет запрос к апи, получает инфу пользователя и карточки

    React.useEffect(() => {
      //Запрашиваем данные пользователя
      api.getUserInfo()
        .then((data) => {
          //Если дата пришла, использует сеттеры, которые обновляют данные о пользователе
          setUserName(data.name);
          setUserDescription(data.about);
          setUserAvatar(data.avatar);
        });
    }, [])

    React.useEffect(() => {
      api.getCards()
        .then((data) => {
          setCards(data);
        })
    }, []); 

    React.useEffect(() => {
      ReactDOM.render((
        <>
          {cards.map((card, i) => {
            return(
          <div className='place-card' key={i}>
            <div className='place-card__image' style={{backgroundImage: `url(${card.link})`}}>
              <button className='place-card__delete-icon' />
            </div>
            <div className='place-card__description'>
              <h3 className='place-card__name'>{card.name}</h3>
              <div className='place-card__like-container'>
                <button className='place-card__like-icon' />
                <p className='place-card__like-counter'>{card.likes.length}</p>
              </div>
            </div>
          </div>)
        })}
        
        </>
      ), document.querySelector('.places-list'))
    });


    
    return(
      <>  
        <div className="profile root__section">
        <div className="user-info">
          <div className="user-info__photo" style={{ backgroundImage: `url(${userAvatar})` }} ></div> {/*Подставляем в стиль фоновое изображение - это аватар пользователя, его тоже обновляем при монтировании*/}
          <div className="user-info__data">
            <h1 className="user-info__name">{userName}</h1> {/*Используем переменные состояния, обновляемые в useEffect, здесь*/}
            <p className="user-info__job">{userDescription}</p> {/* и ещё здесь */}
            <button className="button user-info__edit" onClick={props.onEditProfile}>Edit</button>
          </div>
          <button className="button user-info__button" onClick={props.onAddPlace}>+</button>
        </div>
      </div>

      <div className="places-list root__section">
        
      </div>

      <PopupWtihForm id='popup-add' title='Новое место' isOpen={props.isAddPlacePopupOpen} onClose={props.onClose}>
        <input type="text" name="name" className="popup__input popup__input_type_name" placeholder="Название" />
        <span className='popup__error popup__error_hidden'>Текст ошибки</span>
        <input type="text" name="link" className="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку" />
        <span className='popup__error popup__error_hidden'>Текст ошибки</span>
        <button name="submit" className="button popup__button" disabled={true}>+</button>
      </PopupWtihForm>

      <PopupWtihForm id='popup-edit' title='Редактировать профиль' isOpen={props.isEditProfilePopupOpen} onClose={props.onClose}>
        <input type="text" name="name" autoComplete="off" className="popup__input popup__input_type_name" placeholder="Имя" />
        <span className='popup__error popup__error_hidden'>Текст ошибки</span>
        <input type="text" name="about" autoComplete="off" className="popup__input popup__input_type_about" placeholder="О себе" />
        <span className='popup__error popup__error_hidden'>Текст ошибки 2</span>
        <button className="button popup__button popup__button_active" id='save-profile'>Сохранить</button>
       </PopupWtihForm>         

      <ImagePopup/>
       
      </>  
    )   
}

export default Main;

/*<div className="popup" id='popup-add'>
        <div className="popup__content">
          <img src={close} alt="" className="popup__close" id="close-new-place" />
          <h3 className="popup__title">Новое место</h3>
          <form className="popup__form" name="new">
              <input type="text" name="name" className="popup__input popup__input_type_name" placeholder="Название" />
              <span className='popup__error popup__error_hidden'>Текст ошибки</span>
              <input type="text" name="link" className="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку" />
              <span className='popup__error popup__error_hidden'>Текст ошибки</span>
              <button name="submit" className="button popup__button" disabled={true}>+</button>
          </form>
        </div>
      </div>

      <div className="popup" id='popup-edit'>
        <div className="popup__content">
          <img src={close} alt="" className="popup__close" id="close-edit-profile" />
          <h3 className="popup__title">Редактировать профиль</h3>
          <form className="popup__form" name="edit">
              <input type="text" name="name" autoComplete="off" className="popup__input popup__input_type_name" placeholder="Имя" />
              <span className='popup__error popup__error_hidden'>Текст ошибки</span>
              <input type="text" name="about" autoComplete="off" className="popup__input popup__input_type_about" placeholder="О себе" />
              <span className='popup__error popup__error_hidden'>Текст ошибки 2</span>
              <button className="button popup__button popup__button_active" id='save-profile'>Сохранить</button>
          </form>
        </div>
      </div>

      ReactDOM.render((
          <>
            {cards.map((card, i) => (
              <div className='place-card' key={i}>
                <div className='place-card__image' style={{ backgroundImage: `url(${card.link})` }}>
                  <button className='place-card__delete-icon' />
                </div>
                <div className='place-card__description'>
                  <h3 className='place-card__name'>{card.name}</h3>
                  <div className='place-card__like-container'>
                    <button className='place-card__like-icon' />
                    <p className='place-card__like-counter'>{card.likes.length}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ))

        <template>
          <div className='place-card'>
            <div className='place-card__image'>
              <button className='place-card__delete-icon' />
            </div>
            <div className='place-card__description'>
              <h3 className='place-card__name'>Название</h3>
              <div className='place-card__like-container'>
                <button className='place-card__like-icon' />
                <p className='place-card__like-counter'>69</p>
              </div>
            </div>
          </div>
        </template>  

            React.useEffect(() => {
      ReactDOM.render((
        <>
          {cards.map((card, i) => {
          <div className='place-card' key={i}>
            <div className='place-card__image' style={{backgroundImage: `url(${card.link})`}}>
              <button className='place-card__delete-icon' />
            </div>
            <div className='place-card__description'>
              <h3 className='place-card__name'>{card.name}</h3>
              <div className='place-card__like-container'>
                <button className='place-card__like-icon' />
                <p className='place-card__like-counter'>{card.likes.length}</p>
              </div>
            </div>
          </div>
        })}
        </>
      ), document.querySelector('.places-list'))
    }, [cards]);
*/      