import React, { useState } from "react";
import { Formik } from "formik";
import MyForm from "./MyForm";

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

function CustomFormValidate(MyForm, props) {
  const { values, errors } = props;
  // console.log(props);
  if (values.todos.length > 0 && !values.todos.some(item => item)) {
    errors.todosEmpty = "nie mozesz zostawic inputow pustych ;)";
  }
  const newProps = { ...props, errors };

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
