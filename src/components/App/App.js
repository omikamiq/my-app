import React, { useState } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import ToDoList from '../ToDoList/ToDoList'
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter'
import AddNewTaskPanel from '../AddNewTaskPanel/AddNewTaskPanel'

const toggleProperty = (arr, id, propName) => {
    const index = arr.findIndex((el) => el.id === id)
    const updatedArr = JSON.parse(JSON.stringify(arr))
    updatedArr[index][propName] = !updatedArr[index][propName]
    return updatedArr
}

export default function App() {
    let maxId = 100

    const createToDoItem = (label, min, sec) => {
        const createTime = new Date().getTime()
        return {
            label,
            min: min || '00',
            sec: sec || '00',
            important: false,
            done: false,
            id: maxId++,
            createTime,
            timer: createTime + (+min * 60 + +sec) * 1000,
        }
    }

    const [filter, setFilter] = useState('all')
    const [toDoData, setToDoData] = useState([
        createToDoItem('Drink coffee'),
        createToDoItem('Make awesome App'),
        createToDoItem('Have a lunch'),
    ])
    const onToggleImportant = (id) => {
        setToDoData((prevToDoData) =>
            toggleProperty(prevToDoData, id, 'important')
        )
    }

    const onToggleDone = (id) => {
        setToDoData((prevToDoData) => toggleProperty(prevToDoData, id, 'done'))
    }

    const onCountdown = (id, timer) => {
        setToDoData((prevToDoData) => {
            const index = prevToDoData.findIndex((el) => el.id === id)
            const updatedToDoData = JSON.parse(JSON.stringify(prevToDoData))
            updatedToDoData[index].timer = timer
            return updatedToDoData
        })
    }

    const deleteItem = (id) => {
        setToDoData((prevToDoData) => {
            const index = prevToDoData.findIndex((el) => el.id === id)
            const updatedToDoData = JSON.parse(JSON.stringify(prevToDoData))
            updatedToDoData.splice(index, 1)
            return updatedToDoData
        })
    }

    const addItem = (text, min, sec) => {
        const newItem = createToDoItem(text, min, sec)
        setToDoData((prevToDoData) => {
            const updatedToDoData = JSON.parse(JSON.stringify(prevToDoData))
            updatedToDoData.push(newItem)
            return updatedToDoData
        })
    }

    const deleteAllDone = () => {
        setToDoData((prevToDoData) => {
            const updatedToDoData = JSON.parse(JSON.stringify(prevToDoData))
            const newData = updatedToDoData.filter((el) => !el.done)
            return newData
        })
    }

    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }

    const doneCount = toDoData.filter((el) => el.done).length
    const toDoCount = toDoData.length - doneCount

    return (
        <>
            <AppHeader />
            <AddNewTaskPanel onAdd={addItem} />
            <ItemStatusFilter
                toDo={toDoCount}
                done={doneCount}
                deleteAllDone={deleteAllDone}
                changeFilter={changeFilter}
            />
            <ToDoList
                toDos={toDoData}
                filter={filter}
                onDelete={deleteItem}
                onToggleImportant={onToggleImportant}
                onToggleDone={onToggleDone}
                onCountdown={(id, timer) => onCountdown(id, timer)}
            />
        </>
    )
}
