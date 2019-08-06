import React, { useState } from "react";
import { Formik } from "formik";
import MyForm from "./MyForm";
import Validate from "./Validate";
import { blankValues, fetchedInitialValues } from "./Values";
import "./App.css";

function App() {
  const [initialValues, setInitialValues] = useState(blankValues);

  const fetchInitialValues = () => {
    setInitialValues({ ...fetchedInitialValues });
  };
  const CustomFormValidate = (MyForm, props) => {
    const { values, errors } = props;
    if (values.todos.length > 0 && !values.todos.some(item => item)) {
      errors.todosEmpty = "nie mozesz zostawic inputow pustych ;)";
    }
    const newProps = { ...props, errors };
    return <MyForm {...newProps} />;
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
        render={props => CustomFormValidate(MyForm, props)}
      />

      <button onClick={fetchInitialValues}>CLICK ME IM SERVER</button>
      <button>Im state values</button>
    </div>
  );
}
export default App;
