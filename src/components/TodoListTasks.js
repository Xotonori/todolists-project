import React from 'react';
import TodoListTask from "./TodoListTask"


const TodoListTasks = props => {

    let tasksElements = props.tasks.map(task => {
        return(
                <TodoListTask
                    key={task.id}
                    task={task}
                    // changeStatus={props.changeStatus}
                    // changeTitle={props.changeTitle}
                    changeTask={props.changeTask}
                />
        )
    });

    return (
        <div className="todoList-tasks">
            {tasksElements}
        </div>
    );
};

export default TodoListTasks;
