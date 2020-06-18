export const ADD_TODOLIST = 'TodoApp/TodolistReducer/ADD_TODOLIST';
export const DELETE_TODOLIST = 'TodoApp/TodolistReducer/DELETE_TODOLIST';
export const ADD_TASK = 'TodoApp/TodolistReducer/ADD_TASK';
export const CHANGE_TASK = 'TodoApp/TodolistReducer/CHANGE_TASK';
export const DELETE_TASK = 'TodoApp/TodolistReducer/DELETE_TASK';
export const SET_TODOLIST = 'TodoApp/TodolistReducer/SET_TODOLIST';
export const SET_TASKS = 'TodoApp/TodolistReducer/SET_TASKS';
export const CHANGE_TODOLIST_TITLE = 'TodoApp/TodolistReducer/CHANGE_TODOLIST_TITLE';

const initialState = {
    todolists: []
};

const todolistsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_TODOLIST:
            return {
                ...state,
                todolists: action.todoLists.map(tl => ({...tl, tasks: []}))
            };

        case SET_TASKS:
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

        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodoList]
            };

        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(todo => todo.id !== action.todolistId)
            };

        case ADD_TASK:
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

        case DELETE_TASK:
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

        case CHANGE_TASK:
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

        case CHANGE_TODOLIST_TITLE:
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

export const setTodolistsAC = (todoLists) => ({type: SET_TODOLIST, todoLists});
export const setTasksAC = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId});
export const addTodolistAC = (newTodoList) => ({type: ADD_TODOLIST, newTodoList});
export const deleteTodolistAC = (todolistId) => ({type: DELETE_TODOLIST, todolistId});
export const addTaskAC = (todolistId, newTask) => ({type: ADD_TASK, todolistId, newTask});
export const deleteTaskAC = (todolistId, taskId) => ({type: DELETE_TASK, todolistId, taskId});
export const changeTaskAC = (todolistId, taskId, obj) => ({type: CHANGE_TASK, todolistId, taskId, obj});
export const changeTodolistTitleAC = (todolistId, title) => ({type: CHANGE_TODOLIST_TITLE, todolistId, title});

export default todolistsReducer;