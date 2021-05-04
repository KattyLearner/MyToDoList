import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

// type TaskDataType = TaskType[]

type ToDoListType = {
    id: string
    title: string
    filter: filterValueType
}

export type filterValueType = 'all' | 'completed' | 'active'

function App() {

    // const [tasksData, setTasksData] = useState<TaskDataType>([
    //     {id: v1(), title: 'HTML', isDone: true},
    //     {id: v1(), title: 'CSS', isDone: false},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'React', isDone: false},
    //     {id: v1(), title: 'Redux', isDone: false},
    //     {id: v1(), title: 'Storybook', isDone: false},
    // ])
    // const [filterValue, setFilterValue] = useState<filterValueType>('all')

    function changeFilter (value: filterValueType, toDoListId: string) {
        let todoList = toDoLists.find(tl=> tl.id === toDoListId)
        if (todoList){
            todoList.filter = value
            setToDoList([...toDoLists])
        }
    }
    function removeTask (taskID: string, toDoListId: string) {
        let tasks = tasksData[toDoListId]
        let filteredTasks = tasks.filter(t => t.id !== taskID)
        tasksData[toDoListId] = filteredTasks
        setTasksData({...tasksData})
    }

    function addTask (title: string, toDoListId: string) {
        const newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksData[toDoListId]
        let newTasks = [newTask, ...tasks]
        tasksData[toDoListId] = newTasks
        setTasksData({...tasksData})
    }

    function changeStatus (taskID: string, isDone: boolean, toDoListId: string) {
        let tasks = tasksData[toDoListId]
        let task = tasks.find(t=> t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasksData({...tasksData})
        }
    }

    let removeToDoList = (toDoListId: string) =>{
        let filteredToDoList = toDoLists.filter(tl=>tl.id !== toDoListId )
        setToDoList(filteredToDoList)

        delete tasksData[toDoListId]
        setTasksData({...tasksData})
    }

    let todoListID1 = v1()
    let todoListID2 = v1()

let [toDoLists, setToDoList] = useState<Array<ToDoListType>>([
    {id: todoListID1, title: 'What to learn', filter: 'active'},
    {id: todoListID2, title: 'What to buy', filter: 'completed'},
])

    let [tasksData, setTasksData] = useState({
        [todoListID1]: [{id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Storybook', isDone: false}],
        [todoListID2]: [
            {id: v1(), title: 'milk', isDone: false},
            {id: v1(), title: 'orange', isDone: true},
            {id: v1(), title: 'apple', isDone: false},
            {id: v1(), title: 'meet', isDone: false},
           ]
    })

    return (
        <div className="App">
            {toDoLists.map((td)=>{
                let taskForToDoList = tasksData[td.id]
                if (td.filter === 'active') {
                    taskForToDoList = tasksData[td.id].filter(t => t.isDone === false)
                }
                if (td.filter === 'completed') {
                    taskForToDoList= tasksData[td.id].filter(t => t.isDone === true)
                }
                return <ToDoList title={td.title}
                                 tasks={taskForToDoList}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask = {addTask}
                                 changeStatus={changeStatus}
                                 filter = {td.filter}
                                 id={td.id}
                                 key = {td.id}
                                 removeToDoList = {removeToDoList}
                />
            })}
           {/*<ToDoList title={'What to learn'}*/}
           {/*          tasks={taskForToDoList}*/}
           {/*          removeTask={removeTask}*/}
           {/*          changeFilter={changeFilter}*/}
           {/*          addTask = {addTask}*/}
           {/*          changeStatus={changeStatus}*/}
           {/*          filter = {filterValue}*/}
           {/*/>*/}
        </div>
    );
}

export default App;
