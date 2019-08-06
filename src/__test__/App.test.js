import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  wait
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
test("snapshot of app", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
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
  const { getByPlaceholderText } = render(<App />);
  const input = getByPlaceholderText("Enter your age");
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
  const selectAllButton = getByText(/^select all$/i);
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
  const { getByPlaceholderText, findByTestId } = render(<App />);
  const ageInput = getByPlaceholderText("Enter your age");
  fireEvent.focus(ageInput);
  fireEvent.blur(ageInput);
  await waitForElement(() => findByTestId("errors-age")).then(res =>
    expect(res).toBeInTheDocument()
  );
});

test("phone number validation", async () => {
  const { getByLabelText, findByTestId } = render(<App />);
  const phoneNumberInput = getByLabelText(/phone number/i);
  expect(phoneNumberInput).toBeInTheDocument();
  expect(phoneNumberInput.value).toBe("+48 ");
  const typeVal = phoneNumberInput.value + "6005001";
  userEvent.type(phoneNumberInput, typeVal);
  fireEvent.blur(phoneNumberInput);
  await waitForElement(() => findByTestId("errors-phoneNumber")).then(res =>
    expect(res).toBeInTheDocument()
  );
});

test("dietary restriction validation", async () => {
  const {
    getByLabelText,
    findByTestId,
    findByPlaceholderText,
    getByTestId
  } = render(<App />);

  const vegan = getByLabelText(/are you vegan?/i);
  const kosher = getByLabelText(/do you want kosher food?/i);
  const lactose = getByLabelText(/can you handle lactose?/i);
  const other = getByLabelText(/inne:/i);

  userEvent.click(vegan);
  userEvent.click(vegan);
  fireEvent.blur(vegan);
  await waitForElement(() => findByTestId("errors-dietaryRestrictions")).then(
    res => expect(res).toBeInTheDocument()
  );
  userEvent.click(kosher);
  userEvent.click(kosher);
  fireEvent.blur(kosher);
  await waitForElement(() => findByTestId("errors-dietaryRestrictions")).then(
    res => expect(res).toBeInTheDocument()
  );
  userEvent.click(lactose);
  userEvent.click(lactose);
  fireEvent.blur(lactose);
  await waitForElement(() => findByTestId("errors-dietaryRestrictions")).then(
    res => expect(res).toBeInTheDocument()
  );
  userEvent.click(other);
  const input = findByPlaceholderText(
    "Write anything we should know about your dietary restrictions"
  );
  await waitForElement(() => input).then(res => {
    fireEvent.blur(res);
    expect(getByTestId("errors-other-value")).toBeInTheDocument();
  });
  userEvent.click(other);
  fireEvent.blur(other);
  await waitForElement(() => findByTestId("errors-dietaryRestrictions")).then(
    res => expect(res).toBeInTheDocument()
  );
});

test("todos validation", async () => {
  const { findByTestId, getByText, findByText, getAllByText } = render(<App />);
  const addAThingButton = getByText(/add a thing/i);
  fireEvent.click(addAThingButton);
  await waitForElement(() => findByText("-")).then(res => {
    fireEvent.click(res);
  });
  await waitForElement(() => findByTestId("errors-todo"))
    .then(res => {
      expect(res).toBeInTheDocument();
      expect(res.innerHTML).toBe("you need to add at least 1 thing");
    })
    .then(() => fireEvent.click(getByText(/add a thing/i)));
  await waitForElement(() => findByText("-"))
    .then(res => res.parentNode.getElementsByTagName("input")[0])
    .then(input => {
      userEvent.type(input, "cebula");
      fireEvent.blur(input);
    });
  await waitForElement(() => findByTestId("errors-todos-0")).then(res => {
    expect(res).toBeInTheDocument();
    expect(res.innerHTML).toBe(
      "No chyba nie bedziesz bral w pierwszej kolejnosci cebuli ;)"
    );
  });
  userEvent.click(getByText("+"));
  const secondPlusButton = getAllByText("+")[1];
  const secondInput = secondPlusButton.parentNode.getElementsByTagName(
    "input"
  )[0];
  userEvent.type(secondInput, "cebula");
  fireEvent.blur(secondInput);
  await waitForElement(() => findByTestId("errors-todos-1")).then(res => {
    expect(res).toBeInTheDocument();
    expect(res.innerHTML).toBe("w ogole nie zabieraj cebuli na poklad");
  });
  fireEvent.click(secondPlusButton);
  const thirdPlusButton = getAllByText("+")[2];
  const thirdInput = thirdPlusButton.parentNode.getElementsByTagName(
    "input"
  )[0];
  userEvent.type(thirdInput, "cebula");
  fireEvent.blur(thirdInput);
  await waitForElement(() => findByTestId("errors-todos-2")).then(res => {
    expect(res).toBeInTheDocument();
    expect(res.innerHTML).toBe("w ogole nie zabieraj cebuli na poklad");
  });
  fireEvent.click(thirdPlusButton);
  const fourthPlusButton = getAllByText("+")[3];
  const fourthInput = fourthPlusButton.parentNode.getElementsByTagName(
    "input"
  )[0];
  expect(fourthInput.disabled).toBe(true);
  await waitForElement(() => findByTestId("errors-todo")).then(res => {
    expect(res).toBeInTheDocument();
    expect(res.innerHTML).toBe("you can to add max 3 things");
  });
});

test("todos inputs are not empty on submit", async () => {
  const { findByTestId, getByText, getAllByText } = render(<App />);
  const addAThingButton = getByText(/add a thing/i);
  fireEvent.click(addAThingButton);
  userEvent.click(getByText("+"));
  userEvent.click(getAllByText("+")[0]);
  const submitBtn = getByText("Submit");
  fireEvent.click(submitBtn);
  await waitForElement(() => findByTestId("errors-todosEmpty")).then(res => {
    expect(res).toBeInTheDocument();
    expect(res.innerHTML).toBe("nie mozesz zostawic inputow pustych ;)");
  });
});

test("submit click fires all validation msgs", async () => {
  const { container, findByTestId, getByText } = render(<App />);
  const submitBtn = getByText("Submit");
  expect(container.innerHTML).not.toMatch("Required");
  fireEvent.click(submitBtn);
  await Promise.all([
    findByTestId("errors-firstName"),
    findByTestId("errors-lastName"),
    findByTestId("errors-age"),
    findByTestId("errors-phoneNumber"),
    findByTestId("errors-destination"),
    findByTestId("errors-dietaryRestrictions"),
    findByTestId("errors-todo")
  ]).then(errors => {
    errors.map(error => expect(error).toBeInTheDocument());
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
