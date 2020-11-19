import close from '../images/close.svg';

function PopupWtihForm(props) {
    let popupClassName = 'popup';
    if (props.isOpen) {
        popupClassName += ' popup_is-opened';
    }

    return(
        <div className={popupClassName} id={props.id}>
            <div className="popup__content">
                <img src={close} alt="" className="popup__close" id="close-new-place" onClick={props.onClose}/>
                <h3 className="popup__title">{props.title}</h3>
                <form className="popup__form" name={props.name}>
                    {props.children}
                </form>
            </div>
        </div>
    )

}

export default PopupWtihForm;