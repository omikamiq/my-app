import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import "./ToDoListItem.css";

export default class ToDoListItem extends React.Component {
  state = {
    createdTimeAgo: formatDistanceToNow(this.props.createdTimeAgo, {
      includeSeconds: true,
    }),
  };
  tick() {
    this.setState({
      createdTimeAgo: formatDistanceToNow(this.props.createdTimeAgo, {
        includeSeconds: true,
      }),
    });
  }
  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 2000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  render() {
    const {
      label,
      onDelete,
      onToggleImportant,
      onToggleDone,
      important,
      done,
    } = this.props;
    let classNames = "todo-list-item";

    if (done) {
      classNames += " done";
    }
    if (important) {
      classNames += " important";
    }
    return (
      <span className={classNames}>
        <label className="task-check-label">
          <input
            type="checkbox"
            className="checkbox-primary checkbox"
            onClick={onToggleDone}
          ></input>
          <span className="todo-list-item-label">{label}</span>
        </label>
        <div>{this.state.createdTimeAgo}</div>
        <div className="button-wrapper">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={onToggleImportant}
          >
            <i className="fa fa-exclamation"></i>
          </button>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={onDelete}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </span>
    );
  }
}

ToDoListItem.propTypes = {
  label: PropTypes.string,
  onDelete: PropTypes.func,
  onToggleImportant: PropTypes.func,
  onToggleDone: PropTypes.func,
  important: PropTypes.bool,
  done: PropTypes.bool,
};
