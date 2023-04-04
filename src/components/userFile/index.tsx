import React, { useState, useContext, useEffect } from "react";
import { ListFiles } from "./ListFiles";
import {
  getAllFiles,
  uploadFile,
  deleteFile,
  verifyUniqueCode,
} from "../../actions/userFiles";
import { UserFilesContext } from "../../contexts/UserFiles";
import { LoadingContext } from "../../contexts/Loading";

import { Button } from "../common/Button";
import { Upload } from "./UploadFile";
import useUserDetails from "../../hooks/useUserDetails";

// Main Library Component
export const FileComponent: React.FC = () => {
  //Get the state and the dispatch properties form the LibraryContext and rename them to userFilesState and userFilesStateDispatch resp.
  const { state: userFilesState, dispatch: libraryDispatch } =
    useContext(UserFilesContext);
  //Get the state and the dispatch properties form the LoadingContext and rename them to loadingState and loadingDispatch resp.
  const { dispatch: loadingDispatch } = useContext(LoadingContext);

  const [showUploadLoader, setShowUploadLoader] = useState<boolean>(false);

  const [showImageLoader, setShowImageLoader] = useState<boolean>(false);

  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  const [uniqueCode, setUniqueCode] = useState("");

  //  stores the array of object for type selected
  const [selectedTabData, setSelectedTabData] = useState<any>([]);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [selectedFiles, setSelectedFiles] = useState<any>([]);

  const [enterUniqueCode, setEnterUniqueCode] = useState<string>("");
  useUserDetails();

  // Call the useEffect to fetch all library files
  useEffect(() => {
    getAllLibraryFiles();
  }, []);

  const handleChangeUniqueCode = (e: any) => {
    setEnterUniqueCode(e.target.value);
  };

  // Function for fetching all library files
  const getAllLibraryFiles = async () => {
    // Set Show Loader as true
    setShowImageLoader(true);
    // calling the getAllFiles action
    await getAllFiles()(libraryDispatch, loadingDispatch).then(() => {
      // Set Show Loader as false
      setShowImageLoader(false);
    });
  };

  // Function for uploading file to server
  const uploadFileFunction = async (data: any) => {
    // Set Show Loader as true
    setShowUploadLoader(true);

    // calling the action
    await uploadFile(data)(libraryDispatch, loadingDispatch).then(async () => {
      // Set Show Loader as false
      setShowUploadLoader(false);
    });
  };

  // Call this useEffect when file is successfully uploaded
  useEffect(() => {
    if (userFilesState.uploadFileSuccess) {
      setUniqueCode(userFilesState?.uploadFileSuccess?.uniqueCode);
    }
  }, [userFilesState.uploadFileSuccess]);

  // Call this useEffect when file is successfully uploaded
  useEffect(() => {
    setSelectedTabData(userFilesState.allLibraryFiles);
  }, [userFilesState.allLibraryFiles]);

  // Function for handle file change
  const handleFileChange = (e: any) => {
    let allFiles: any = e.target.files;

    let fileSize = allFiles[0].size;
    allFiles[0].fileSize = getFileSize(fileSize);

    // Set all files in state
    setSelectedFiles((selectedFile: any) => [...selectedFile, allFiles[0]]);
  };

  // Function for getting size of the file
  const getFileSize = (fileSize: number) => {
    let suffix = "bytes";
    let size = fileSize;
    if (size >= 1024 && size < 1024000) {
      suffix = "KB";
      size = Math.round((size / 1024) * 100) / 100;
    } else if (size >= 1024000) {
      suffix = "MB";
      size = Math.round((size / 1024000) * 100) / 100;
    }
    return size + " " + suffix;
  };

  // Function for toggling upload modal
  const toggleUploadModal = () => {
    setShowUploadModal(!showUploadModal);

    if (showUploadModal === true) {
      setUniqueCode("");
      setSelectedFiles("");
    }
  };

  // Function for deleting library files
  const deleteLibraryFiles = async (id: string) => {
    // Set Show Loader as true
    setShowImageLoader(true);
    // Call the [deleteFiles] action with selected files
    await deleteFile(id)(libraryDispatch, loadingDispatch).then(() => {
      // Set Show Loader as false
      setShowImageLoader(false);
    });
  };

  const handleClick = () => {
    // Close the upload modal.
    setShowUploadModal(true);
  };

  const verifyUniqueCodeClick = async (id: string, uniqueCode: string) => {
    const successfullyVerified = await verifyUniqueCode(id, uniqueCode)(
      libraryDispatch,
      loadingDispatch
    );

    if (successfullyVerified) {
      // Set Show Loader as false
      cancelClickFunction();

      const link = document.createElement("a");
      link.href = successfullyVerified;

      link.click();
    }
  };

  const cancelClickFunction = () => {
    if (showModal) {
      setEnterUniqueCode("");
    }
    setShowModal(!showModal);
  };
  return (
    <div className="has-navbar">
      <div className="upload-file-button">
        <Button
          value="Upload Files"
          handleClick={handleClick}
          id="upload-file-button"
        />
      </div>
      {/* List files Component */}
      <ListFiles
        allFiles={selectedTabData}
        allFilesError={userFilesState.allLibraryFilesError}
        uniqueCodeError={userFilesState.uniqueCodeError}
        showImageLoader={showImageLoader}
        deleteImageFunction={deleteLibraryFiles}
        verifyUniqueCodeClick={verifyUniqueCodeClick}
        showModal={showModal}
        cancelClickFunction={cancelClickFunction}
        uniqueCode={enterUniqueCode}
        handleChangeUniqueCode={handleChangeUniqueCode}
      />
      <Upload
        libraryState={userFilesState}
        showModal={showUploadModal}
        cancelClickFunction={toggleUploadModal}
        showUploadFileLoader={showUploadLoader}
        onUploadClick={uploadFileFunction}
        uniqueCode={uniqueCode}
        handleFileChange={handleFileChange}
        selectedFiles={selectedFiles}
      />
    </div>
  );
};
