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
    this.props.onChange("destination", value);
  };

  handleBlur = () => {
    this.props.onBlur();
  };
  handleMySelectAll = () => {
    this.props.onChange("destination", options);
  };
  render() {
    return (
      <React.Fragment>
        <div style={{ margin: "1rem 0" }}>
          <label htmlFor="color">Select your destination </label>
          <Select
            id="color"
            options={options}
            isMulti
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
        <div style={{ margin: "1rem 0" }}>
          <button
            type="button"
            onClick={this.handleMySelectAll}
            onBlur={() => null}
          >
            Select All
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default MySelect;
