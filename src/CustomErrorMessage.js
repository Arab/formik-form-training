import React from "react";
const CustomErrorMessage = props => {
  const { dataTestId, children } = props;
  return (
    <div data-testid={dataTestId} className="error">
      {children}
    </div>
  );
};
export default CustomErrorMessage;
