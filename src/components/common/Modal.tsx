import React from "react";
import "../styles/modal.css";
import cross from "../../assets/icons/crossIcon.png";

//Props interface. Defines all the required props by the component
interface Props {
  modalStyle?: object; //Style object for modal
  modalClass?: string; //Class props for the main modal container
  children: React.ReactNode; //Passing a react component here or div elements
  showModal: boolean; //toggle modal props(mandatory)
  isFlexible?: boolean; // if true then makes the modal full device size in smaller devices else small with backdrop
  headerText?: string;
  crossIconClick?: any;
  headerStyle?: object;
}

//Common Modal Component
export const Modal: React.FC<Props> = ({
  modalStyle,
  modalClass,
  children,
  showModal,
  isFlexible,
  headerText,
  crossIconClick,
  headerStyle,
}) => {
  return (
    // Modal container parent
    <div
      id="modal"
      className="modal-background"
      // based on props toggle the display of the modal
      style={showModal ? {} : { display: "none" }}
    >
      <div className="background-modal" id="click-blur"></div>

      <div
        id="modal-children"
        // based on props for style and class assign style and class to the container
        // adds flexible class when isFlexible is true which takes full screen on mobile and viewed as normal on desktop
        className={`modal-layout ${modalClass ? modalClass : ""} ${
          isFlexible ? "flexible" : ""
        }`}
        style={modalStyle ? modalStyle : {}}
      >
        {headerText && (
          <div className="header" id="header">
            <div>
              {/* if back button is not present then adds a class to provide margin left */}
              <p
                id="header-title"
                className={"ml-16"}
                style={headerStyle ? headerStyle : {}}
              >
                {headerText || ""}
              </p>
            </div>
            <img src={cross} alt="cross" onClick={crossIconClick} />
          </div>
        )}
        <div className="modal-child-container" id="modal-child-container">
          {/* Mapping the children being passed as props */}
          {children}
        </div>
      </div>
    </div>
  );
};
