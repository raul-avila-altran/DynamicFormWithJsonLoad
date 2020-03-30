

import React from "react";
import { Field, FieldArray } from "redux-form";
import renderTask from "./task";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { AutoComplete } from "redux-form-material-ui";
import { updateTask } from "../account";	
import { connect } from "react-redux";	
import  arrayMove  from "array-move";



const options = [
  "black",
  "blue",
  "brown",
  "gray",
  "green",
  "orange",
  "pink",
  "purple",
  "red",
  "white",
  "yellow"
];


let ExampleForm = props => {
  const { update, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="auto-complete">Favorire Color:</label>
        <Field
          name="favoriteColor"
          component={AutoComplete}
          hintText="Type anything"
          dataSource={options}
          disableFocusRipple={false}
        />
      </div>
      <button type="button" onClick={() => update()}>
          Load Workflow
        </button>
    </form>
  );
};

let renderWorkflow = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Workflow
      </button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {/* <MuiThemeProvider>
    <ExampleForm />
    </MuiThemeProvider> */}
    {fields.map((workflow, index) => (
      <li key={index}>
        <button type="button"
          title="Remove Workflow"
          onClick={() => fields.remove(index)} >       
        </button>
        <button type="button"
          title="move down"
          onClick={() => fields.move( index, index+1)} >       
        </button>
        <button type="button"
          title="move up"
          onClick={() => fields.move(index, index-1)} >       
        </button>
        <div>
        <h4>Workflow #{index + 1}</h4>
        <button
          type="button"
          title = "Add Workflow"
          onClick={() => fields.splice(index +1, 0, {})}
          />
        </div>
        <div>
        <label>Name</label>
        <div>
          <Field
            name={`${workflow}.name`}
            component="input"
            type="text"
            dataSource={options}
            disabled={false}
            placeholder="Workflow Name"
          />
        </div>
      </div>
      <div>
        <label>Type</label>
        <div>
          <Field
            name={`${workflow}.type`}
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
              name={`${workflow}.removeAtEnd`}
              component="input"
              type="radio"
              value="true"
            />{" "}
            True
          </label>
          <label>
            <Field
              name={`${workflow}.removeAtEnd`}
              component="input"
              type="radio"
              value="false"
            />{" "}
            False
          </label>
        </div>
      </div>
      <div>
        <FieldArray name={`${workflow}.tasks`} component={renderTask} />
      </div>
        {/* <FieldArray name={`${task}.dependsOn`} component={renderDependancy} /> */}
      </li>
    ))}
  </ul>
);

ExampleForm = connect(	
  state => ({	
    initialValues: state.account.data // pull initial values from account reducer	
  }),	
  { update: updateTask } // bind account loading action creator	
 
)(ExampleForm);	
export default renderWorkflow;