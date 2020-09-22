import {CommonResponseType, TaskType, TodoListType, UpdatedTodoTitleType} from "../types/entities";
import {instance} from './instance';

export const todoApi = {

    createTodolist: (title: string) => {
        return instance.post<CommonResponseType<{ item: TodoListType }>>('todo-lists', {title})
            .then(res => res.data.data.item)
    },

    getTodolists: () => {
        return instance.get<GetTodolistsType>('todo-lists')
            .then(res => res.data)
    },

    deleteListItem: (todolistId: string) => {
        return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}`)
            .then(res => res.data)
    },

    getTasks: (todolistId: string) => {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
            .then(res => res.data.items)
    },

    addTask: (title: string, todolistId: string) => {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
            .then(res => res.data.data.item)
    },

    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },

    updateTask: (todolistId: string, taskId: string, newTask: TaskType) => {
        return instance.put<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, {...newTask})
            .then(res => res.data)
    },

    changeTodolistTitle: (todolistId: string, newTitle: UpdatedTodoTitleType) => {
        return instance.put<CommonResponseType<{}>>(`todo-lists/${todolistId}`, {...newTitle})
            .then(res => res.data)
    },
};

//Types
type GetTodolistsType = Array<TodoListType>
type GetTasksType = {
    error: string
    totalCount: number
    items: Array<TaskType>
}