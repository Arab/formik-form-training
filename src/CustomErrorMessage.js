import React from "react";
const CustomErrorMessage = ({ dataTestId, children }) => (
  <div data-testid={dataTestId} className="error">
    {children}
  </div>
);

export default CustomErrorMessage;
