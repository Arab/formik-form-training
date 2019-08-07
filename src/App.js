import React, { useState } from "react";
import { Formik } from "formik";
import { validate } from "./Validate";
import { blankValues, fetchedInitialValues } from "./Values";
import CustomFormValidate from "./CustomFormValidate";
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
  return (
    <div className="app">
      <h1>My First Formik Form </h1>
      <Formik
        fetchInitialValues={fetchInitialValues}
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        render={CustomFormValidate}
      />
      <button onClick={fetchInitialValues}>CLICK ME IM SERVER</button>
    </div>
  );
}
export default App;
