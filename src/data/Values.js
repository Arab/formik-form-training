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

export { blankValues, fetchedInitialValues };
