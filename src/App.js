import React, { useState } from "react";
import { DisplayFormikState } from "./helper";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import MySelect from "./MySelect";
import PhoneInput from "./PhoneInput";
import "./App.css";

const fetchedInitialValues = {
  firstName: "Piotr",
  lastName: "Motak",
  age: 30,
  gender: "male",
  phoneNumber: "+48 690-478-822",
  destination: [
    {
      value: "london",
      label: "London"
    }
  ],
  dietaryRestrictions: {
    isVegan: false,
    isKosher: false,
    isLactoseFree: false,
    other: {
      isOther: true,
      value: "Ja <3 bagietki, ale grzybów nie mogę"
    }
  },
  todos: ["cleanhouse", "wash dishes"]
};

const blankValues = {
  firstName: "",
  lastName: "",
  age: 0,
  gender: "male",
  phoneNumber: "+48 ",
  destination: [],
  dietaryRestrictions: {
    isVegan: false,
    isKosher: false,
    isLactoseFree: false,
    other: {
      isOther: false,
      value: ""
    }
  },
  todos: [],
  todosEmpty: ""
};

const validate = values => {
  let errors = {};
  //first name validation
  if (values.gender === "") {
    errors.gender = "halo";
  }
  if (!values.firstName) {
    errors.firstName = "First Name is Required";
  } else if (values.firstName.length < 3) {
    errors.firstName = "Wysil się imie musi mieć przynajmniej 3 litery";
  } else if (values.firstName !== "Piotr") {
    errors.firstName = "Nah kiepawe imię";
  }
  //last name validation
  if (!values.lastName) {
    errors.lastName = "Last Name is Required";
  } else if (values.lastName.length < 5) {
    errors.lastName =
      "Nazwiska mają przynajmniej 5 znaków w jakmi świecie Ty zyjesz lel";
  }
  //age validation
  if (values.age < 18) {
    errors.age = "niepelnoletnich na poklad nie wpuszczamy!!!";
  }
  // dietary restricion
  if (
    !values.dietaryRestrictions.isVegan &&
    !values.dietaryRestrictions.isKosher &&
    !values.dietaryRestrictions.isLactoseFree &&
    !values.dietaryRestrictions.other.isOther
  ) {
    errors.dietaryRestrictions =
      "no nie no w to nie uwierze, wybierz chociaz jedna :P";
  }
  if (
    values.dietaryRestrictions.other.isOther &&
    values.dietaryRestrictions.other.value.length === 0
  ) {
    errors.other = "jak juz wybrales inne to cos napisz...";
  }
  if (values.destination.length === 0) {
    errors.destination = "musisz wybrać gdzie chcesz jechać";
  }
  if (values.phoneNumber.length < 15) {
    errors.phoneNumber = "podany numer jest zbyt krótki";
  }
  if (values.todos.length === 0) {
    errors.todo = "you need to add at least 1 thing";
  }
  if (values.todos.length > 3) {
    errors.todo = "you can to add max 3 things";
  }
  if (values.todos.length > 0) {
    errors.todos = values.todos.map(todo =>
      todo === "cebula" ? "w ogole nie zabieraj cebuli na poklad" : null
    );
  }
  if (values.todos.length > 0 && values.todos[0] === "cebula") {
    errors.todos[0] =
      "No chyba nie bedziesz bral w pierwszej kolejnosci cebuli ;)";
  }

  return errors;
};

const MyForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleReset,
    setFieldValue,
    handleBlur,
    isSubmitting
  } = props;
  return (
    <div>
      <Form>
        <Field
          type="text"
          name="firstName"
          placeholder="Enter your name"
          className="input"
        />
        <ErrorMessage
          name="firstName"
          render={msg => (
            <div data-testid="errors-firstName" className="error">
              {msg}
            </div>
          )}
        />
        <Field
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          className="input"
        />
        <ErrorMessage
          name="lastName"
          render={msg => (
            <div data-testid="errors-lastName" className="error">
              {msg}
            </div>
          )}
        />
        <Field
          type="number"
          name="age"
          placeholder="Enter you age"
          className="input"
        />
        <ErrorMessage
          name="age"
          render={msg => (
            <div data-testid="errors-age" className="error">
              {msg}
            </div>
          )}
        />
        <div className="gender-wrapper">
          <input
            id="male"
            type="radio"
            name="gender"
            value="male"
            onChange={handleChange}
            checked={values.gender === "male" ? true : false}
          />
          <label htmlFor="male"> Male</label>
          <input
            id="female"
            type="radio"
            name="gender"
            value="female"
            onChange={handleChange}
            checked={values.gender === "female" ? true : false}
          />
          <label htmlFor="female"> Female</label>
        </div>

        <ErrorMessage
          name="gender"
          render={msg => (
            <div data-testid="errors-gender" className="error">
              {msg}
            </div>
          )}
        />
        <Field name="phoneNumber" component={PhoneInput} />
        <ErrorMessage
          name="phoneNumber"
          render={msg => (
            <div data-testid="errors-phoneNumber" className="error">
              {msg}
            </div>
          )}
        />

        <MySelect
          value={values.destination}
          onChange={setFieldValue}
          onBlur={handleBlur}
          error={errors.destination}
          touched={touched.destination}
        />

        <div className="dietary-restrictions-wrapper">
          <Field
            id="isVegan"
            type="checkbox"
            name="dietaryRestrictions.isVegan"
            checked={values.dietaryRestrictions.isVegan}
          />
          <label htmlFor="isVegan"> Are you vegan?</label>
          <br />
          <Field
            id="isKosher"
            type="checkbox"
            name="dietaryRestrictions.isKosher"
            checked={values.dietaryRestrictions.isKosher}
          />
          <label htmlFor="isKosher"> Do you want kosher food?</label>
          <br />
          <Field
            id="isLactoseFree"
            type="checkbox"
            name="dietaryRestrictions.isLactoseFree"
            checked={values.dietaryRestrictions.isLactoseFree}
          />
          <label htmlFor="isLactoseFree"> Can you handle Lactose?</label>
          <br />
          <Field
            id="other"
            type="checkbox"
            name="dietaryRestrictions.other.isOther"
            checked={values.dietaryRestrictions.other.isOther}
          />
          <label htmlFor="other"> inne:</label>
          {values.dietaryRestrictions.other.isOther ? (
            <React.Fragment>
              <br />
              <br />
              <Field
                className="other"
                type="text"
                name="dietaryRestrictions.other.value"
                placeholder="Write anything we should know about your dietary restrictions"
              />
              {!!errors.other &&
                (touched
                  ? touched.dietaryRestrictions
                    ? touched.dietaryRestrictions.other
                      ? touched.dietaryRestrictions.other.value
                      : false
                    : false
                  : false) && (
                  <div
                    data-testid="errors-other-value"
                    style={{ color: "red", marginTop: ".5rem" }}
                  >
                    {errors.other}
                  </div>
                )}
            </React.Fragment>
          ) : null}
          <ErrorMessage
            name="dietaryRestrictions"
            render={msg => (
              <div data-testid="errors-dietaryRestrictions" className="error">
                {msg}
              </div>
            )}
          />
        </div>
        <div className="todosLabel">Things you wish to not forget:</div>
        <FieldArray
          name="todos"
          render={arrayHelpers => (
            <div>
              {values.todos && values.todos.length > 0 ? (
                values.todos.map((todo, index) => (
                  <div key={index}>
                    {index > 2 ? (
                      <Field
                        name={`todos.${index}`}
                        style={{
                          width: "300px",
                          backgroundColor: "lightgray"
                        }}
                        placeholder="no no no look down!"
                        disabled
                      />
                    ) : (
                      <Field
                        style={{ width: "300px" }}
                        name={`todos.${index}`}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => arrayHelpers.insert(index + 1, "")}
                    >
                      +
                    </button>
                    {errors && touched ? (
                      errors.todos && touched.todos ? (
                        errors.todos[index] && touched.todos[index] ? (
                          <div
                            data-testid={`errors-todos-${index}`}
                            style={{ color: "red", marginTop: ".5rem" }}
                          >
                            {errors.todos[index]}
                          </div>
                        ) : null
                      ) : null
                    ) : null}
                  </div>
                ))
              ) : (
                <button type="button" onClick={() => arrayHelpers.push("")}>
                  Add a thing
                </button>
              )}
            </div>
          )}
        />
        {errors && touched ? (
          errors.todo && touched.todos ? (
            <div
              data-testid="errors-todo"
              style={{ color: "red", marginTop: ".5rem" }}
            >
              {errors.todo}
            </div>
          ) : null
        ) : null}

        <ErrorMessage
          name="todosEmpty"
          render={msg => (
            <div data-testid="errors-todosEmpty" className="error">
              {msg}
            </div>
          )}
        />
        <button
          type="button"
          className="outline"
          onClick={handleReset}
          disabled={!dirty || isSubmitting}
        >
          Reset
        </button>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>

        <DisplayFormikState {...props} />
      </Form>

      <input type="number" data-testid="testnumber" defaultValue="0" />
    </div>
  );
};

function CustomFormValidate(MyForm, props) {
  const { values, errors } = props;
  // console.log(props);
  if (
    values.todos.length > 0 &&
    values.todos.reduce((prev, curr) => prev + curr) === ""
  ) {
    errors.todosEmpty = "nie mozesz zostawic inputow pustych ;)";
  }
  let newProps = { ...props, errors };

  return <MyForm {...newProps} />;
}

// //   values, props) => {
// //   let todo = {};
// //   console.log(props);
// //   if (
// //     values.todos.length > 0 &&
// //     values.todos.reduce((prev, curr) => prev + curr) === ""
// //   ) {
// //     todo = "nie mozesz zostawic inputow pustych ;)";
// //   }
// //   return { ...props.errors, todo };
// // };

function App() {
  const [initialValues, setInitialValues] = useState(blankValues);

  const fetchInitialValues = () => {
    setInitialValues({ ...fetchedInitialValues });
  };
  return (
    <div className="app">
      <h1>My First Formik Form </h1>

      <Formik
        fetchInitialValues={fetchInitialValues}
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
        enableReinitialize={true}
        render={props => CustomFormValidate(MyForm, props)}
      />

      <button onClick={fetchInitialValues}>CLICK ME IM SERVER</button>
      <button>Im state values</button>
    </div>
  );
}
export default App;
