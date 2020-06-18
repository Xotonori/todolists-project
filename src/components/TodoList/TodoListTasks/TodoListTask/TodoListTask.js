import React from 'react';
import DeleteItem from "../../../DeleteItem/DeleteItem";
import classes from './TodoListTask.module.css';
import {api} from "../../../../redux/api";

class TodoListTask extends React.Component {

    state = {
        isEditMode: false,
        title: this.props.task.title
    };

    deleteTask = () => {
        api.deleteTask(this.props.todolistId, this.props.task.id)
            .then(res => {
                this.props.deleteTask(this.props.todolistId, this.props.task.id)
            });
    };

    updateTask = (obj) => {
        api.updateTask(this.props.todolistId, this.props.task.id, {...this.props.task, ...obj})
            .then(res => {
                this.props.changeTask(this.props.task.id, {...res.item})
            });
    };

    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };

    deActivatedEditMode = () => {
        this.setState({isEditMode: false});
        this.updateTask({title: this.state.title})
    };

    setChangeByEnter = (e) => {
        if (e.key === 'Enter') {
            this.deActivatedEditMode();
        }
    };

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.updateTask({status: status});
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value});
    };

    render() {
        let status = this.props.task.status !== 0;
        let taskIsDoneClass = status ? 'todoList-task done' : 'todoList-task';
        return (
            <div className={classes.Task}>
                <div className={taskIsDoneClass}>
                    <input
                        type="checkbox"
                        checked={status}
                        onChange={this.onIsDoneChanged}
                    />

                    {this.state.isEditMode
                        ?
                        <input
                            value={this.state.title}
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
