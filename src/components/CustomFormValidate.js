import React from "react";

const CustomFormValidate = (props, foo, MyForm) => {
  const newProps = foo(props);
  return <MyForm {...newProps} />;
};

export default CustomFormValidate;
