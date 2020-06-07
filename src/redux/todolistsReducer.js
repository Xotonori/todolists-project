export const ADD_TODOLIST = 'TodoApp/TodolistReducer/ADD_TODOLIST';
export const DELETE_TODOLIST = 'TodoApp/TodolistReducer/DELETE_TODOLIST';
export const ADD_TASK = 'TodoApp/TodolistReducer/ADD_TASK';
export const CHANGE_TASK = 'TodoApp/TodolistReducer/CHANGE_TASK';
export const DELETE_TASK = 'TodoApp/TodolistReducer/DELETE_TASK';

const initialState = {
    todolists: [
        {
            id: 0, title: 'TodoList', tasks: [
                {id: 0, title: 'ReactJs', isDone: false, priority: 'low'},
                {id: 1, title: 'CSS', isDone: false, priority: 'low'},
                {id: 2, title: 'JS', isDone: false, priority: 'high'},
                {id: 3, title: 'jQuery', isDone: true, priority: 'medium'},
                {id: 4, title: 'Patterns', isDone: true, priority: 'low'},
                {id: 5, title: 'PHP', isDone: false, priority: 'low'},
            ]
        },
        {
            id: 1, title: 'Codewars', tasks: [
                {id: 0, title: 'ReactJs', isDone: false, priority: 'low'},
                {id: 1, title: 'CSS', isDone: false, priority: 'low'},
                {id: 2, title: 'JS', isDone: false, priority: 'high'},
                {id: 3, title: 'jQuery', isDone: true, priority: 'medium'},
                {id: 4, title: 'Patterns', isDone: true, priority: 'low'},
                {id: 5, title: 'PHP', isDone: false, priority: 'low'},
            ]
        },
        {
            id: 2, title: 'React JS', tasks: [
                {id: 0, title: 'ReactJs', isDone: false, priority: 'low'},
                {id: 1, title: 'CSS', isDone: false, priority: 'low'},
                {id: 2, title: 'JS', isDone: false, priority: 'high'},
                {id: 3, title: 'jQuery', isDone: true, priority: 'medium'},
                {id: 4, title: 'Patterns', isDone: true, priority: 'low'},
                {id: 5, title: 'PHP', isDone: false, priority: 'low'},
            ]
        },
    ]
};

const todolistsReducer = (state = initialState, action) => {
    switch (action.type) {

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
                                    return {...task, ...action.obj}
                                }
                            })
                        }
                    }
                })
            };

        default: {
            return state;
        }

    }
};

export const createTodolistAC = (newTodoList) => ({type: ADD_TODOLIST, newTodoList});
export const deleteTodolistAC = (todolistId) => ({type: DELETE_TODOLIST, todolistId});
export const addTaskAC = (todolistId, newTask) => ({type: ADD_TASK, todolistId, newTask});
export const deleteTaskAC = (todolistId, taskId) => ({type: DELETE_TASK, todolistId, taskId});
export const changeTaskAC = (todolistId, taskId, obj) => ({type: CHANGE_TASK, todolistId, taskId, obj});

export default todolistsReducer;