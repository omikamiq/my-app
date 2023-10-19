import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './ToDoListItem.css'

export default class ToDoListItem extends React.Component {
    state = {
        createdTimeAgo: formatDistanceToNow(this.props.createdTimeAgo, {
            includeSeconds: true,
        }),
    }

    componentDidMount() {
        this.timerId = setInterval(() => this.tick(), 2000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    tick() {
        const { createdTimeAgo } = this.props
        this.setState({
            createdTimeAgo: formatDistanceToNow(createdTimeAgo, {
                includeSeconds: true,
            }),
        })
    }

    render() {
        const {
            label,
            onDelete,
            onToggleImportant,
            onToggleDone,
            important,
            done,
        } = this.props
        const { createdTimeAgo } = this.state
        let classNames = 'todo-list-item'

        if (done) {
            classNames += ' done'
        }
        if (important) {
            classNames += ' important'
        }
        return (
            <span className={classNames}>
                <label className="task-check-label">
                    <input
                        type="checkbox"
                        className="checkbox-primary checkbox"
                        onClick={onToggleDone}
                    />
                    <span className="todo-list-item-label">{label}</span>
                </label>
                <div>{createdTimeAgo}</div>
                <div className="button-wrapper">
                    <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={onToggleImportant}
                    >
                        <i className="fa fa-exclamation" />
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={onDelete}
                    >
                        <i className="fa fa-trash-o" />
                    </button>
                </div>
            </span>
        )
    }
}

ToDoListItem.propTypes = {
    label: PropTypes.string,
    onDelete: PropTypes.func,
    onToggleImportant: PropTypes.func,
    onToggleDone: PropTypes.func,
    important: PropTypes.bool,
    done: PropTypes.bool,
    createdTimeAgo: PropTypes.number,
}
