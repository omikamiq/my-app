import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './AddNewTaskPanel.css'

export default function AddNewTaskPanel({ onAdd }) {
    const [label, setLabel] = useState('')
    const [min, setMin] = useState('')
    const [sec, setSec] = useState('')

    const onLabelChange = (e) => {
        setLabel(e.target.value)
    }

    const onMinChange = (e) => {
        setMin(e.target.value || 0)
    }

    const onSecChange = (e) => {
        setSec(e.target.value || 0)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (+min < 60 && +min >= 0 && +sec < 60 && +sec >= 0)
            onAdd(label, min, sec)
        else {
            setLabel('')
            setMin('')
            setSec('')
        }

        setLabel('')
        setMin('')
        setSec('')
    }

    return (
        <form className="add-new-task-form" onSubmit={onSubmit}>
            <input
                className="form-control"
                placeholder="Task name"
                onChange={onLabelChange}
                value={label}
            />
            <input
                type="number"
                className="form-control min"
                placeholder="min"
                onChange={onMinChange}
                value={min}
            />
            <input
                type="number"
                className="form-control sec"
                placeholder="sec"
                onChange={onSecChange}
                value={sec}
            />
            <button type="submit" className="btn btn-info btn-info-position">
                Add new task
            </button>
        </form>
    )
}

AddNewTaskPanel.propTypes = {
    onAdd: PropTypes.func,
}
