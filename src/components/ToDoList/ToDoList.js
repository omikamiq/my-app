import React from 'react'
import PropTypes from 'prop-types'
import ToDoListItem from '../ToDoListItem/ToDoListItem'
import './ToDoList.css'

function ToDoList({
    toDos,
    filter,
    onDelete,
    onToggleImportant,
    onToggleDone,
    onCountdown,
}) {
    const elements = toDos.map((item) => {
        const { label, min, sec, id, important, done, createTime, timer } = item
        let display = 'none'
        if (filter === 'all') {
            display = 'flex'
        } else if (filter === 'done' && done) {
            display = 'flex'
        } else if (filter === 'active' && !done) {
            display = 'flex'
        }

        return (
            <li
                key={id}
                className="list-group-item"
                style={{ display: `${display}` }}
            >
                <ToDoListItem
                    label={label}
                    min={min}
                    sec={sec}
                    timer={timer}
                    important={important}
                    done={done}
                    createTime={createTime}
                    onDelete={() => onDelete(id)}
                    onToggleDone={() => onToggleDone(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onCountdown={(funcTimer) => onCountdown(id, funcTimer)}
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
            min: PropTypes.string,
            sec: PropTypes.string,
            timer: PropTypes.number,
            important: PropTypes.bool,
            done: PropTypes.bool,
            id: PropTypes.number,
        })
    ),
    filter: PropTypes.string,
    onDelete: PropTypes.func,
    onToggleImportant: PropTypes.func,
    onToggleDone: PropTypes.func,
    onCountdown: PropTypes.func,
    timer: PropTypes.number,
}

export default ToDoList
