import React from 'react'
import PropTypes from 'prop-types'
import ToDoListItem from '../ToDoListItem/ToDoListItem'
import './ToDoList.css'

function ToDoList({ toDos, onDelete, onToggleImportant, onToggleDone }) {
    const elements = toDos.map((item) => {
        const { label, id, important, done, createdTimeAgo } = item
        return (
            <li key={id} className="list-group-item">
                <ToDoListItem
                    label={label}
                    important={important}
                    done={done}
                    createdTimeAgo={createdTimeAgo}
                    onDelete={() => onDelete(id)}
                    onToggleDone={() => onToggleDone(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                />
            </li>
        )
    })

    return <ul className="list-group todo-list">{elements}</ul>
}

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
}

export default ToDoList
