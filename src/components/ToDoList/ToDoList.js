import React from "react";
import ToDoListItem from "../ToDoListItem/ToDoListItem";
import PropTypes from "prop-types";
import "./ToDoList.css";

const ToDoList = ({ toDos, onDelete, onToggleImportant, onToggleDone }) => {
  const elements = toDos.map((item) => {
    const { id, ...itemProps } = item;
    console.log(itemProps);
    return (
      <li key={id} className="list-group-item">
        <ToDoListItem
          {...itemProps}
          onDelete={() => onDelete(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleImportant={() => onToggleImportant(id)}
        />
      </li>
    );
  });

  return <ul className="list-group todo-list">{elements}</ul>;
};

ToDoList.propTypes = {
  toDos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      important: PropTypes.bool,
      done: PropTypes.bool,
      id: PropTypes.number,
    })
  ),
  onDelete: PropTypes.func,
  onToggleImportant: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default ToDoList;
