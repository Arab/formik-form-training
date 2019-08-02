import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  prettyDOM,
  wait,
  waitForElementToBeRemoved,
  queryByAltText,
  getByDisplayValue
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import selectEvent from "react-select-event";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

const leftClick = { button: 0 };

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("name input exists", () => {
  const { getByPlaceholderText } = render(<App />);
  const input = getByPlaceholderText("Enter your name");
  expect(input).toBeInTheDocument();
});

test("last name input exists", () => {
  const { getByPlaceholderText } = render(<App />);
  const input = getByPlaceholderText("Enter your last name");
  expect(input).toBeInTheDocument();
});

test("age input exists", () => {
  const { getByDisplayValue } = render(<App />);
  const input = getByDisplayValue("0");
  expect(input).toBeInTheDocument();
});

test("name input empty validation", async () => {
  const { getByPlaceholderText, container, findByTestId, getByText } = render(
    <App />
  );
  const inputName = getByPlaceholderText("Enter your name");
  expect(container.innerHTML).not.toMatch("Required");
  fireEvent.blur(inputName);
  const validationErrors = await findByTestId("errors-firstName");
  expect(validationErrors.innerHTML).toMatch("Required");
});

test("name input to short text validation", async () => {
  const { getByPlaceholderText, container, findByTestId } = render(<App />);
  const inputName = getByPlaceholderText("Enter your name");
  expect(container.innerHTML).not.toMatch("Required");
  fireEvent.change(inputName, { target: { value: "aa" } });
  fireEvent.blur(inputName);
  const validationErrors = await findByTestId("errors-firstName");
  expect(validationErrors.innerHTML).toMatch(
    "Wysil się imie musi mieć przynajmniej 3 litery"
  );
});

test("name input is not Piotr text validation", async () => {
  const { getByPlaceholderText, container, findByTestId } = render(<App />);
  const inputName = getByPlaceholderText("Enter your name");
  expect(container.innerHTML).not.toMatch("Required");
  fireEvent.change(inputName, { target: { value: "Piotra" } });
  fireEvent.blur(inputName);
  const validationErrors = await findByTestId("errors-firstName");
  expect(validationErrors.innerHTML).toMatch("Nah kiepawe imię");
});

test("name input validation hide when proper input", async () => {
  const { getByPlaceholderText, container, findByTestId } = render(<App />);
  const inputName = getByPlaceholderText("Enter your name");
  expect(container.innerHTML).not.toMatch("Required");
  fireEvent.change(inputName, { target: { value: "Piotra" } });
  fireEvent.blur(inputName);
  const validationErrors = await findByTestId("errors-firstName");
  expect(validationErrors.innerHTML).toMatch("Nah kiepawe imię");
  fireEvent.change(inputName, { target: { value: "Piotr" } });
  await wait(() => {
    expect(container.innerHTML).not.toMatch("Nah kiepawe imię");
  });
});

test("name input validation trigered by submit button", async () => {
  const { container, findByTestId, getByText } = render(<App />);
  const submitBtn = getByText("Submit");
  expect(container.innerHTML).not.toMatch("Required");
  fireEvent.click(submitBtn, leftClick);
  const validationErrors = await findByTestId("errors-firstName");
  expect(validationErrors.innerHTML).toMatch("Required");
});

test("reset button is disabled by default", () => {
  const { getByText } = render(<App />);
  const submitBtn = getByText("Reset");
  expect(submitBtn.disabled).toBe(true);
});

test("reset button is not disabled when form is changed", () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  const submitBtn = getByText("Reset");
  const inputName = getByPlaceholderText("Enter your name");
  expect(submitBtn.disabled).toBe(true);
  fireEvent.change(inputName, { target: { value: "aa" } });
  expect(submitBtn.disabled).toBe(false);
});

test("submit click fires all validation msgs", async () => {
  const { container, findByTestId, getByText } = render(<App />);
  const submitBtn = getByText("Submit");
  expect(container.innerHTML).not.toMatch("Required");
  fireEvent.click(submitBtn, leftClick);
  const validationErrors = await [
    findByTestId("errors-firstName"),
    findByTestId("errors-lastName"),
    findByTestId("errors-age"),
    findByTestId("errors-phoneNumber"),
    findByTestId("errors-destination"),
    findByTestId("errors-dietaryRestrictions"),
    findByTestId("errors-todo")
  ];
  await wait(() => {
    validationErrors.map(error => expect(error.innerHTML).not.toBeNull());
  });
});

test("validation msgs disapear after loading data from server", async () => {
  const { container, findByTestId, getByText } = render(<App />);
  const submitBtn = getByText("Submit");
  const serverBtn = getByText("CLICK ME IM SERVER");
  expect(container.innerHTML).not.toMatch("Required");
  fireEvent.click(submitBtn, leftClick);
  const validationErrors = await Promise.all([
    findByTestId("errors-firstName"),
    findByTestId("errors-lastName"),
    findByTestId("errors-age"),
    findByTestId("errors-phoneNumber"),
    findByTestId("errors-destination"),
    findByTestId("errors-dietaryRestrictions"),
    findByTestId("errors-todo")
  ]).then(error => {
    error.map(err => expect(err).toBeInTheDocument());
    return error;
  });
  fireEvent.click(serverBtn, leftClick);
  validationErrors.map(error => expect(error).not.toBeInTheDocument());
});

test("test select options on react-select", async () => {
  const { getByLabelText } = render(<App />);

  const el = getByLabelText("Select your destination");
  expect(el.innerHTML).not.toMatch("Paris");
  expect(el.innerHTML).not.toMatch("London");
  await selectEvent.select(getByLabelText("Select your destination"), [
    "Paris",
    "London"
  ]);
  expect(el.innerHTML).toMatch("Paris");
  expect(el.innerHTML).toMatch("London");
});

test("test search and select option on react-select", () => {
  const { getByLabelText, getAllByText } = render(<App />);
  const el = getByLabelText("Select your destination");
  const inp = el.querySelector("input");
  userEvent.type(inp, "London");
  const sth = getAllByText("London");
  fireEvent.click(sth[1]);
  expect(getByLabelText("Select your destination").innerHTML).toMatch("London");
});

test("test search and press enter on react-select", () => {
  const { getByLabelText } = render(<App />);
  const el = getByLabelText("Select your destination");
  const inp = el.querySelector("input");
  userEvent.type(inp, "London");
  fireEvent.keyDown(el, { key: "Enter", code: 13, keyCode: 13 });
  expect(el.innerHTML).toMatch("London");
});

test("test react-select with keyboard navigation", async () => {
  const { getByLabelText, container, findByLabelText } = render(<App />);
  const el = getByLabelText("Select your destination");
  const inp = el.querySelector("input");
  fireEvent.focus(inp);
  const elAsync = await findByLabelText("Select your destination");
  const inpAsync = await elAsync.querySelector("input");
  fireEvent.keyDown(inpAsync, { key: "Down", code: 40 });
  fireEvent.keyDown(inpAsync, { key: "Down", code: 40 });
  fireEvent.keyDown(inpAsync, { key: "Enter", code: 13, keyCode: 13 });
  expect(el.innerHTML).toMatch("London");
});
