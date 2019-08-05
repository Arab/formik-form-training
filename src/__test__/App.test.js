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
  getByDisplayValue,
  findByText,
  getByTestId
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import selectEvent from "react-select-event";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

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

test("male/female radio buttons exists and clicking change them", () => {
  const { getByLabelText } = render(<App />);
  const male = getByLabelText("Male");
  const female = getByLabelText("Female");
  expect(male).toBeInTheDocument();
  expect(male.checked).toBe(true);
  expect(female).toBeInTheDocument();
  expect(female.checked).toBe(false);
  fireEvent.click(female);
  expect(male.checked).toBe(false);
  expect(female.checked).toBe(true);
});

test("phone number shows corectly - every 3 digits", async () => {
  const { getByLabelText } = render(<App />);
  const actualyTypeing = (input, text) => {
    const oldValue = input.value;
    const newValue = oldValue + text;
    userEvent.type(input, newValue);
  };
  let phoneNumberInput = getByLabelText(/phone number/i);
  expect(phoneNumberInput).toBeInTheDocument();
  expect(phoneNumberInput.value).toBe("+48 ");
  userEvent.type(phoneNumberInput, "a");
  expect(phoneNumberInput.value).toBe("+48 ");
  userEvent.type(phoneNumberInput, "0.5");
  expect(phoneNumberInput.value).toBe("+48 ");
  actualyTypeing(phoneNumberInput, "000");
  expect(phoneNumberInput.value).toBe("+48 000");
  actualyTypeing(phoneNumberInput, "0");
  expect(phoneNumberInput.value).toBe("+48 000-0");
  actualyTypeing(phoneNumberInput, "00");
  expect(phoneNumberInput.value).toBe("+48 000-000");
  actualyTypeing(phoneNumberInput, "0");
  expect(phoneNumberInput.value).toBe("+48 000-000-0");
  actualyTypeing(phoneNumberInput, "00");
  expect(phoneNumberInput.value).toBe("+48 000-000-000");
  actualyTypeing(phoneNumberInput, "0");
  expect(phoneNumberInput.value).toBe("+48 000-000-000");
});

test("select destination exists", () => {
  const { getByLabelText } = render(<App />);
  const selectReact = getByLabelText(/select your destination/i);
  expect(selectReact).toBeInTheDocument();
});

test("select all button exists", () => {
  const { getByText } = render(<App />);
  const selectAllButton = getByText(/select all/i);
  expect(selectAllButton).toBeInTheDocument();
});

test("dietary checkboxes exists and when other is chosen there is aditional text input", async () => {
  const { getByLabelText, findByPlaceholderText } = render(<App />);
  const vegan = getByLabelText(/are you vegan?/i);
  const kosher = getByLabelText(/do you want kosher food?/i);
  const lactose = getByLabelText(/can you handle lactose?/i);
  const other = getByLabelText(/inne:/i);
  const input = findByPlaceholderText(
    "Write anything we should know about your dietary restrictions"
  );
  expect(vegan).toBeInTheDocument();
  expect(kosher).toBeInTheDocument();
  expect(lactose).toBeInTheDocument();
  expect(other).toBeInTheDocument();
  userEvent.click(other);
  await waitForElement(() => input).then(res =>
    expect(res).toBeInTheDocument()
  );
});

test("wish list label and add a thing button exists", () => {
  const { getByText } = render(<App />);
  const wishList = getByText(/things you wish to not forget:/i);
  const addAThingButton = getByText(/add a thing/i);
  expect(wishList).toBeInTheDocument();
  expect(addAThingButton).toBeInTheDocument();
});

test("Reset and Submit buttons exists", () => {
  const { getByText } = render(<App />);
  const resetButton = getByText(/reset/i);
  const submitButton = getByText("Submit");

  expect(resetButton).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

//------------------- VALIDATION ---------------------------------------------------

test("name input empty validation", async () => {
  const { getByPlaceholderText, container, findByTestId } = render(<App />);
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
  fireEvent.click(submitBtn);
  const validationErrors = await findByTestId("errors-firstName");
  expect(validationErrors.innerHTML).toMatch("Required");
});

test("last name input validation", async () => {
  const { container, findByTestId, getByPlaceholderText, findByText } = render(
    <App />
  );
  const input = getByPlaceholderText("Enter your last name");
  expect(container.innerHTML).not.toMatch("Last Name is Required");
  userEvent.click(input);
  fireEvent.blur(input);
  const validationError = await findByTestId("errors-lastName");
  expect(validationError).toBeInTheDocument();
  userEvent.type(input, "aa");
  const validationMessage = await findByText(
    "Nazwiska mają przynajmniej 5 znaków w jakmi świecie Ty zyjesz lel"
  );
  expect(validationMessage).toBeInTheDocument();
  userEvent.type(input, "aaaaaa");
  await wait(() => {
    expect(container.innerHTML).not.toMatch(
      "Nazwiska mają przynajmniej 5 znaków w jakmi świecie Ty zyjesz lel"
    );
    expect(container.innerHTML).not.toMatch("Last Name is Required");
  });
});

test("age input validation", async () => {
  const { container, findAllByDisplayValue } = render(<App />);

  const ageInput = await findAllByDisplayValue("0");
  const age = ageInput[0];
  fireEvent.focus(age);
  fireEvent.blur(age);
  await wait(() =>
    expect(container.innerHTML).toMatch(
      "niepelnoletnich na poklad nie wpuszczamy!!!"
    )
  );
});

test("submit click fires all validation msgs", async () => {
  const { container, findByTestId, getByText } = render(<App />);
  const submitBtn = getByText("Submit");
  expect(container.innerHTML).not.toMatch("Required");
  fireEvent.click(submitBtn);
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
  fireEvent.click(submitBtn);
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
  fireEvent.click(serverBtn);
  validationErrors.map(error => expect(error).not.toBeInTheDocument());
});

//------------------- END OF VALIDATION ---------------------------------------------------

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
  // fireEvent.change(inputName, { target: { value: "aa" } });
  userEvent.type(inputName, "aa");
  expect(submitBtn.disabled).toBe(false);
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

test("test react-select with keyboard navigation", () => {
  const { getByLabelText } = render(<App />);
  const el = getByLabelText("Select your destination");
  const inp = el.querySelector("input");
  fireEvent.focus(inp);
  fireEvent.keyDown(inp, { key: "Down", code: 40 });
  fireEvent.keyDown(inp, { key: "Down", code: 40 });
  fireEvent.keyDown(inp, { key: "Enter", code: 13, keyCode: 13 });
  expect(el.innerHTML).toMatch("London");
});

test("test select all button", () => {
  const { getByText } = render(<App />);
  const selectAllButton = getByText(/Select All/i);
  fireEvent.click(selectAllButton);
  const destinations = [
    getByText("Paris"),
    getByText("London"),
    getByText("New York"),
    getByText("Madrid"),
    getByText("Warsaw")
  ];
  destinations.map(destination => expect(destination).toBeInTheDocument());
});

test.only("age input min max values", async () => {
  const {
    getByDisplayValue,
    getByTestId,
    container,
    findByDisplayValue,
    findByText,
    findByLabelText,
    findAllByDisplayValue,
    debug,
    getByPlaceholderText,
    findByTestId
  } = render(<App />);

  function __triggerKeyboardEvent(el, keyCode) {
    var eventObj = document.createEventObject
      ? document.createEventObject()
      : document.createEvent("Events");

    if (eventObj.initEvent) {
      eventObj.initEvent("keydown", true, true);
    }

    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;

    el.dispatchEvent
      ? el.dispatchEvent(eventObj)
      : el.fireEvent("onkeydown", eventObj);
  }

  function triggerKeyboardEvent(el, keyCode) {
    var keyboardEvent = document.createEvent("KeyboardEvent");

    var initMethod =
      typeof keyboardEvent.initKeyboardEvent !== "undefined"
        ? "initKeyboardEvent"
        : "initKeyEvent";

    keyboardEvent[initMethod](
      "keydown",
      true, // bubbles oOooOOo0
      true, // cancelable
      window, // view
      false, // ctrlKeyArg
      false, // altKeyArg
      false, // shiftKeyArg
      false, // metaKeyArg
      keyCode,
      0 // charCode
    );

    el.dispatchEvent(keyboardEvent);
  }

  const test = getByTestId("testnumber");
  debug(test);
  const event = new KeyboardEvent("keydown", {
    key: "ArrowDown",
    code: "ArrowDown",
    keyCode: 40,
    bubbles: true,
    isTrusted: false
  });
  // container.parentNode.addEventListener("keydown", e => console.log(e));
  test.addEventListener("keydown", e => console.log(e));
  fireEvent.focus(test);
  fireEvent.keyDown(test, {
    key: "ArrowDown",
    code: 40,
    keyCode: 40,
    which: 40
  });
  test.dispatchEvent(event);
  __triggerKeyboardEvent(test, 40);
  triggerKeyboardEvent(test, 40);
  fireEvent.blur(test);
  await wait(() => console.log(prettyDOM(getByTestId("testnumber"))));
  // const ageInput = getByPlaceholderText("Enter you age");
  // expect(ageInput.value).toBe("0");
  // fireEvent.focus(ageInput);
  // ageInput.addEventListener("keydown", e => console.log(e.keyCode));
  // const event = new KeyboardEvent("keydown", { keyCode: 40, bubbles: true });
  // // fireEvent.keyDown(ageInput, { key: "ArrowDown", code: 40, keyCode: 40 });
  // // fireEvent.keyDown(ageInput, { key: "Down", code: 40, keyCode: 40 });
  // // fireEvent.keyDown(ageInput, { key: "Down", code: 40 });
  // // fireEvent.keyDown(ageInput, { key: "ArrowDown", code: 40 });
  // // fireEvent.keyDown(ageInput, { key: "Enter", code: 13, keyCode: 13 });
  // container.addEventListener("keydown", e =>
  //   e.keyCode === 40 ? console.log("key down pressed") : null
  // );

  // ageInput.dispatchEvent(event);

  // fireEvent.blur(ageInput);
  // await wait(() => console.log(prettyDOM(container)));

  // ageInput.addEventListener("keydown", e => console.log(e.key));
  // fireEvent.focus(ageInput);
  // fireEvent.keyDown(ageInput, { key: "ArrowUp", code: 38 });
  // const sth = getByDisplayValue("");
  // console.log(prettyDOM(ageInput));
  // const validationMessage = await findByText("Wartość nie może być", {
  //   exact: false
  // });
  // console.log(prettyDOM(validationMessage));

  // console.log(prettyDOM(ageInput));
});
