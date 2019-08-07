import React from "react";
import { Field } from "formik";

const CustomField = ({ disabled, index }) => {
  if (disabled) {
    return (
      <Field
        name={`todos.${index}`}
        style={{
          width: "300px",
          backgroundColor: "lightgray"
        }}
        placeholder="no no no look down!"
        disabled
      />
    );
  } else {
    return <Field style={{ width: "300px" }} name={`todos.${index}`} />;
  }
};
export default CustomField;
