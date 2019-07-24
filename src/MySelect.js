import React from "react";
import Select from "react-select";

const options = [
  { value: "paris", label: "Paris" },
  { value: "london", label: "London" },
  { value: "new-york", label: "New York" },
  { value: "madrid", label: "Madrid" },
  { value: "warsaw", label: "Warsaw" }
];

class MySelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange("destination", value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur("destination", true);
  };

  render() {
    return (
      <div style={{ margin: "1rem 0" }}>
        <label htmlFor="color">Select your destination </label>
        <Select
          id="color"
          options={options}
          multi={false}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error && this.props.touched && (
          <div style={{ color: "red", marginTop: ".5rem" }}>
            {this.props.error}
          </div>
        )}
      </div>
    );
  }
}

export default MySelect;
