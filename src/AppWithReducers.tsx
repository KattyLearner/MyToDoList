import React, {useReducer, useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import todolistsReducer, {addTodoListAC, changeTodoListFilterAC, removeTodoListAC} from "./store/todoListReducer";
import tasksReducer, {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/taskReducer";
import {act} from "react-dom/test-utils";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type ToDoListType = {
    id: string
    title: string
    filter: filterValueType
}

export type filterValueType = 'all' | 'completed' | 'active'

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    function changeFilter (value: filterValueType, toDoListId: string) {
        const action = changeTodoListFilterAC(value, toDoListId)
        dispatchToDoList(action)
    }
    function removeTask (taskID: string, toDoListId: string) {
        const action = removeTaskAC(taskID, toDoListId)
        dispatchTasksData(action)
    }

    function addTask (title: string, toDoListId: string) {
        const action = addTaskAC(title, toDoListId)
        dispatchTasksData(action)
    }

    function changeStatus (taskID: string, isDone: boolean, toDoListId: string) {
        const action = changeTaskStatusAC(taskID, isDone, toDoListId)
        dispatchTasksData(action)
    }

    function changeTaskTitle (newValue: string, toDoListId: string, taskID: string) {
        const action = changeTaskTitleAC(newValue, toDoListId, taskID)
        dispatchTasksData(action)
    }

    let removeToDoList = (toDoListId: string) =>{
        const action = removeTodoListAC(toDoListId)
        dispatchToDoList(action)
        dispatchTasksData(action)
    }

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [toDoLists, dispatchToDoList] = useReducer(todolistsReducer,[
        {id: todoListID1, title: 'What to learn', filter: 'active'},
        {id: todoListID2, title: 'What to buy', filter: 'completed'},
    ])

    let [tasksData, dispatchTasksData] = useReducer(tasksReducer, {
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
        const action = addTodoListAC(title)
        dispatchToDoList(action)
        dispatchTasksData(action)
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

export default AppWithReducers;
