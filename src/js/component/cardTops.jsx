import React, { useState } from "react";
import "../../styles/cardTops.css";

const CardTops = ({ initialText, overlayText }) => {
  const [showOverlayButton, setShowOverlayButton] = useState(false);

  const handleInitialButtonClick = () => {
    setShowOverlayButton(true); // Exibe o botão sobreposto
  };

  const handleOverlayButtonClick = () => {
    setShowOverlayButton(false); // Oculta o botão sobreposto
  };
  // const text = overlayText()

  return (
    <div className="card">
      <div className="button-container">
        {!showOverlayButton && (
          <button className="initial-button" onClick={handleInitialButtonClick}>
            {initialText}
          </button>
        )}

        {showOverlayButton && (
          <button className="overlay-button" onClick={handleOverlayButtonClick}>
            {overlayText}
          </button>
        )}
      </div>
    </div>
  );
};

export default CardTops;