/* eslint-disable react-hooks/exhaustive-deps */
//  Listing Library Files Functionality
import React, { useState } from "react";
import "../styles/gallery.css";
import deleteIcon from "../../assets/icons/delete.png";
import { Loading } from "../common/Loading";
import { ConfirmationModal } from "../common/ConfirmationModal";
import { Modal } from "../common/Modal";
import { TextField } from "../common/TextField";
import { Button } from "../common/Button";
import download from "../../assets/icons/download.png";

//Props interface. Defines all the required props by the component
interface Props {
  allFiles: any;
  allFilesError: any;
  showImageLoader: boolean;
  deleteImageFunction: any;
  verifyUniqueCodeClick: any;
  showModal: boolean;
  cancelClickFunction: any;
  uniqueCodeError: any;
  handleChangeUniqueCode: any;
  uniqueCode: string;
}

// List Library Files Component
export const ListFiles: React.FC<Props> = ({
  allFiles,
  allFilesError,
  showImageLoader,

  deleteImageFunction,
  verifyUniqueCodeClick,
  showModal,
  cancelClickFunction,
  uniqueCodeError,
  handleChangeUniqueCode,
  uniqueCode,
}) => {
  // Ste for storing selected files to delete
  const [deletedFileId, setDeletedFileId] = useState<string>("");

  // State for toggling confirmation modal to delete
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const [fileId, setFileId] = useState<string>("");

  const handleClick = async () => {
    if (uniqueCode !== "") {
      await verifyUniqueCodeClick(fileId, uniqueCode);
    }
  };

  // Function to be called on delete icon
  const onClickDelete = async () => {
    // calling then [deleteImageFunction] function with files selected for deletion
    await deleteImageFunction(deletedFileId);
    // call the [toggleConfirmModal] function
    toggleConfirmModal();
  };

  // Function for toggling confirm modal
  const toggleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  const verifyUniqueCodeModal = () => {
    return (
      <Modal
        showModal={showModal}
        isFlexible={true}
        headerText={"Verify unique code"}
        crossIconClick={cancelClickFunction}
      >
        <div className="upload-file-container">
          <TextField
            value={uniqueCode}
            placeholder="Enter your unique code"
            label="Unique Code"
            handleChange={handleChangeUniqueCode}
            id="unique_code_input_field"
            type="text"
            name="uniqueCode"
          />
          {uniqueCodeError && (
            <span className="uniqueCodeError">{uniqueCodeError}</span>
          )}
          <div className="verify-code-button">
            <Button
              value="Verify unique code"
              handleClick={handleClick}
              id="verify_code_button"
            />
          </div>
        </div>
      </Modal>
    );
  };
  // Function for listing Documents
  const listDocuments = () => {
    return (
      // Main Container
      <div className="list-files-wrapper">
        <div className="table">
          {/* Container for displaying header values */}
          <div className="row header">
            <div className="cell">File Name</div>
            <div className="cell">Uploaded On</div>
            <div className="cell">Download</div>
            <div className="cell">Delete</div>
          </div>

          {/* Mapping the values */}
          {allFiles.map((item: any, index: number) => (
            <div
              className="row"
              key={`library-${item.fileName}-${item.uploadAt}`}
            >
              {/*  File Name  */}
              <div className="cell" data-title="Name" id="file-name-text">
                {item.fileName}
              </div>
              {/* when the file was uploaded */}
              <div
                className="cell"
                data-title="Uploaded On"
                id="file-uploaded-on-text"
              >
                {new Date(item.uploadAt).toLocaleDateString()}
              </div>

              <div className="cell" data-title="download">
                <div
                  className="gallery-download-button"
                  onClick={() => {
                    setFileId(item._id);

                    cancelClickFunction();
                  }}
                  id={`download-file-button-${index}`}
                >
                  <img src={download} alt="download-icon" />
                </div>
              </div>
              <div className="cell" data-title="">
                <div
                  className="gallery-delete-button"
                  onClick={() => {
                    setDeletedFileId(item._id);
                    toggleConfirmModal();
                  }}
                  id="delete-file-button"
                >
                  <img src={deleteIcon} alt="delete-icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {allFiles.length > 0 ? (
        <>
          <h1 className="list-file-header">Files</h1>
          {listDocuments()}
        </>
      ) : // the showLoader props is true then show the loader
      showImageLoader ? (
        <Loading />
      ) : (
        // If there is any error then show display the error to the user
        <p className="all-images-err-msg" id="file-error-msg">
          {allFilesError ? allFilesError : "No Files Uploaded"}
        </p>
      )}

      {/* Show thw confirmation modal for deleting files if  confirmModal is true*/}
      {confirmModal && (
        <div className="gallery-delete-image-modal">
          <ConfirmationModal
            showModal={confirmModal}
            modalText={"Are you sure you want to delete the selected files?"}
            deleteButtonClick={onClickDelete}
            deleteStatus={""}
            cancelButtonClick={toggleConfirmModal}
            deleteButtonText={"Delete"}
          />
        </div>
      )}
      {showModal && (
        <div className="gallery-unique-code-modal">
          {verifyUniqueCodeModal()}
        </div>
      )}
    </>
  );
};
