import React from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, Fields } from "redux-form";
import { load as loadAccount } from "./account";
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

const renderTask = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Task
      </button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((task, index) => (
      <li key={index}>
        <div>
        <h4>Task #{index + 1}</h4>
        <button
          type="button"
          title="Remove Task"
          onClick={() => fields.remove(index)}
        />
        </div>

        <div>
        <label>Name</label>
        <div>
          <Field
            name={`${task}.name`}
            component="input"
            type="text"
            placeholder="Task Name"
          />
        </div>
      </div>
      <div>
        <label>Type</label>
        <div>
          <Field
            name={`${task}.type`}
            component="input"
            type="text"
            placeholder="Type Name"
          />
        </div>
      </div>   
         <div>
          <label>Wait For Return</label>
          <div>
          <label>
            <Field
              name={`${task}.waitForReturn`}
              component="input"
              type="radio"
              value="true"
            />{" "}
            True
          </label>
          <label>
            <Field
              name={`${task}.waitForReturn`}
              component="input"
              type="radio"
              value="false"
            />{" "}
            False
           </label>
          </div>
        </div>
        <div>
        <label>Queue</label>
        <div>
          <Field
            name={`${task}.queue`}
            component="input"
            type="text"
            placeholder="Queue"
          />
        </div>
      </div>  
      <div>
        <label>check_policy_status_not</label>

        <div>
          <Field
            name={`${task}.options.check_policy_status_not`}
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>  
      <div>
        <label>singleParameter</label>

        <div>
          <Field
            name={`${task}.options.singleParameter`}
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>  
      <div>
        <label>type</label>

        <div>
          <Field
            name={`${task}.options.type`}
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>  
      <div>
        <label>check_policy_status</label>

        <div>
          <Field
            name={`${task}.options.check_policy_status`}
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>  
      <div>
        <label>DRAFT_CERTIFICATE</label>

        <div>
          <Field
            name={`${task}.options.DRAFT_CERTIFICATE`}
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>  
      <div>
        <label>withClaims</label>

        <div>
          <Field
            name={`${task}.options.withClaims`}
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>  
      <div>
        <label>PAYMENT_MANAGED_BY_AXA</label>
        <div>
          <Field
            name={`${task}.options.PAYMENT_MANAGED_BY_AXA`}
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>  
      <div>
        <label>IDD_COMPLIANT</label>

        <div>
          <Field
            name={`${task}.options.IDD_COMPLIANT`}
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>  
      <FieldArray name={`${task}.dependsOn`} component={renderDependancy} />

        {/* <FieldArray name={`${task}.dependsOn`} component={renderDependancy} /> */}
      </li>
    ))}
  </ul>
);

const renderDependancy = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Dependancy
      </button>
    </li>
    {fields.map((dependancy, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Dependancy"
          onClick={() => fields.remove(index)}
        />
        <div>
        <label>{`Dependancy #${index + 1}`}</label>
        <div>
          <Field
            name={dependancy}
            component="input"
            type="text"
            placeholder="Depends On"
          />
        </div>
      </div>  
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

const renderOptions = ({ fields, meta: { error } }) => (
  <ul>
    <li>
     <button type="button" onClick={() => fields.push({})}>
        Add Option
      </button>
    </li>
    {fields.map((field, index) => (
      <li key={index}>
        
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);
let InitializeFromStateForm = props => {
  const { handleSubmit, load, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="button" onClick={() => load(data)}>
          Load Account
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
InitializeFromStateForm = reduxForm({
  form: "initializeFromState" // a unique identifier for this form
})(InitializeFromStateForm);

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => ({
    initialValues: state.account.data // pull initial values from account reducer
  }),
  { load: loadAccount } // bind account loading action creator
)(InitializeFromStateForm);

export default InitializeFromStateForm;
