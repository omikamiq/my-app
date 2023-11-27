import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './ToDoListItem.css'

export default function ToDoListItem({
    createTime,
    onCountdown,
    timer,
    label,
    onDelete,
    onToggleImportant,
    onToggleDone,
    important,
    done,
}) {
    const [timeFromCreate, setTimeFromCreate] = useState(
        formatDistanceToNow(createTime, {
            includeSeconds: true,
        })
    )

    const [tickTimerId, setTickTimerId] = useState(0)

    const [countdownTimerId, setCountdownTimerId] = useState(0)

    const tick = () => {
        setTimeFromCreate(
            formatDistanceToNow(createTime, {
                includeSeconds: true,
            })
        )
    }

    const countdown = () => {
        if (timer > createTime) {
            onCountdown(timer - 1000)
        } else {
            clearInterval(countdownTimerId)
            setCountdownTimerId(0)
        }
    }

    useEffect(() => {
        setTickTimerId(setInterval(() => tick(), 2000))
        setCountdownTimerId(setInterval(() => countdown(), 1000))
        return () => {
            clearInterval(tickTimerId)
            setTickTimerId(0)
            clearInterval(countdownTimerId)
            setCountdownTimerId(0)
        }
    }, [timer])

    const onPlayClick = () => {
        if (countdownTimerId > 0) {
            clearInterval(countdownTimerId)
            setCountdownTimerId(0)
        }
        setCountdownTimerId(setInterval(() => countdown(), 1000))
    }

    const onStopClick = () => {
        if (countdownTimerId > 0) {
            clearInterval(countdownTimerId)
            setCountdownTimerId(0)
        }
    }

    const minRemaining = Math.trunc((timer - createTime) / 60000)
    const secRemaining = ((timer - createTime) % 60000) * 0.001
    const additionalMinZero = minRemaining < 10 ? '0' : ''
    const additionalSecZero = secRemaining < 10 ? '0' : ''
    let className = 'todo-list-item'

    if (done) {
        className += ' done'
    }
    if (important) {
        className += ' important'
    }
    return (
        <span className={className}>
            <label className="task-check-label">
                <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                    onClick={() => {
                        onToggleDone()
                        clearInterval(countdownTimerId)
                        setCountdownTimerId(0)
                    }}
                />
                <span className="todo-list-item-label">{label}</span>
            </label>
            <div className="timer-wrapper">
                <div className="timer">
                    {`${additionalMinZero}${minRemaining}:${additionalSecZero}${secRemaining}`}
                </div>
                <button
                    className="btn btn-play btn-outline-success"
                    type="button"
                    onClick={() => onPlayClick()}
                >
                    <div className="play-icon first" />
                    <div className="play-icon second" />
                    <div className="play-icon third" />
                </button>
                <button
                    className="btn btn-stop btn-outline-danger"
                    type="button"
                    onClick={() => onStopClick()}
                >
                    <div className="stop-icon" />
                    <div className="stop-icon" />
                </button>
            </div>

            <div className="time-ago">{timeFromCreate}</div>
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

ToDoListItem.propTypes = {
    label: PropTypes.string,
    min: PropTypes.string,
    sec: PropTypes.string,
    timer: PropTypes.number,
    onDelete: PropTypes.func,
    onToggleImportant: PropTypes.func,
    onToggleDone: PropTypes.func,
    important: PropTypes.bool,
    done: PropTypes.bool,
    filter: PropTypes.string,
    createTime: PropTypes.number,
    onCountdown: PropTypes.func,
}
