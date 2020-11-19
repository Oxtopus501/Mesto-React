import React from 'react';
import Header from'./Header.js';
import Main from './Main.js';
import './App.css';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  return (
    <div className="root">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        isEditProfilePopupOpen={isEditProfilePopupOpen} 
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />
    </div>
    
  );
}

export default App;
