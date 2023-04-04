import React from "react";
import { Button } from "./Button";
import "../styles/confirmation-modal.css";
import { Modal } from "./Modal";

interface Props {
  history?: History; //Passing router history as props if required
  showModal: boolean; // to show or hide the modal
  modalText: string; //status message to be displayed after action clicked
  modalSubText?: string;
  deleteStatus: string; //status message to be displayed after action clicked
  cancelButtonClick: () => void; //handles click on the cancel button
  deleteButtonClick: any; //handles click on the delete button
  deleteButtonText?: string; // Optional text to show instead "delete"
  disallowDelete?: boolean; // Optional param to hide the delete button
}

//Modal for confirmation of delete
export const ConfirmationModal: React.FC<Props> = ({
  modalText,
  modalSubText,
  showModal,
  deleteStatus,
  cancelButtonClick,
  deleteButtonClick,
  deleteButtonText,
  disallowDelete,
}) => {
  return (
    <Modal
      showModal={showModal} //state value to toggle the modal
      modalStyle={{ height: "28%", margin: "10px" }}
    >
      <div className="delete-confirmation-container">
        {/* Hard coded confirmation message  */}
        <div className="confirmation-message">{modalText}</div>
        <div className="confirmation-message-sub">{modalSubText}</div>
        {/* Display the message coming from the server as response */}
        <div className="delete-status">{deleteStatus}</div>
        <div className="delete-button-container">
          <Button
            styles={{
              backgroundColor: "#e0e0e0",
              minWidth: "100px",
              color: "#4f4f4f",
              height: "40px",
            }}
            id="cancel-delete"
            value={"Cancel"}
            handleClick={cancelButtonClick}
          />

          {!disallowDelete && (
            <Button
              styles={{
                minWidth: "100px",
                marginRight: "25px",
                height: "40px",
              }}
              id="confirm-delete"
              value={deleteButtonText || "Delete"}
              handleClick={deleteButtonClick}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
