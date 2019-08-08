import CustomErrorMessage from "../components/CustomErrorMessage";

const defaultProps = {
  dataTestId: "error-default",
  children: "this is default error message"
};

const setup = buildSetup(CustomErrorMessage, defaultProps);
test("renders without crashing", () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
});

test("renders with difrent props", () => {
  const { container } = setup({ children: "some new message" });
  expect(container).toMatchSnapshot();
});
