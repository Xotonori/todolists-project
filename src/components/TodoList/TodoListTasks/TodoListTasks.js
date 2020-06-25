import React from 'react';
import TodoListTask from "./TodoListTask/TodoListTask"
import classes from './TodoListTasks.module.scss'


const TodoListTasks = props => (

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


export default TodoListTasks;
