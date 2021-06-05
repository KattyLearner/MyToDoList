import {filterValueType, ToDoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: 'REMOVE_TODOLIST'
    toDoListId: string
}
export type AddTodoListAT = {
    type: 'ADD_TODOLIST'
    title: string
    todoListId: string
}
export type ChangeTodoListTitleAT = {
    type: 'CHANGE_TODOLIST_TITLE'
    newValue: string
    toDoListId: string
}
export type ChangeTodoListFilterAT = {
    type: 'CHANGE_TODOLIST_FILTER'
    value: filterValueType
    toDoListId: string
}
type UnionTodoListType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'

const initialState: Array<ToDoListType> = []

export const todolistsReducer = (todoList: Array<ToDoListType> = initialState, action: UnionTodoListType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return todoList.filter(tl=>tl.id !== action.toDoListId );
        case 'ADD_TODOLIST':
            let newTodoList: ToDoListType = {
            id: action.todoListId,
            title: action.title,
            filter: 'all',
        }
            return [...todoList, newTodoList];
        case 'CHANGE_TODOLIST_TITLE':
            return todoList.map((tl )=> tl.id === action.toDoListId ? {...tl, title: action.newValue} : tl );
        case 'CHANGE_TODOLIST_FILTER':
            return  todoList.map((tl) => tl.id === action.toDoListId ? {...tl, filter: action.value} : tl);
        default:
           return  todoList
    }
}

export const removeTodoListAC = (toDoListId: string): RemoveTodoListAT => {
    return {type: REMOVE_TODOLIST, toDoListId}
}

export const addTodoListAC = (title: string): AddTodoListAT => {
    return {type: ADD_TODOLIST, title, todoListId: v1()}
}

export const changeTodoListTitleAC = (newValue: string, toDoListId: string): ChangeTodoListTitleAT => {
    return {type: CHANGE_TODOLIST_TITLE, newValue, toDoListId}
}

export const changeTodoListFilterAC = (value: filterValueType, toDoListId: string): ChangeTodoListFilterAT => {
    return {type: CHANGE_TODOLIST_FILTER, value, toDoListId}
}

export default todolistsReducer
