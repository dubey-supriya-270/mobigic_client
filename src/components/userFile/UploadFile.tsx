import React from "react";
import { Modal } from "../common/Modal";
import "../styles/upload-image.css";
import { Button } from "../common/Button";
import ClipLoader from "react-spinners/ClipLoader";
import photo from "../../assets/icons/photo.svg";
import uploadIcon from "../../assets/images/upload.svg";

interface Props {
  showModal: boolean;
  cancelClickFunction: any;
  showUploadFileLoader: boolean;
  libraryState: any;
  onUploadClick: any;
  uniqueCode: string;
  handleFileChange: any;
  selectedFiles: any;
}

export const Upload: React.FC<Props> = ({
  showModal,
  cancelClickFunction,
  showUploadFileLoader,
  libraryState,
  onUploadClick,
  uniqueCode,
  handleFileChange,
  selectedFiles,
}) => {
  // Function to be called on upload
  const onUpload = async () => {
    await onUploadClick(selectedFiles[0]);
  };

  return (
    <div>
      {/* Modal */}
      <Modal
        showModal={showModal}
        isFlexible={true}
        headerText={"Upload file"}
        crossIconClick={cancelClickFunction}
      >
        {/* Main Container */}
        <div className="upload-file-container">
          {/* Browse File Container */}
          {selectedFiles.length === 0 && (
            <div className="browse-container">
              {/* File Image */}
              {/* Input Field for selecting files */}
              <label
                htmlFor="gallery-upload-file"
                className="browse-files-label"
              >
                <img src={uploadIcon} alt="" />
                <input
                  type="file"
                  hidden
                  id="gallery-upload-file"
                  onChange={(e) => handleFileChange(e)}
                  accept={"application/pdf"}
                />
              </label>
            </div>
          )}

          {/* Container for showing success and error messages */}
          <div>
            {/* If show loader is true then show the loader */}
            {showUploadFileLoader ? (
              <div className="file-upload-loader">
                <ClipLoader size={20} />
                <p>Please wait uploading</p>
              </div>
            ) : // If success message is present then show success message
            uniqueCode ? (
              <>
                <p className="file-upload-success-msg" id="upload-file-success">
                  Unique Code : {uniqueCode}
                </p>
              </>
            ) : (
              libraryState.uploadFileError && (
                <div>
                  {/* // If error message is present then show error message */}
                  <p className="file-upload-error-msg" id="upload-file-error">
                    {libraryState.uploadFileError}
                  </p>
                </div>
              )
            )}
          </div>

          {/* uploaded files Container */}
          <div className="uploaded-files-container">
            {selectedFiles.length > 0 && (
              <div className="single-file-container">
                {/* File name */}
                <p id={"uploaded-file-name"}>
                  <img src={photo} alt="selected" />
                  {selectedFiles[0].name}{" "}
                  <span className="file-size">{selectedFiles[0].fileSize}</span>
                </p>
              </div>
            )}
          </div>

          {/* Button Container */}
          <div className="upload-container">
            {/* Upload button */}
            <Button
              value="Cancel"
              id="cancel"
              handleClick={cancelClickFunction}
              styles={{
                backgroundColor: "#e0e0e0",
                minWidth: "100px",
                color: "#4f4f4f",
                height: "40px",
              }}
            />
            <Button
              value="Upload"
              id="upload"
              //TO DO : call the upload file function
              handleClick={() => onUpload()}
              styles={{ minWidth: "120px", height: "40px" }}
              secondaryClassName={
                selectedFiles.length > 0 ? "" : "button-disabled"
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
