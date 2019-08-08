import React from "react";
import CustomErrorMessage from "../components/CustomErrorMessage";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  wait,
  prettyDOM
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import selectEvent from "react-select-event";
import userEvent from "@testing-library/user-event";

const defaultProps = {
  dataTestId: "error-default",
  children: "this is default error message"
};

afterEach(cleanup);

test("renders without crashing", () => {
  const { container, rerender } = render(
    <CustomErrorMessage {...defaultProps} />
  );
  expect(container).toMatchSnapshot();
  rerender(
    <CustomErrorMessage {...defaultProps} dataTestId="error-some-new-error" />
  );
  // console.log(prettyDOM(container));
});
