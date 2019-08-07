import React from "react";
import MyForm from "./MyForm";

const CustomFormValidate = props => {
  const { values, errors } = props;
  if (values.todos.length > 0 && !values.todos.some(item => item)) {
    errors.todosEmpty = "nie mozesz zostawic inputow pustych ;)";
  }
  const newProps = { ...props, errors };
  return <MyForm {...newProps} />;
};

export default CustomFormValidate;
