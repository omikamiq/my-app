import React from "react";
import "./AddNewTaskPanel.css";

export default class AddNewTaskPanel extends React.Component {
  state = {
    label: "",
  };
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    return (
      <form className="add-new-task-form" onSubmit={this.onSubmit}>
        <input
          className="form-control"
          placeholder="What are we going to do?"
          onChange={this.onLabelChange}
          value={this.state.label}
        ></input>
        <button className="btn btn-info btn-info-position">Add new task</button>
      </form>
    );
  }
}
