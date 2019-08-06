import React from "react";
import { DisplayFormikState } from "./helper";
import { Form, Field, FieldArray } from "formik";
import { makeFriendlyObjects } from "./MakeFriendlyObjects";
import MySelect from "./MySelect";
import PhoneInput from "./PhoneInput";
import MyErrorMessage from "./MyErrorMessage";

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
  const {
    gender,
    vegan,
    kosher,
    lactose,
    other,
    otherInput,
    todos
  } = makeFriendlyObjects(values, touched, errors);

  return (
    <Form>
      <Field
        type="text"
        name="firstName"
        placeholder="Enter your name"
        className="input"
      />
      <MyErrorMessage dataTestId="errors-firstName" name="firstName" />
      <Field
        type="text"
        name="lastName"
        placeholder="Enter your last name"
        className="input"
      />
      <MyErrorMessage dataTestId="errors-lastName" name="lastName" />
      <Field
        type="number"
        name="age"
        placeholder="Enter your age"
        className="input"
      />
      <MyErrorMessage dataTestId="errors-age" name="age" />
      <div className="gender-wrapper">
        <input
          id="male"
          type="radio"
          name="gender"
          value="male"
          onChange={handleChange}
          checked={gender.value === "male"}
        />
        <label htmlFor="male"> Male</label>
        <input
          id="female"
          type="radio"
          name="gender"
          value="female"
          onChange={handleChange}
          checked={gender.value === "female"}
        />
        <label htmlFor="female"> Female</label>
      </div>
      <MyErrorMessage dataTestId="errors-gender" name="gender" />
      <Field name="phoneNumber" component={PhoneInput} />
      <MyErrorMessage dataTestId="errors-phoneNumber" name="phoneNumber" />
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
          checked={vegan.value}
        />
        <label htmlFor="isVegan"> Are you vegan?</label>
        <br />
        <Field
          id="isKosher"
          type="checkbox"
          name="dietaryRestrictions.isKosher"
          checked={kosher.value}
        />
        <label htmlFor="isKosher"> Do you want kosher food?</label>
        <br />
        <Field
          id="isLactoseFree"
          type="checkbox"
          name="dietaryRestrictions.isLactoseFree"
          checked={lactose.value}
        />
        <label htmlFor="isLactoseFree"> Can you handle Lactose?</label>
        <br />
        <Field
          id="other"
          type="checkbox"
          name="dietaryRestrictions.other.isOther"
          checked={other.value}
        />
        <label htmlFor="other"> inne:</label>
        {other.value && (
          <>
            <br />
            <br />
            <Field
              className="other"
              type="text"
              name="dietaryRestrictions.other.value"
              placeholder="Write anything we should know about your dietary restrictions"
            />
            {otherInput.error && otherInput.touched && (
              <div
                data-testid="errors-other-value"
                style={{ color: "red", marginTop: ".5rem" }}
              >
                {otherInput.error}
              </div>
            )}
          </>
        )}
        <MyErrorMessage
          dataTestId="errors-dietaryRestrictions"
          name="dietaryRestrictions"
        />
      </div>
      <div className="todosLabel">Things you wish to not forget:</div>
      <FieldArray
        name="todos"
        render={arrayHelpers => (
          <div>
            {todos && todos.length > 0 ? (
              todos.map((todo, index) => (
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
                  {todo.error && todo.touched && (
                    <div
                      data-testid={`errors-todos-${index}`}
                      style={{ color: "red", marginTop: ".5rem" }}
                    >
                      {todo.error}
                    </div>
                  )}
                </div> // tu wiesz  ---no wiem chyba ale sprawdz
              ))
            ) : (
              <button type="button" onClick={() => arrayHelpers.push("")}>
                Add a thing
              </button>
            )}
          </div>
        )}
      />
      {errors.todo && touched.todos && (
        <div
          data-testid="errors-todo"
          style={{ color: "red", marginTop: ".5rem" }}
        >
          {errors.todo}
        </div>
      )}
      {/* tu tez wiesz ^ */}
      <MyErrorMessage dataTestId="errors-todosEmpty" name="todosEmpty" />
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
};

export default MyForm;
