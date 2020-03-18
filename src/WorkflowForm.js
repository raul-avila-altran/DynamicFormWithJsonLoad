import React from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import { load as loadAccount } from "./account";
import renderTask from "./components/task";
import workflowFile from "./workflow";

const data = {
  // used to populate "workflow" reducer when "Load" is clicked
  name: "transaction_created_or_modified",
  type: "subscription",
  removeAtEnd: "true",
  tasks: [{
    name: "retrieve_policy",
    type: "retrieve_policy",
    waitForReturn: "false",
    queue: "salesforce",
    options: {
      check_policy_status_not: "DRAFT"
    },
    dependsOn:[]
  },{
    name: "update_policy_balance",
    type: "update_policy_balance",
    waitForReturn: "false",
    queue: "salesforce",
    options: {
      singleParameter: "FALSE"
    },
    dependsOn:[
      "retrieve_policy"
    ]
  }
]
};
const options = ["check_policy_status_not", "singleParameter", "withClaims", "type", "check_policy_status", "DRAFT_CERTIFICATE", "PAYMENT_MANAGED_BY_AXA", "IDD_COMPLIANT"];



let WorkflowForm = props => {
  const { handleSubmit, load, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="button" onClick={() => load(workflowFile.workflows[0])}>
          Load Workflow
        </button>
      </div>
      <div>
        <label>Name</label>
        <div>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Workflow Name"
          />
        </div>
      </div>
      <div>
        <label>Type</label>
        <div>
          <Field
            name="type"
            component="input"
            type="text"
            placeholder="Workflow Type"
          />
        </div>
      </div>
      <div>
        <label>Remove At End</label>
        <div>
          <label>
            <Field
              name="removeAtEnd"
              component="input"
              type="radio"
              value="true"
            />{" "}
            True
          </label>
          <label>
            <Field
              name="removeAtEnd"
              component="input"
              type="radio"
              value="false"
            />{" "}
            False
          </label>
        </div>
      </div>
      <div>
        <FieldArray name="tasks" component={renderTask} />
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
WorkflowForm= reduxForm({
  form: "workflowLoader" // a unique identifier for this form
})(WorkflowForm);

// You have to connect() to any reducers that you wish to connect to yourself
WorkflowForm = connect(
  state => ({
    initialValues: state.account.data // pull initial values from account reducer
  }),
  { load: loadAccount } // bind account loading action creator
)(WorkflowForm);

export default WorkflowForm;
