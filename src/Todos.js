import React from "react";
import { makeFriendlyObjects } from "./MakeFriendlyObjects";
import CustomField from "./CustomField";
import CustomErrorMessage from "./CustomErrorMessage";

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
              <CustomErrorMessage
                children={todo.error}
                dataTestId={`errors-todos-${index}`}
              />
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
