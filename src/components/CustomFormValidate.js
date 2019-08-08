import React from "react";
import MyForm from "./MyForm";

const CustomFormValidate = (props, foo) => {
  // console.log("CustomFormValidate");
  const newProps = foo(props);
  // console.log(newProps);
  return <MyForm {...newProps} />;
};

export default CustomFormValidate;
