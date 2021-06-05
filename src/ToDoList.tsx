import React from 'react';
import {filterValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type ToDoListPropsType = {
    title: string
    tasks: TaskType[]
    filter: filterValueType
    removeTask: (taskID: string, toDoListId: string) => void
    changeFilter: (value: filterValueType, toDoListId: string) => void
    addTask: (title: string, toDoListId: string) => void
    changeStatus: (taskID: string, isDone: boolean, toDoListId: string) => void
    removeToDoList: (toDoListId: string) => void
    changeTaskTitle: (newValue: string, toDoListId: string, taskID: string ) => void
    id: string
}

function ToDoList (props: ToDoListPropsType) {
        const tasksJSXElements = props.tasks.map((t) => {
            const onChangeTitleHandler = (newValue: string) => {
                props.changeTaskTitle(newValue, props.id, t.id)}
            const onClickRemove = ()=>{props.removeTask(t.id, props.id)}
            return (
            <div key={t.id}>
            <Checkbox checked={t.isDone} onChange={(e) => props.changeStatus(t.id, e.currentTarget.checked, props.id)}/>
            {/*<span className={t.isDone ? 'is-done' : ''}>{t.title}</span>*/}
            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickRemove} aria-label="delete">
                <Delete />
            </IconButton>
            </div> )
        } )

    const onClickChangeFilterAll = ()=> {props.changeFilter('all', props.id)}
    const onClickChangeFilterActive = ()=> {props.changeFilter('active', props.id)}
    const onClickChangeFilterCompleted = ()=> {props.changeFilter('completed', props.id)}

    const removeToDoList = () => {
            props.removeToDoList(props.id)
    }
    const addItem = (title: string) => {
        props.addTask(title, props.id)
    }


    return  (
        <div>
            <h3>
                {props.title}
                <IconButton onClick={removeToDoList} aria-label="delete">
                    <Delete />
                </IconButton>
            </h3>

            <AddItemForm addItem={addItem}/>
                <div>
                    {tasksJSXElements}
                </div>
                <div>
                    <Button variant={props.filter==='all' ? "contained" : 'text'} onClick={onClickChangeFilterAll}>All</Button>
                    <Button variant={props.filter==='active' ? "contained" : 'text'} color={"primary"} onClick={onClickChangeFilterActive}>Active</Button>
                    <Button variant={props.filter==='completed' ? "contained" : 'text'} color={"secondary"} onClick={onClickChangeFilterCompleted}>Completed</Button>
                </div>
            </div>
    );
}

export default ToDoList;