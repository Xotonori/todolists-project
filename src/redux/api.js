import axios from 'axios';

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "b08b218c-1bb1-4bbc-9d99-adc8b3f17984"}
});

export const api = {

    createTodolist(title) {
        return instance.post('', {title})
            .then(res => res.data.data)
    },

    getTodolists() {
        return instance.get('')
            .then(res => res.data)
    },

    deleteListItem(todolistId) {
        return instance.delete(`/${todolistId}`)
            .then(res => res.data)
    },

    getTasks(todolistId) {
        return instance.get(`/${todolistId}/tasks`)
            .then(res => {
                return res.data
            })
    },

    addTask(title, todolistId) {
        return instance.post(`/${todolistId}/tasks`, {title})
            .then(res => res.data.data)
    },

    deleteTask(todolistId, taskId) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
            .then(res => res.data.data)
    },

    updateTask(todolistId, taskId, newTask) {
        return instance.put(`/${todolistId}/tasks/${taskId}`, {...newTask})
            .then(res => res.data.data)
    },

    changeTodolistTitle(todolistId, newTitle) {
        return instance.put(`/${todolistId}`, {...newTitle})
            .then(res => res.data)
    },


};