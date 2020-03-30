

import React from "react";
import { Field, FieldArray } from "redux-form";
import renderDependancy from "./dependancy";
import Multiselect from 'react-widgets/lib/Multiselect'

const queue = [
  "goCardLess",
  "salesforce",
  "archive-subscription",
  "claims",
  "zuora"
];
const renderMultiselect = ({ input, data, valueField, textField }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />

const renderTask = ({ member ,fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Task
      </button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((task, index) => (
      <li key={index}>
        <button type="button"
          title="Remove Workflow"
          onClick={() => fields.remove(index)} >       
        </button>
        <div>
        <h4>Task #{index + 1}</h4>
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
            placeholder={task.name}
            //style={{display: task.name.value === "test" ? 'none' : 'block'}}
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
          { <Field
            name={`${task}.queue`}
            component="select">
            <option></option>
            {queue.map((each) =>(
              <option value={each}>{each}</option>
            ))}
          </Field> }
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

export default renderTask;