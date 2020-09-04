import axios from 'axios';
import {TaskType, TodoListType, UpdatedTodoTitleType} from "../types/entities";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "6e863487-7e15-440d-bed9-55795c7bd9f6"}
});

export const api = {

    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodoListType }>>('', {title})
            .then(res => res.data.data.item)
    },

    getTodolists() {
        return instance.get<GetTodolistsType>('')
            .then(res => res.data)
    },

    deleteListItem(todolistId: string) {
        return instance.delete<CommonResponseType<{}>>(`/${todolistId}`)
            .then(res => res.data)
    },

    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`/${todolistId}/tasks`)
            .then(res => res.data.items)
    },

    addTask(title: string, todolistId: string) {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`/${todolistId}/tasks`, {title})
            .then(res => res.data.data.item)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType<{}>>(`/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },

    updateTask(todolistId: string, taskId: string, newTask: TaskType) {
        return instance.put<CommonResponseType<{ item: TaskType }>>(`/${todolistId}/tasks/${taskId}`, {...newTask})
            .then(res => res.data)
    },

    changeTodolistTitle(todolistId: string, newTitle: UpdatedTodoTitleType) {
        return instance.put<CommonResponseType<{}>>(`/${todolistId}`, {...newTitle})
            .then(res => res.data)
    },
};

//Types
type CommonResponseType<T> = {
    messages: Array<string>
    resultCode: number
    data: T
}
type GetTodolistsType = Array<TodoListType>
type GetTasksType = {
    error: string
    totalCount: number
    items: Array<TaskType>
}