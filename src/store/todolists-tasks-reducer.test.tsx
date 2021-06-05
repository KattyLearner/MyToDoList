import {TaskStateType, ToDoListType} from "../App";
import tasksReducer from "./taskReducer";
import todolistsReducer, {addTodoListAC} from "./todoListReducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<ToDoListType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodolists).toBe(action.todoListId);
});


