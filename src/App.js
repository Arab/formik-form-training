import React, { useState } from "react";
import { Formik } from "formik";
import Validate from "./Validate";
import { blankValues, fetchedInitialValues } from "./Values";
import CustomFormValidate from "./CustomFormValidate";
import "./App.css";

function App() {
  const [initialValues, setInitialValues] = useState(blankValues);

  const fetchInitialValues = () => {
    setInitialValues({ ...fetchedInitialValues });
  };

  return (
    <div className="app">
      <h1>My First Formik Form </h1>
      <Formik
        fetchInitialValues={fetchInitialValues}
        initialValues={initialValues}
        validate={Validate}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
        enableReinitialize={true}
        render={CustomFormValidate}
      />
      <button onClick={fetchInitialValues}>CLICK ME IM SERVER</button>
    </div>
  );
}
export default App;
