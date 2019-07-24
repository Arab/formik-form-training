import React, { useState } from "react";
import { DisplayFormikState } from "./helper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MySelect from "./MySelect";
import "./App.css";

const fetchedInitialValues = {
  firstName: "P",
  lastName: "M",
  age: 30,
  gender: "male",
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
  }
};

const blankValues = {
  firstName: "",
  lastName: "",
  age: 0,
  gender: "",
  destination: [],
  dietaryRestrictions: {
    isVegan: false,
    isKosher: false,
    isLactoseFree: false,
    other: {
      isOther: false,
      value: ""
    }
  }
};

const validate = values => {
  let errors = {};
  //first name validation
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length < 3) {
    errors.firstName = "Wysil się imie musi mieć przynajmniej 3 litery";
  } else if (values.firstName !== "Piotr") {
    errors.firstName = "Nah kiepawe imię";
  }
  //last name validation
  if (!values.lastName) {
    errors.lastName = "Required";
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
    console.log(
      values.dietaryRestrictions.isVegan,
      values.dietaryRestrictions.isKosher,
      values.dietaryRestrictions.isLactoseFree,
      values.dietaryRestrictions.other.isOther
    );
    errors.dietaryRestrictions =
      "no nie no w to nie uwierze, wybierz chociaz jedna :P";
  }
  if (
    values.dietaryRestrictions.other.isOther &&
    values.dietaryRestrictions.other.value.length === 0
  ) {
    errors.dietaryRestrictions = "jak juz wybrales inne to cos napisz...";
  }
  if (values.destination.length === 0) {
    errors.destination = "musisz wybrać gdzie chcesz jechać";
  }

  return errors;
};

function App() {
  const [initialValues, setInitialValues] = useState(blankValues);
  const fetchInitialValues = () => {
    console.log("click");
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
      >
        {props => {
          const {
            values,
            touched,
            dirty,
            errors,
            handleChange,
            handleReset,
            setFieldValue,
            setFieldTouched,
            isSubmitting
          } = props;
          return (
            <Form>
              <Field
                type="text"
                name="firstName"
                placeholder="Enter your name"
                className="input"
              />
              <ErrorMessage
                name="firstName"
                render={msg => <div className="error">{msg}</div>}
              />
              <Field
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                className="input"
              />
              <ErrorMessage
                name="lastName"
                render={msg => <div className="error">{msg}</div>}
              />
              <Field
                type="number"
                name="age"
                placeholder="Enter you age"
                className="input"
              />
              <ErrorMessage
                name="age"
                render={msg => <div className="error">{msg}</div>}
              />
              <div className="gender-wrapper">
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  checked={values.gender === "male"}
                />
                <label htmlFor="male"> Male</label>
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  checked={values.gender === "female"}
                />
                <label htmlFor="female"> Female</label>
              </div>

              <MySelect
                value={values.destination}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
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
                <label htmlFor="isVegan"> Do you want kosher food?</label>
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
                    <Field
                      className="other"
                      type="text"
                      name="dietaryRestrictions.other.value"
                      placeholder="Write anything we should know about your dietary restrictions"
                    />
                  </React.Fragment>
                ) : null}
                <ErrorMessage
                  name="dietaryRestrictions"
                  render={msg => <div className="error">{msg}</div>}
                />
              </div>
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
          );
        }}
      </Formik>

      <button onClick={fetchInitialValues}>CLICK ME IM SERVER</button>
      <button onClick={() => console.log(initialValues)}>
        Im state values
      </button>
    </div>
  );
}
export default App;
