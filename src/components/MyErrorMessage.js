import React from "react";
import { ErrorMessage } from "formik";
import CustomErrorMessage from "./CustomErrorMessage";

const MyErrorMessage = ({ dataTestId, name }) => {
  return (
    <ErrorMessage
      name={name}
      dataTestId={dataTestId}
      component={CustomErrorMessage}
    />
  );
};
export default MyErrorMessage;
