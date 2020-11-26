import close from '../images/close.svg';

function ImagePopup(props) {
  let popupClassName = 'popup';
  if (props.selectedCard) {
      popupClassName += ' popup_is-opened';
  }

  return(
      <div className={popupClassName} id="popup-picture">
        <div className="popup__picture">
          <img src={close} alt="" className="popup__close" id="close-picture" onClick={props.onClose}/>
          <img src={props.selectedCard.link} alt="" className="popup__image" />
        </div>
      </div>
  )
}

export default ImagePopup;