import React from 'react';
import DeleteItem from "../../../DeleteItem/DeleteItem";
import classes from './TodoListTask.module.css'

class TodoListTask extends React.Component {

    state = {
        isEditMode: false
    };

    deleteTask = () => {
        this.props.deleteTask(this.props.todolistId, this.props.task.id)
    };

    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };

    deActivatedEditMode = () => {
        this.setState({isEditMode: false})
    };

    setChangeByEnter = (e) => {
        if (e.key === 'Enter') {
            this.deActivatedEditMode();
        }
    };

    onIsDoneChanged = (e) => {
        this.props.changeTask(this.props.task.id, {isDone: e.currentTarget.checked})
    };

    onTitleChanged = (e) => {
        this.props.changeTask(this.props.task.id, {title: e.currentTarget.value})
    };

    render() {
        let taskIsDoneClass = this.props.task.isDone ? 'todoList-task done' : 'todoList-task';

        return (
            <div className={classes.Task}>
                <div className={taskIsDoneClass}>
                    <input
                        type="checkbox"
                        checked={this.props.task.isDone}
                        onChange={this.onIsDoneChanged}
                    />

                    {this.state.isEditMode
                        ?
                        <input
                            value={this.props.task.title}
                            onKeyPress={this.setChangeByEnter}
                            autoFocus={true}
                            onBlur={this.deActivatedEditMode}
                            onChange={this.onTitleChanged}
                        />
                        :
                        <span onClick={this.activatedEditMode}>
                            {this.props.task.id} : {this.props.task.title}
                        </span>
                    }
                    <span> - {this.props.task.priority}</span>
                </div>
                <DeleteItem deleteItem={this.deleteTask}/>
            </div>
        )
    }

}

export default TodoListTask;
