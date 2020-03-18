

import React from "react";
import { Field, FieldArray } from "redux-form";
import renderTask from "./task";

const renderWorkflow = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Workflow
      </button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((workflow, index) => (
      <li key={index}>
        <div>
        <h4>Workflow #{index + 1}</h4>
        <button
          type="button"
          title="Remove Workflow"
          onClick={() => fields.remove(index)}
        />
        </div>
        <div>
        <label>Name</label>
        <div>
          <Field
            name={`${workflow}.name`}
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

export default renderWorkflow;