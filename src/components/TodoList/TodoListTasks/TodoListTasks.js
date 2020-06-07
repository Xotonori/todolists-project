import React from 'react';
import TodoListTask from "./TodoListTask/TodoListTask"


const TodoListTasks = props => (

        <div className="todoList-tasks">
            {props.tasks.map(task => (
                <TodoListTask
                    key={task.id}
                    todolistId={props.todolistId}
                    task={task}
                    deleteTask={props.deleteTask}
                    changeTask={props.changeTask}
                />
            ))}
        </div>
);


export default TodoListTasks;
