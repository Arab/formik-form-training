import React from "react";

class PhoneInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      phonePrefix: "+48 "
    };
  }

  handleChange = e => {
    let phoneNumber = e.target.value;
    console.log("before: ", phoneNumber);
    phoneNumber = phoneNumber.substr(4);
    phoneNumber = phoneNumber.replace(/\s+/g, "");
    phoneNumber = phoneNumber.replace("e", "");
    phoneNumber = phoneNumber.replace(".", "");
    phoneNumber = this.clearPhoneNumberFormat(phoneNumber);

    if (isNaN(phoneNumber)) {
      return;
    }
    phoneNumber = this.renderPhoneNumberFormat(phoneNumber);

    console.log("after: ", phoneNumber);
    this.setState({ phoneNumber }, () => {
      const phoneNumber = this.state.phonePrefix + this.state.phoneNumber;
      this.props.form.setFieldValue("phoneNumber", phoneNumber);
    });
  };

  handleKeyPress = e => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
    }
  };
  handleBlur = e => {
    this.props.form.handleBlur(e);
  };
  clearPhoneNumberFormat = number => {
    const phoneNumber = number.replace(/-/g, "");
    if (phoneNumber.length > 13) {
      return phoneNumber.slice(0, 13);
    }
    return phoneNumber;
  };

  renderPhoneNumberFormat = number => {
    if (number.length > 3 && number.length < 6) {
      return number.slice(0, 3) + "-" + number.slice(3, number.length + 1);
    } else if (number.length === 6) {
      return number.slice(0, 3) + "-" + number.slice(3, 6);
    } else if (number.length > 6 && number.length <= 9) {
      return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(
        6,
        number.length
      )}`;
    } else if (number.length > 9) {
      return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(
        6,
        9
      )}`;
    }
    return number;
  };

  render() {
    return (
      <label>
        Phone Number:{" "}
        <input
          type="text"
          name="phoneNumber"
          className="phoneNumber"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.field.value}
          onKeyDown={this.handleKeyPress}
        />
      </label>
    );
  }
}

export default PhoneInput;
