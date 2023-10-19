import React from 'react'
import PropTypes from 'prop-types'
import './AddNewTaskPanel.css'

export default class AddNewTaskPanel extends React.Component {
    state = {
        label: '',
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        })
    }

    onSubmit = (e) => {
        const { label } = this.state
        e.preventDefault()
        this.props.onAdd(label)
        this.setState({
            label: '',
        })
    }

    render() {
        const { label } = this.state
        return (
            <form className="add-new-task-form" onSubmit={this.onSubmit}>
                <input
                    className="form-control"
                    placeholder="What are we going to do?"
                    onChange={this.onLabelChange}
                    value={label}
                />
                <button
                    type="submit"
                    className="btn btn-info btn-info-position"
                >
                    Add new task
                </button>
            </form>
        )
    }
}

AddNewTaskPanel.propTypes = {
    onAdd: PropTypes.func,
}
