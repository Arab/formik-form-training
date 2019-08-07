import React from "react";
import { makeFriendlyObjects } from "./MakeFriendlyObjects";
import CustomField from "./CustomField";

const Todos = props => {
  const { remove, insert, push } = props;
  const { values, errors, touched } = props.form;
  const { todos } = makeFriendlyObjects(values, touched, errors);

  const handleRemove = i => () => {
    remove(i);
  };
  const handleInsert = i => () => {
    insert(i + 1, "");
  };
  const handlePush = () => {
    push("");
  };

  return (
    <div>
      {todos && todos.length > 0 ? (
        todos.map((todo, index) => (
          <div key={index}>
            {index > 2 ? (
              <CustomField index={index} disabled />
            ) : (
              <CustomField index={index} />
            )}
            <button type="button" onClick={handleRemove(index)}>
              -
            </button>
            <button type="button" onClick={handleInsert(index)}>
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
          </div>
        ))
      ) : (
        <button type="button" onClick={handlePush}>
          Add a thing
        </button>
      )}
    </div>
  );
};
export default Todos;
