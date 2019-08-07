import React from "react";
import { DisplayFormikState } from "./helper";
import { Form, Field, FieldArray } from "formik";
import { makeFriendlyObjects } from "./MakeFriendlyObjects";
import MySelect from "./MySelect";
import PhoneInput from "./PhoneInput";
import MyErrorMessage from "./MyErrorMessage";
import Todos from "./Todos";
import CustomErrorMessage from "./CustomErrorMessage";

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
    otherInput
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
        <div>
          <Field
            id="isVegan"
            type="checkbox"
            name="dietaryRestrictions.isVegan"
            checked={vegan.value}
          />
          <label className="dietaryRestriction__label" htmlFor="isVegan">
            {" "}
            Are you vegan?
          </label>
        </div>
        <div>
          <Field
            id="isKosher"
            type="checkbox"
            name="dietaryRestrictions.isKosher"
            checked={kosher.value}
          />
          <label className="dietaryRestriction__label" htmlFor="isKosher">
            {" "}
            Do you want kosher food?
          </label>
        </div>
        <div>
          <Field
            id="isLactoseFree"
            type="checkbox"
            name="dietaryRestrictions.isLactoseFree"
            checked={lactose.value}
          />
          <label className="dietaryRestriction__label" htmlFor="isLactoseFree">
            {" "}
            Can you handle Lactose?
          </label>
        </div>
        <div>
          <Field
            id="other"
            type="checkbox"
            name="dietaryRestrictions.other.isOther"
            checked={other.value}
          />
          <label className="dietaryRestriction__label" htmlFor="other">
            {" "}
            inne:
          </label>
        </div>
        <div>
          {other.value && (
            <div className="other__input">
              <Field
                className="other"
                type="text"
                name="dietaryRestrictions.other.value"
                placeholder="Write anything we should know about your dietary restrictions"
              />
              {otherInput.error && otherInput.touched && (
                <CustomErrorMessage
                  children={otherInput.error}
                  dataTestId="errors-other-value"
                />
              )}
            </div>
          )}
        </div>
        <MyErrorMessage
          dataTestId="errors-dietaryRestrictions"
          name="dietaryRestrictions"
        />
      </div>
      <div>
        <div className="todosLabel">Things you wish to not forget:</div>
        <FieldArray name="todos" component={Todos} />
        {errors.todo && touched.todos && (
          <CustomErrorMessage children={errors.todo} dataTestId="errors-todo" />
        )}
      </div>
      <MyErrorMessage dataTestId="errors-todosEmpty" name="todosEmpty" />
      <div>
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
      </div>

      <DisplayFormikState {...props} />
    </Form>
  );
};

export default MyForm;
