import React from "react";
import Select from "react-select";
import CustomErrorMessage from "./CustomErrorMessage";

const options = [
  { value: "paris", label: "Paris" },
  { value: "london", label: "London" },
  { value: "new-york", label: "New York" },
  { value: "madrid", label: "Madrid" },
  { value: "warsaw", label: "Warsaw" }
];

const MySelect = ({ error, value, touched, onBlur, onChange }) => {
  const handleChange = value => {
    onChange("destination", value);
  };

  const handleMySelectAll = () => {
    onChange("destination", options);
  };
  return (
    <>
      <div style={{ margin: "1rem 0" }}>
        <label htmlFor="color">Select your destination </label>
        <Select
          id="color"
          options={options}
          isMulti
          onChange={handleChange}
          onBlur={onBlur}
          value={value}
        />
        {!!error && touched && (
          <div className="myselect__error">
            <CustomErrorMessage
              children={error}
              dataTestId="errors-destination"
            />
          </div>
        )}
      </div>
      <div style={{ margin: "1rem 0" }}>
        <button type="button" onClick={handleMySelectAll}>
          Select All
        </button>
      </div>
    </>
  );
};

export default MySelect;
