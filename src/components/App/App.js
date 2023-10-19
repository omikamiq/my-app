import React from 'react'
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

export default class App extends React.Component {
    maxId = 100

    state = {
        toDoData: [
            this.createToDoItem('Drink coffee'),
            this.createToDoItem('Make awesome App'),
            this.createToDoItem('Have a lunch'),
        ],
        filter: 'all',
    }

    deleteItem = (id) => {
        this.setState(({ toDoData }) => {
            const index = toDoData.findIndex((el) => el.id === id)
            const updatedToDoData = JSON.parse(JSON.stringify(toDoData))
            updatedToDoData.splice(index, 1)
            return {
                toDoData: updatedToDoData,
            }
        })
    }

    addItem = (text) => {
        const newItem = this.createToDoItem(text)
        this.setState(({ toDoData }) => {
            const updatedToDoData = JSON.parse(JSON.stringify(toDoData))
            updatedToDoData.push(newItem)
            return {
                toDoData: updatedToDoData,
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState(({ toDoData }) => ({
            toDoData: toggleProperty(toDoData, id, 'important'),
        }))
    }

    onToggleDone = (id) => {
        this.setState(({ toDoData }) => ({
            toDoData: toggleProperty(toDoData, id, 'done'),
        }))
    }

    deleteAllDone = () => {
        this.setState(({ toDoData }) => {
            const updatedToDoData = JSON.parse(JSON.stringify(toDoData))
            const newData = updatedToDoData.filter((el) => !el.done)
            return {
                toDoData: newData,
            }
        })
    }

    changeFilter = (filter) => {
        this.setState({
            filter,
        })
    }

    createToDoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++,
            createdTimeAgo: new Date().getTime(),
        }
    }

    render() {
        const { toDoData, filter } = this.state
        const doneCount = toDoData.filter((el) => el.done).length
        const toDoCount = toDoData.length - doneCount
        let filteredItems = toDoData
        if (filter === 'all') {
            filteredItems = toDoData
        } else if (filter === 'done') {
            filteredItems = toDoData.filter((task) => task.done)
        } else if (filter === 'active') {
            filteredItems = toDoData.filter((task) => !task.done)
        }

        return (
            <>
                <AppHeader />
                <AddNewTaskPanel onAdd={this.addItem} />
                <ItemStatusFilter
                    toDo={toDoCount}
                    done={doneCount}
                    deleteAllDone={this.deleteAllDone}
                    changeFilter={this.changeFilter}
                />
                <ToDoList
                    toDos={filteredItems}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                    selectAll={this.selectAll}
                    selectActive={this.selectActive}
                    selectDone={this.selectDone}
                />
            </>
        )
    }
}
