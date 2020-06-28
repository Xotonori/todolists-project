import {api} from "./api";

export const ADD_TODOLIST_SUCCESS = 'TodoApp/TodolistReducer/ADD_TODOLIST_SUCCESS';
export const DELETE_TODOLIST_SUCCESS = 'TodoApp/TodolistReducer/DELETE_TODOLIST_SUCCESS';
export const ADD_TASK_SUCCESS = 'TodoApp/TodolistReducer/ADD_TASK_SUCCESS';
export const CHANGE_TASK_SUCCESS = 'TodoApp/TodolistReducer/CHANGE_TASK_SUCCESS';
export const DELETE_TASK_SUCCESS = 'TodoApp/TodolistReducer/DELETE_TASK_SUCCESS';
export const SET_TODOLIST_SUCCESS = 'TodoApp/TodolistReducer/SET_TODOLIST_SUCCESS';
export const SET_TASKS_SUCCESS = 'TodoApp/TodolistReducer/SET_TASKS_SUCCESS';
export const CHANGE_TODOLIST_TITLE_SUCCESS = 'TodoApp/TodolistReducer/CHANGE_TODOLIST_TITLE_SUCCESS';

const initialState = {
    todolists: []
};

const todolistsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_TODOLIST_SUCCESS:
            return {
                ...state,
                todolists: action.todoLists.map(tl => ({...tl, tasks: []}))
            };

        case SET_TASKS_SUCCESS:
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

        case ADD_TODOLIST_SUCCESS:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodoList]
            };

        case DELETE_TODOLIST_SUCCESS:
            return {
                ...state,
                todolists: state.todolists.filter(todo => todo.id !== action.todolistId)
            };

        case ADD_TASK_SUCCESS:
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

        case DELETE_TASK_SUCCESS:
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

        case CHANGE_TASK_SUCCESS:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo, tasks: todo.tasks.map(task => {
                                if (task.id !== action.taskId) {
                                    return task
                                } else {
                                    return {...action.obj}
                                }
                            })
                        }
                    }
                })
            };

        case CHANGE_TODOLIST_TITLE_SUCCESS:
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

        default: {
            return state;
        }
    }
};

export const setTodolistsSuccess = (todoLists) => ({type: SET_TODOLIST_SUCCESS, todoLists});
export const addTodolistSuccess = (newTodoList) => ({type: ADD_TODOLIST_SUCCESS, newTodoList});
export const changeTodolistTitleSuccess = (todolistId, title) => ({
    type: CHANGE_TODOLIST_TITLE_SUCCESS,
    todolistId,
    title
});
export const deleteTodolistSuccess = (todolistId) => ({type: DELETE_TODOLIST_SUCCESS, todolistId});

export const setTasksSuccess = (tasks, todolistId) => ({type: SET_TASKS_SUCCESS, tasks, todolistId});
export const addTaskSuccess = (todolistId, newTask) => ({type: ADD_TASK_SUCCESS, todolistId, newTask});
export const changeTaskSuccess = (todolistId, taskId, obj) => ({type: CHANGE_TASK_SUCCESS, todolistId, taskId, obj});
export const deleteTaskSuccess = (todolistId, taskId) => ({type: DELETE_TASK_SUCCESS, todolistId, taskId});

export default todolistsReducer;


//Thunks

export const setTodoLists = () => (dispatch, getStore) => {
    api.getTodolists()
        .then(res => {
            dispatch(setTodolistsSuccess(res));
        })
        .catch(error => {

        })
};

export const addTodolist = (title) => (dispatch, getStore) => {
    api.createTodolist(title)
        .then(res => {
            let newTodoList = res.item;
            dispatch(addTodolistSuccess(newTodoList))
        })
        .catch(error => {

        })
};

export const changeTodolistTitle = (todolistId, objTitle) => (dispatch, getStore) => {
    api.changeTodolistTitle(todolistId, {...objTitle})
        .then(res => {
            dispatch(changeTodolistTitleSuccess(todolistId, objTitle.title));
        })
        .catch(error => {

        })
};

export const deleteTodolist = (todolistId) => (dispatch, getStore) => {
    api.deleteListItem(todolistId)
        .then(res => {
            dispatch(deleteTodolistSuccess(todolistId))
        })
        .catch(error => {

        })
};

export const setTasks = (todolistId) => (dispatch, getStore) => {
    api.getTasks(todolistId)
        .then(res => {
            let allTasks = res.items;
            dispatch(setTasksSuccess(allTasks, todolistId));
        })
        .catch(error => {

        })
};

export const addTask = (title, todolistId) => (dispatch, getStore) => {
    api.addTask(title, todolistId)
        .then(res => {
            let task = res.item;
            dispatch(addTaskSuccess(todolistId, task));
        })
        .catch(error => {

        })
};

export const changeTask = (todolistId, task, obj) => (dispatch, getStore) => {
    api.updateTask(todolistId, task.id, {...task, ...obj})
        .then(res => {
            dispatch(changeTaskSuccess(todolistId, task.id, {...task, ...obj}))
        })
        .catch(error => {

        })
};

export const deleteTask = (todolistId, taskId) => (dispatch, getStore) => {
    api.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(deleteTaskSuccess(todolistId, taskId))
        })
        .catch(error => {

        })
};































