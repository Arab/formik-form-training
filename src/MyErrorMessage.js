import React from "react";
import { ErrorMessage } from "formik";

const MyErrorMessage = props => {
  const { dataTestId, name } = props;
  return (
    <ErrorMessage
      name={name}
      render={msg => (
        <div data-testid={dataTestId} className="error">
          {msg}
        </div>
      )}
    />
  );
};
export default MyErrorMessage;
