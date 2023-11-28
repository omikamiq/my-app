import React from 'react'
import PropTypes from 'prop-types'
import './ItemStatusFilter.css'

export default function ItemStatusFilter({
    toDo,
    done,
    deleteAllDone,
    changeFilter,
}) {
    return (
        <div className="item-status-filter-wrapper">
            <span className="progress-line">
                {toDo} more to do, {done} done
            </span>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => changeFilter('all')}
                >
                    All
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => changeFilter('active')}
                >
                    Active
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => changeFilter('done')}
                >
                    Done
                </button>
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={deleteAllDone}
                >
                    Clear all done
                </button>
            </div>
        </div>
    )
}

ItemStatusFilter.propTypes = {
    toDo: PropTypes.number,
    done: PropTypes.number,
    deleteAllDone: PropTypes.func,
    changeFilter: PropTypes.func,
}
