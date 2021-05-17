import React from 'react';
import {filterValueType, TaskType} from "./App";
import AddItemForm from "./AddToDoList";
import EditableSpan from "./EditableSpan";


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
               debugger
                props.changeTaskTitle(newValue, props.id, t.id)}
            const onClickRemove = ()=>{props.removeTask(t.id, props.id)}
            return (
            <li key={t.id}>
            <input type="checkbox" checked={t.isDone} onChange={(e) => props.changeStatus(t.id, e.currentTarget.checked, props.id)}/>
            {/*<span className={t.isDone ? 'is-done' : ''}>{t.title}</span>*/}
            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
            <button onClick={onClickRemove}>Delete</button>
            </li> )
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
            <h3>{props.title} <button onClick={removeToDoList}>x</button></h3>
                <AddItemForm addItem={addItem}/>
                <ul>
                    {tasksJSXElements}
                </ul>
                <div>
                    <button className={props.filter==='all' ? 'active-filter' : ''} onClick={onClickChangeFilterAll}>All</button>
                    <button className={props.filter==='active' ? 'active-filter' : ''} onClick={onClickChangeFilterActive}>Active</button>
                    <button className={props.filter==='completed' ? 'active-filter' : ''} onClick={onClickChangeFilterCompleted}>Completed</button>
                </div>
            </div>
    );
}

export default ToDoList;