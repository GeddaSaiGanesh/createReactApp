import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from "@mui/material/Checkbox";

import "./index.css";

const TodoApp = (props) => {
  const [todoList, setTodoList] = useState([]);
  const [text, setText] = useState("");
  const [type, setType] = useState("All");

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };
  const eventHandler = (event) => {
    if (event.key === "Enter") {
      const newTask = {
        id: uuidv4(),
        isDone: false,
        text,
      };
      setTodoList((old) => [newTask, ...old]);
      setText("");
    }
  };

  const selectAllHandler = () => {
    setTodoList((old) =>
      old.map((eachItem) => ({ ...eachItem, isDone: true }))
    );
  };

  return (
    <div className="bgContainer">
      <h1 className="heading">Todo's</h1>
      <div className="inputField-container">
        <button type="button" onClick={selectAllHandler}>
          <ExpandMoreIcon color="primary" />
        </button>
        <input
          type="text"
          value={text}
          onChange={onChangeHandler}
          placeholder="What need to be done?"
          onKeyDown={eventHandler}
        />
      </div>
      <ul className="todoListItems-container">
        {todoList
          .filter((each) => {
            if (type === "Active") return !each.isDone;
            if (type === "Completed") return each.isDone;
            return true;
          })
          .map((eachTask) => (
            <li>
              <div className="item-card">
                <button
                  onClick={() =>
                    setTodoList((old) =>
                      old.map((eachItem) => {
                        if (eachTask.id === eachItem.id) {
                          return { ...eachItem, isDone: !eachItem.isDone };
                        }
                        return eachItem;
                      })
                    )
                  }
                >
                  <Checkbox
                    checked={eachTask.isDone}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </button>
                <p className={eachTask.isDone ? "mark" : ""}>{eachTask.text}</p>
              </div>
              <button
                className="delete-button"
                onClick={() =>
                  setTodoList((old) =>
                    old.filter((eachTodo) => eachTask.id !== eachTodo.id)
                  )
                }
              >
                <ClearIcon color="primary" />
              </button>
            </li>
          ))}
      </ul>
      <div className="footer-container">
        <p>
          {todoList.filter((eachTodo) => !eachTodo.isDone).length} item left
        </p>
        <div className="btn">
          <button type="button" className={type === "" ? "btn-border" : " "}  onClick={() => setType("")}>
            All
          </button>
          <button
            className={type === "Active" ? "btn-border" : " "}
            type="button"
            onClick={() => setType("Active")}
          >
            Active
          </button>
          <button
            type="button"
            className={type === "Completed" ? "btn-border" : " "}
            onClick={() => setType("Completed")}
          >
            Completed
          </button>
        </div>
        <button
          type="button"
          onClick={() =>
            setTodoList((old) => old.filter((eachTask) => !eachTask.isDone))
          }
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoApp;
