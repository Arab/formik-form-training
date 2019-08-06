import React, { useState } from "react";
import { Formik } from "formik";
import MyForm from "./MyForm";
import Validate from "./Validate";
import { blankValues, fetchedInitialValues } from "./Values";
import "./App.css";

function CustomFormValidate(MyForm, props) {
  const { values, errors } = props;
  // console.log(props);
  if (values.todos.length > 0 && !values.todos.some(item => item)) {
    errors.todosEmpty = "nie mozesz zostawic inputow pustych ;)";
  }
  const newProps = { ...props, errors };

  return <MyForm {...newProps} />;
}

// //   values, props) => {
// //   let todo = {};
// //   console.log(props);
// //   if (
// //     values.todos.length > 0 &&
// //     values.todos.reduce((prev, curr) => prev + curr) === ""
// //   ) {
// //     todo = "nie mozesz zostawic inputow pustych ;)";
// //   }
// //   return { ...props.errors, todo };
// // };

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
        render={props => CustomFormValidate(MyForm, props)}
      />

      <button onClick={fetchInitialValues}>CLICK ME IM SERVER</button>
      <button>Im state values</button>
    </div>
  );
}
export default App;
