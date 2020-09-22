import {todoApi} from "../api/todoApi";
import {
    TaskType,
    TodoListType,
    UpdatedTaskParamType,
    UpdatedTodoTitleType
} from "../types/entities";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./store";

const initialState = {
    todolists: [] as Array<TodoListType>,
    isFetching: false,
    errorMessages: [] as Array<string>
};

//Reducer
export const todolistsReducer = (state: InitialStateType = initialState, action: TodoActionTypes): InitialStateType => {
    switch (action.type) {

        case 'SET_TODOLIST_SUCCESS':
            return {
                ...state,
                todolists: action.todoLists.map(tl => ({...tl, tasks: []}))
            };

        case 'SET_TASKS_SUCCESS':
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            tasks: [...action.tasks]
                        }
                    }
                })
            };

        case 'ADD_TODOLIST_SUCCESS':
            return {
                ...state,
                todolists: [...state.todolists, action.newTodoList]
            };

        case 'DELETE_TODOLIST_SUCCESS':
            return {
                ...state,
                todolists: state.todolists.filter(todo => todo.id !== action.todolistId)
            };

        case 'ADD_TASK_SUCCESS':
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            tasks: [...todo.tasks, action.newTask]
                        }
                    }
                })
            };

        case 'DELETE_TASK_SUCCESS':
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            tasks: todo.tasks.filter(task => task.id !== action.taskId)
                        }
                    }
                })
            };

        case 'CHANGE_TASK_SUCCESS':
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            tasks: todo.tasks.map(task => {
                                if (task.id !== action.taskId) {
                                    return task
                                } else {
                                    return {...task, ...action.updatedTask}
                                }
                            })
                        }
                    }
                })
            };

        case 'CHANGE_TODOLIST_TITLE_SUCCESS':
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            title: action.title
                        }
                    }
                })
            };

        case 'IS_FETCHING_SUCCESS':
            return {
                ...state,
                isFetching: action.isFetching
            };

        case 'IS_ERROR_MESSAGE_SUCCESS':
            return {
                ...state,
                errorMessages: state.errorMessages.includes(action.errorMessage) ?
                    [...state.errorMessages] : [...state.errorMessages, action.errorMessage]
            };

        case 'FILTER_ERROR_MESSAGE_SUCCESS':
            return {
                ...state,
                errorMessages: state.errorMessages.filter(message => message !== action.errorMessage)
            };

        case 'DELETE_ERROR_MESSAGES_SUCCESS':
            return {
                ...state,
                errorMessages: []
            };

        default: {
            return state;
        }
    }
};

//Actions
export const todoActions = {
    setTodolistsSuccess: (todoLists: Array<TodoListType>) => ({type: 'SET_TODOLIST_SUCCESS', todoLists} as const),
    addTodolistSuccess: (newTodoList: TodoListType) => ({type: 'ADD_TODOLIST_SUCCESS', newTodoList} as const),
    changeTodolistTitleSuccess: (todolistId: string, title: string) => ({type: 'CHANGE_TODOLIST_TITLE_SUCCESS', todolistId, title} as const),
    deleteTodolistSuccess: (todolistId: string) => ({type: 'DELETE_TODOLIST_SUCCESS', todolistId} as const),
    setTasksSuccess: (tasks: Array<TaskType>, todolistId: string) => ({
        type: 'SET_TASKS_SUCCESS', tasks, todolistId
    } as const),
    addTaskSuccess: (todolistId: string, newTask: TaskType) => ({type: 'ADD_TASK_SUCCESS', todolistId, newTask} as const),
    changeTaskSuccess: (todolistId: string, taskId: string, updatedTask: TaskType) => ({
        type: 'CHANGE_TASK_SUCCESS', todolistId, taskId, updatedTask
    } as const),
    deleteTaskSuccess: (todolistId: string, taskId: string) => ({
        type: 'DELETE_TASK_SUCCESS', todolistId, taskId
    } as const),
    isFetchingSuccess: (isFetching: boolean) => ({type: 'IS_FETCHING_SUCCESS', isFetching} as const),
    isErrorMessageSuccess: (errorMessage: string) => ({type: 'IS_ERROR_MESSAGE_SUCCESS', errorMessage} as const),
    filterErrorMessagesSuccess: (errorMessage: string) => ({type: 'FILTER_ERROR_MESSAGE_SUCCESS', errorMessage} as const),
    deleteErrorMessagesSuccess: () => ({type: 'DELETE_ERROR_MESSAGES_SUCCESS'} as const)
}

//Thunks
export const setTodoLists = (): ThunkType => async (
    dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    dispatch(todoActions.isFetchingSuccess(true));
    try {
        const todolists = await todoApi.getTodolists();
        await dispatch(todoActions.setTodolistsSuccess(todolists));
    } catch (e) {
        dispatch(todoActions.isErrorMessageSuccess(e.response.data.message));
    }
};

export const addTodolist = (title: string): ThunkType => async (
    dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    dispatch(todoActions.isFetchingSuccess(true));
    try {
        const newTodoList = await todoApi.createTodolist(title);
        dispatch(todoActions.addTodolistSuccess(newTodoList));
    } catch (e) {
        dispatch(todoActions.isErrorMessageSuccess(e.response.data.message));
    }
    dispatch(todoActions.isFetchingSuccess(false));
};

export const changeTodolistTitle = (todolistId: string, objTitle: UpdatedTodoTitleType): ThunkType => async (
    dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    dispatch(todoActions.isFetchingSuccess(true));
    try {
        await todoApi.changeTodolistTitle(todolistId, {...objTitle})
        dispatch(todoActions.changeTodolistTitleSuccess(todolistId, objTitle.title));
    } catch (e) {
        dispatch(todoActions.isErrorMessageSuccess(e.response.data.message));
    }
    dispatch(todoActions.isFetchingSuccess(false));
};

export const deleteTodolist = (todolistId: string): ThunkType => async (
    dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    dispatch(todoActions.isFetchingSuccess(true));
    try {
        await todoApi.deleteListItem(todolistId)
        dispatch(todoActions.deleteTodolistSuccess(todolistId));
    } catch (e) {
        dispatch(todoActions.isErrorMessageSuccess(e.response.data.message));
    }
    dispatch(todoActions.isFetchingSuccess(false));
};

export const setTasks = (todolistId: string): ThunkType => async (
    dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    try {
        const allTasks = await todoApi.getTasks(todolistId);
        dispatch(todoActions.setTasksSuccess(allTasks, todolistId));
    } catch (e) {
        dispatch(todoActions.isErrorMessageSuccess(e.response.data.message));
    }
    dispatch(todoActions.isFetchingSuccess(false));
};

export const addTask = (title: string, todolistId: string): ThunkType => async (
    dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    dispatch(todoActions.isFetchingSuccess(true));
    try {
        const task = await todoApi.addTask(title, todolistId);
        dispatch(todoActions.addTaskSuccess(todolistId, task));
    } catch (e) {
        dispatch(todoActions.isErrorMessageSuccess(e.response.data.message));
    }
    dispatch(todoActions.isFetchingSuccess(false));
};

export const changeTask = (todolistId: string, task: TaskType, obj: UpdatedTaskParamType): ThunkType => async (
    dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    dispatch(todoActions.isFetchingSuccess(true));
    try {
        await todoApi.updateTask(todolistId, task.id, {...task, ...obj});
        dispatch(todoActions.changeTaskSuccess(todolistId, task.id, {...task, ...obj}));
    } catch (e) {
        dispatch(todoActions.isErrorMessageSuccess(e.response.data.message));
    }
    dispatch(todoActions.isFetchingSuccess(false));
};

export const deleteTask = (todolistId: string, taskId: string): ThunkType => async (
    dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    dispatch(todoActions.isFetchingSuccess(true));
    try {
        await todoApi.deleteTask(todolistId, taskId);
        dispatch(todoActions.deleteTaskSuccess(todolistId, taskId))
    } catch (e) {
        dispatch(todoActions.isErrorMessageSuccess(e.response.data.message));
    }
    dispatch(todoActions.isFetchingSuccess(false));
};

//Types
type InitialStateType = typeof initialState;
export type TodoActionTypes = InferActionTypes<typeof todoActions>
export type ThunkType = ThunkAction<void, AppStateType, unknown, TodoActionTypes>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, TodoActionTypes>































