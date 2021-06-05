import {filterValueType, TaskStateType, ToDoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todoListReducer";


type RemoveTaskAT = {
    type: 'REMOVE_TASK'
    taskID: string
    toDoListId: string
}
type AddTaskAT = {
    type: 'ADD_TASK'
    title: string
    toDoListId: string
}
type ChangeTaskStatusAT = {
    type: 'CHANGE_TASK_STATUS'
    taskID: string
    isDone: boolean
    toDoListId: string
}
type ChangeTaskTitleAT = {
    type: 'CHANGE_TASK_TITLE'
    newValue: string
    toDoListId: string
    taskID: string
}

type UnionTaskType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'

const initialState: TaskStateType = {}

export const tasksReducer = (tasksData: TaskStateType = initialState, action: UnionTaskType) => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...tasksData,
                [action.toDoListId]: tasksData[action.toDoListId].filter((t)=> t.id != action.taskID)
            };
        case 'ADD_TASK':
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...tasksData,
                [action.toDoListId]: [newTask, ...tasksData[action.toDoListId]]
            };
        case "CHANGE_TASK_STATUS":
            return {
                ...tasksData,
                [action.toDoListId]: tasksData[action.toDoListId].map((t) => t.id === action.taskID ? {...t, isDone: action.isDone} : t)
            };
        case "CHANGE_TASK_TITLE":
            return {
                ...tasksData,
                [action.toDoListId]: tasksData[action.toDoListId].map((t) => t.id === action.taskID ? {...t, title: action.newValue} : t)
            };
        case "ADD_TODOLIST":
            return {
                ...tasksData,
                [action.todoListId]: []
            };
        case "REMOVE_TODOLIST":
            let tasksDataCopy = {...tasksData}
            delete tasksDataCopy[action.toDoListId]
            return tasksDataCopy;
        default:
            return  tasksData
    }
}

export const removeTaskAC = (taskID: string, toDoListId: string): RemoveTaskAT => {
    return {type: REMOVE_TASK, taskID,toDoListId }
}

export const addTaskAC = (title: string, toDoListId: string): AddTaskAT => {
    return {type: ADD_TASK, title, toDoListId }
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, toDoListId: string): ChangeTaskStatusAT => {
    return {type: CHANGE_TASK_STATUS, taskID, isDone, toDoListId }
}

export const changeTaskTitleAC = (newValue: string, toDoListId: string, taskID: string): ChangeTaskTitleAT => {
    return {type: CHANGE_TASK_TITLE, newValue, toDoListId, taskID }
}

export default tasksReducer