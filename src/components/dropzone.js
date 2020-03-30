import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import { load as loadAccount } from "../account";

let MyDropzone = props => {
  const { load } = props;
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = JSON.parse(reader.result);
        load(binaryStr);
      };
      console.log(reader.readAsText(file));
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some workflow files here, or click to select them</p>
    </div>
  );
};
// You have to connect() to any reducers that you wish to connect to yourself
MyDropzone = connect(
  state => ({
    initialValues: state.account.data // pull initial values from account reducer
  }),
  { load: loadAccount } // bind account loading action creator
)(MyDropzone);

export default MyDropzone;
