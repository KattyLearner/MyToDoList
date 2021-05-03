import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TaskDataType = TaskType[]

export type filterValueType = 'all' | 'completed' | 'active'

function App() {

    const [tasksData, setTasksData] = useState<TaskDataType>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Storybook', isDone: false},
    ])
    const [filterValue, setFilterValue] = useState<filterValueType>('all')

    let taskForToDoList = tasksData
    if (filterValue === 'active') {
        taskForToDoList = tasksData.filter(t => t.isDone === false)
    }
    if (filterValue === 'completed') {
        taskForToDoList= tasksData.filter(t => t.isDone === true)
    }

    function changeFilter (value: filterValueType) {
        setFilterValue(value)
    }
    function removeTask (taskID: string) {
        setTasksData(tasksData.filter(t => t.id !== taskID))
    }

    function addTask (title: string) {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasksData([newTask, ...tasksData])
    }

    function changeStatus (taskID: string, isDone: boolean) {
        let task = tasksData.find(t=> t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasksData([...tasksData])
        }
    }
    return (
        <div className="App">
           <ToDoList title={'What to learn'}
                     tasks={taskForToDoList}
                     removeTask={removeTask}
                     changeFilter={changeFilter}
                     addTask = {addTask}
                     changeStatus={changeStatus}
                     filter = {filterValue}
           />
        </div>
    );
}

export default App;
