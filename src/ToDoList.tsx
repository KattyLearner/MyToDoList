import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValueType, TaskType} from "./App";

export type ToDoListPropsType = {
    title: string
    tasks: TaskType[]
    filter: filterValueType
    removeTask: (taskID: string, toDoListId: string) => void
    changeFilter: (value: filterValueType, toDoListId: string) => void
    addTask: (title: string, toDoListId: string) => void
    changeStatus: (taskID: string, isDone: boolean, toDoListId: string) => void
    removeToDoList: (toDoListId: string) => void
    id: string
}

function ToDoList (props: ToDoListPropsType) {
        const tasksJSXElements = props.tasks.map((t) => {
            const onClickRemove = ()=>{props.removeTask(t.id, props.id)}
            return (
            <li key={t.id}>
            <input type="checkbox" checked={t.isDone} onChange={(e) => props.changeStatus(t.id, e.currentTarget.checked, props.id)}/>
            <span className={t.isDone ? 'is-done' : ''}>{t.title}</span>
            <button onClick={onClickRemove}>Delete</button>
            </li> )
        } )
    const [error, setError] = useState<string | null>(null)

    const onClickAdd = () => {
            if (value.trim() !== '') {
            props.addTask(value.trim(), props.id)
            setValue('')}
            else {
               setError('Field is required')
            }
                }


    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>)=>{setValue(e.currentTarget.value)}
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
            setError(null)
            if (e.key === 'Enter') {onClickAdd()}}
    const onClickChangeFilterAll = ()=> {props.changeFilter('all', props.id)}
    const onClickChangeFilterActive = ()=> {props.changeFilter('active', props.id)}
    const onClickChangeFilterCompleted = ()=> {props.changeFilter('completed', props.id)}

    const [value, setValue] = useState('')
    const removeToDoList = () => {
            props.removeToDoList(props.id)
    }
    return  (
        <div>
            <h3>{props.title} <button onClick={removeToDoList}>x</button></h3>
                <div>
                    <input
                        className={error ? 'error' : ''}
                        value={value}
                        onChange={onChangeInputValue}
                        onKeyPress={onKeyPressAddTask}/>
                    <button onClick={onClickAdd}>+</button>
                    <div className={error ? 'error-message' : ''}>{error}</div>
                </div>
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