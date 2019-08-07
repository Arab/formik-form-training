import { get } from "lodash";

export function makeFriendlyObjects(values, touched, errors) {
  const firstName = {
    value: values.firstName,
    touched: touched.firstName,
    error: errors.firstName
  };
  const lastName = {
    value: values.lastName,
    touched: touched.lastName,
    error: errors.lastName
  };
  const age = {
    value: values.age,
    touched: touched.age,
    error: errors.age
  };
  const gender = {
    value: values.gender,
    touched: touched.gender,
    error: errors.gender
  };
  const vegan = {
    value: get(values, "dietaryRestrictions.isVegan"),
    touched: get(touched, "dietaryRestrictions.isVegan"),
    error: get(errors, "dietaryRestrictions.isVegan")
  };
  const kosher = {
    value: get(values, "dietaryRestrictions.isKosher"),
    touched: get(touched, "dietaryRestrictions.isKosher"),
    error: get(errors, "dietaryRestrictions.isKosher")
  };
  const lactose = {
    value: get(values, "dietaryRestrictions.isLactoseFree"),
    touched: get(touched, "dietaryRestrictions.isLactoseFree"),
    error: get(errors, "dietaryRestrictions.isLactoseFree")
  };
  const other = {
    value: get(values, "dietaryRestrictions.other.isOther"),
    touched: get(touched, "dietaryRestrictions.other.isOther"),
    error: errors.other
  };
  const otherInput = {
    value: get(values, "dietaryRestrictions.other.value"),
    touched: get(touched, "dietaryRestrictions.other.value"),
    error: errors.other
  };
  const todos = values.todos.map((todo, index) => ({
    value: todo,
    touched: get(touched, `todos[${index}]`),
    error: get(errors, `todos[${index}]`)
  }));
  return {
    firstName,
    lastName,
    age,
    gender,
    vegan,
    kosher,
    lactose,
    other,
    otherInput,
    todos
  };
}
