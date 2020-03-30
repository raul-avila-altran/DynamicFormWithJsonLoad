import React, { useCallback } from "react";
import { connect } from "react-redux";
import { FieldArray, reduxForm } from "redux-form";
import { load as loadAccount } from "./account";
import { updateTask } from "./account";
import renderWorkflow from "./components/workflow";
import workflowFile from "./workflow";
import MyDropzone from "./components/dropzone";
const options = [
  "check_policy_status_not",
  "singleParameter",
  "withClaims",
  "type",
  "check_policy_status",
  "DRAFT_CERTIFICATE",
  "PAYMENT_MANAGED_BY_AXA",
  "IDD_COMPLIANT"
];

let InitializeFromStateForm = props => {
  const { handleSubmit, load, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="button" onClick={() => load(workflowFile)}>
          Load Workflow
        </button>

        <MyDropzone />
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
  { load: loadAccount, update: updateTask } // bind account loading action creator
)(InitializeFromStateForm);

export default InitializeFromStateForm;
