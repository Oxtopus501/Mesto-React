import close from '../images/close.svg';

function ImagePopup() {
    return(
        <div className="popup" id="popup-picture">
          <div className="popup__picture">
            <img src={close} alt="" className="popup__close" id="close-picture" />
            <img src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg" alt="" className="popup__image" />
          </div>
        </div>
    )
}

export default ImagePopup;