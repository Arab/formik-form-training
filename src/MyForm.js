import React from "react";
import { DisplayFormikState } from "./helper";
import { Form, Field, ErrorMessage, FieldArray } from "formik";
import MySelect from "./MySelect";
import PhoneInput from "./PhoneInput";

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
        placeholder="Enter your age"
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
          <>
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
          </>
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
                    <Field style={{ width: "300px" }} name={`todos.${index}`} />
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
                </div> // tu wiesz
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
      {/* tu tez wiesz ^ */}
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
      {/* <input
          type="number"
          data-testid="test1"
          onChange={e => {
            e.persist();
            console.log(e);
          }}
          onInput={e => {
            e.persist();
            console.log(e);
          }}
          onKeyDown={e => {
            e.persist();
            console.log(e);
          }}
          onKeyUp={e => {
            e.persist();
            console.log(e);
          }}
          value="0"
        /> */}
    </Form>
  );
};

export default MyForm;
