import React from 'react';
import {TodoListTask} from "./TodoListTask/TodoListTask"
import classes from './TodoListTasks.module.scss'
import {TaskType, UpdatedTaskParamType} from "../../../types/entities";

type OwnPropsType = {
    tasks: Array<TaskType>;
    todolistId: string;
    deleteTask: (todolistId: string, taskId: string) => void;
    changeTask: (todolistId: string, task: TaskType, obj: UpdatedTaskParamType) => void;
}

export const TodoListTasks = (props: OwnPropsType) => (

    <div className={classes.TodoListTasks}>
        {props.tasks.map(task => (
            <TodoListTask key={task.id}
                          todolistId={props.todolistId}
                          task={task}
                          deleteTask={props.deleteTask}
                          changeTask={props.changeTask}
            />
        ))}
    </div>
);


