import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Values } from "redux-form-website-template";
import store from "./store";
import showResults from "./showResults";
import WorkflowForm from "./WorkflowForm";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Workflow Form</h2>
      <WorkflowForm onSubmit={showResults} />
      <Values form="workflow" />
    </div>
  </Provider>,
  rootEl
);
