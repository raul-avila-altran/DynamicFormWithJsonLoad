import React from "react";
import { Field} from "redux-form";

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

export default renderDependancy;