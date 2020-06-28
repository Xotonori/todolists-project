import React from 'react';
import DeleteItem from "../../../DeleteItem/DeleteItem";
import classes from './TodoListTask.module.css';
import {TextField, Checkbox} from "@material-ui/core";

class TodoListTask extends React.Component {

    state = {
        isEditMode: false,
        title: this.props.task.title,
        oldTitle: '',
        isTitleEmpty: false
    };

    deleteTask = () => {
        this.props.deleteTask(this.props.todolistId, this.props.task.id)
    };

    updateTask = (obj) => {
        this.props.changeTask(this.props.todolistId, this.props.task, obj)
    };

    activatedEditMode = () => {
        this.setState({
            isEditMode: true,
            oldTitle: this.state.title
        })
    };

    deActivatedEditMode = () => {
        this.setState({isEditMode: false});
        this.state.isTitleEmpty ?
            this.setState({title: this.state.oldTitle}) :
            this.updateTask({title: this.state.title});
        this.setState({isTitleEmpty: false});
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
        let title = e.currentTarget.value;
        title.length === 0 ?
            this.setState({isTitleEmpty: true, title: title}) :
            this.setState({isTitleEmpty: false, title: title})
    };

    render() {
        let status = this.props.task.status !== 0;
        let taskIsDoneClass = status ? 'todoList-task done' : 'todoList-task';
        return (
            <div className={classes.Task}>
                <div className={taskIsDoneClass}>
                    <Checkbox type="checkbox"
                              checked={status}
                              onChange={this.onIsDoneChanged}
                              color={'primary'}
                    />

                    {this.state.isEditMode
                        ?
                        <TextField value={this.state.title}
                                   onKeyPress={this.setChangeByEnter}
                                   autoFocus={true}
                                   onBlur={this.deActivatedEditMode}
                                   onChange={this.onTitleChanged}
                                   helperText={this.state.isTitleEmpty && 'Title is required!'}
                                   error={this.state.isTitleEmpty}
                        />
                        :
                        <span onClick={this.activatedEditMode}>
                            {this.props.task.title}
                        </span>
                    }
                </div>
                <DeleteItem
                    deleteItem={this.deleteTask}
                    buttonStyle={'taskDeleteButton'}
                />
            </div>
        )
    }
}

export default TodoListTask;
