import React, {useCallback} from 'react'
import { connect } from "react-redux";	
import { FieldArray, reduxForm } from "redux-form";	
import { load as loadAccount } from "./account";	
import {updateTask } from "./account";	
import renderWorkflow from "./components/workflow";
import workflowFile from "./workflow";
import {useDropzone} from 'react-dropzone'
function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log("acceptedFilres");
    console.log(acceptedFiles)
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      console.log("file")
      console.log(file)
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onloadens = () => {
      // Do whatever you want with the file contents
        console.log(reader.result)
        const binaryStr = JSON.parse(reader.result)
        console.log("Test2")
        console.log(binaryStr)
      }     
       console.log(reader.readAsDataURL(file));

    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

const options = ["check_policy_status_not", "singleParameter", "withClaims", "type", "check_policy_status", "DRAFT_CERTIFICATE", "PAYMENT_MANAGED_BY_AXA", "IDD_COMPLIANT"];	

let InitializeFromStateForm = props => {
  const { handleSubmit, load, pristine, reset, submitting} = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="button" onClick={() => load(workflowFile)}>
          Load Workflow
        </button>

      </div>
      <div>
        <FieldArray name="workflows" component={renderWorkflow} />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Undo Changes
        </button>
      </div>
    </form>
  );
};


// Decorate with reduxForm(). It will read the initialValues prop provided by connect()	
InitializeFromStateForm = reduxForm({	
  form: "initializeFromState" // a unique identifier for this form	
})(InitializeFromStateForm);	

// You have to connect() to any reducers that you wish to connect to yourself	
InitializeFromStateForm = connect(	
  state => ({	
    initialValues: state.account.data // pull initial values from account reducer	
  }),	
  { load: loadAccount,
    update: updateTask } // bind account loading action creator	
 
)(InitializeFromStateForm);	

export default InitializeFromStateForm;