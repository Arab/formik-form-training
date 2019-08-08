const customValidate = props => {
  const { values, errors } = props;
  if (values.todos.length > 0 && !values.todos.some(item => item)) {
    errors.todosEmpty = "nie mozesz zostawic inputow pustych ;)";
  }
  const newProps = { ...props, errors };
  return newProps;
};

export { customValidate };
