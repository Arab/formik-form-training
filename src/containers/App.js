import React, { useState } from "react";
import { Formik } from "formik";
import { validate } from "../components/Validate";
import { blankValues, fetchedInitialValues } from "../data/Values";
import CustomFormValidate from "../components/CustomFormValidate";
import "./App.css";

function App() {
  const [initialValues, setInitialValues] = useState(blankValues);

  const fetchInitialValues = () => {
    setInitialValues({ ...fetchedInitialValues });
  };
  const handleSubmit = (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 500);
  };

  const customValidate = props => {
    // console.log("customValidate: ");
    // console.log(props);
    const { values, errors } = props;
    if (values.todos.length > 0 && !values.todos.some(item => item)) {
      errors.todosEmpty = "nie mozesz zostawic inputow pustych ;)";
    }
    const newProps = { ...props, errors };
    // console.log(newProps);
    return newProps;
  };

  const handleRender = props => {
    // console.log("handleRender: ");
    // console.log(props);
    const form = CustomFormValidate(props, customValidate);
    return form;
  };

  return (
    <div className="app">
      <h1>My First Formik Form </h1>
      <Formik
        fetchInitialValues={fetchInitialValues}
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        render={handleRender}
      />
      <button onClick={fetchInitialValues}>CLICK ME IM SERVER</button>
    </div>
  );
}
export default App;
