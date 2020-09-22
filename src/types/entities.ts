//TodolistsTypes
export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
    tasks: Array<TaskType>
}

export type UpdatedTaskParamType = {
    status?: number
    title?: string
}

export type UpdatedTodoTitleType = {
    title: string
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

//AuthTypes
export type SignInDataType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: boolean
}

//ApiTypes
export type CommonResponseType<T> = {
    messages: Array<string>
    resultCode: number
    data: T
}