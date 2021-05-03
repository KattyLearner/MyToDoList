import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValueType, TaskType} from "./App";

export type ToDoListPropsType = {
    title: string
    tasks: TaskType[]
    filter: filterValueType
    removeTask: (taskID: string) => void
    changeFilter: (value: filterValueType) => void
    addTask: (title: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
}

function ToDoList (props: ToDoListPropsType) {
        const tasksJSXElements = props.tasks.map((t) => {
            const onClickRemove = ()=>{props.removeTask(t.id)}
            return (
            <li key={t.id}>
            <input type="checkbox" checked={t.isDone} onChange={(e) => props.changeStatus(t.id, e.currentTarget.checked )}/>
            <span className={t.isDone ? 'is-done' : ''}>{t.title}</span>
            <button onClick={onClickRemove}>Delete</button>
            </li> )
        } )
    const [error, setError] = useState<string | null>(null)

    const onClickAdd = () => {
            if (value.trim() !== '') {
            props.addTask(value.trim())
            setValue('')}
            else {
               setError('Field is required')
            }
                }


    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>)=>{setValue(e.currentTarget.value)}
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
            setError(null)
            if (e.key === 'Enter') {onClickAdd()}}
    const onClickChangeFilterAll = ()=> {props.changeFilter('all')}
    const onClickChangeFilterActive = ()=> {props.changeFilter('active')}
    const onClickChangeFilterCompleted = ()=> {props.changeFilter('completed')}


    const [value, setValue] = useState('')
    return  (
        <div>
                <h3>{props.title}</h3>
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
                    <button>new button</button>
                </div>
            </div>
    );
}

export default ToDoList;