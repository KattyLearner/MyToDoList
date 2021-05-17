import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

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
        debugger
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

    function changeTaskTitle (newValue: string, toDoListId: string, taskID: string) {
        debugger
        let tasks = tasksData[toDoListId]
        let task = tasks.find(t=> t.id === taskID)
        if (task) {
            task.title= newValue
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

    let [tasksData, setTasksData] = useState<TaskStateType>({
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

    function addToDoList (title: string) {
        let todoList: ToDoListType = {
            id: v1(),
            filter: 'all',
            title
        }
        setToDoList([todoList, ...toDoLists])
        setTasksData({
            ...tasksData, [todoList.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        ToDoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem ={addToDoList} />
                </Grid>
                <Grid container spacing={3}>
            {toDoLists.map((td)=>{
                let taskForToDoList = tasksData[td.id]
                if (td.filter === 'active') {
                    taskForToDoList = tasksData[td.id].filter(t => t.isDone === false)
                }
                if (td.filter === 'completed') {
                    taskForToDoList= tasksData[td.id].filter(t => t.isDone === true)
                }

                return <Grid item>
                    <Paper style = { {padding: '10px'} }>
                <ToDoList title={td.title}
                                 tasks={taskForToDoList}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask = {addTask}
                                 changeStatus={changeStatus}
                                 filter = {td.filter}
                                 id={td.id}
                                 key = {td.id}
                                 removeToDoList = {removeToDoList}
                                 changeTaskTitle={changeTaskTitle}
                />
                    </Paper>
                </Grid>
            })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
