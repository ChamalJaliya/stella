"use client";
import * as React from "react";
import Dropzone from "react-dropzone";
import CustomButton from "./CustomButton";
import { ButtonGroup } from "@mui/material";
import { Dropbox} from "react-bootstrap-icons";
import AddToDriveIcon from '@mui/icons-material/AddToDrive';

interface UploadComponentProps {}

interface DropzoneProps {
  getRootProps: () => any;
  getInputProps: () => any;
}

const UploadComponent: React.FC<UploadComponentProps> = () => {
  const handleGoogleDriveImport = async () => {
    // ...  Google Drive picker logic
  };

  const handleDropboxImport = async () => {
    // ... Dropbox ogic
  };

  return (
    <Dropzone>
      {({ getRootProps, getInputProps }: DropzoneProps) => (
        <section className="dropzone-container">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <ButtonGroup>
              <CustomButton onClick={handleGoogleDriveImport} color="primary" icon={<AddToDriveIcon/>} className="mx-2">
                Upload from Drive
              </CustomButton>
              <CustomButton
                onClick={handleDropboxImport}
                color="secondary"
                variant="outlined"
                icon={<Dropbox/>}
              >
                Upload from Dropbox
              </CustomButton>
            </ButtonGroup>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default UploadComponent;
