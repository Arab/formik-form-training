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
    values.todos.map((todo, index) => {
      if (todo === "cebula" && index === 0) {
        errors.todos = [];
        errors.todos[index] =
          "No chyba nie bedziesz bral w pierwszej kolejnosci cebuli ;)";
      } else if (todo === "cebula" && index > 0) {
        if (errors.todos) {
          errors.todos[index] = "w ogole nie zabieraj cebuli na poklad";
        } else {
          errors.todos = [];
          errors.todos[index] = "w ogole nie zabieraj cebuli na poklad";
        }
      }
      return null;
    });
  }

  return errors;
};

export { validate };
