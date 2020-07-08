import React from 'react';
import DeleteItem from "../../../DeleteItem/DeleteItem";
import classes from './TodoListTask.module.scss';
import {TextField, Checkbox} from "@material-ui/core";
import {TaskType, UpdatedTaskParamType} from "../../../../types/entities";

type OwnPropsType = {
    key: string;
    todolistId: string;
    task: TaskType;
    deleteTask: (todolistId: string, taskId: string) => void;
    changeTask: (todolistId: string, task: TaskType, obj: UpdatedTaskParamType) => void;
}

type StateType = {
    isEditMode: boolean;
    title: string;
    oldTitle: string;
    isTitleEmpty: boolean;
}

export class TodoListTask extends React.Component<OwnPropsType, StateType> {

    state = {
        isEditMode: false,
        title: this.props.task.title,
        oldTitle: '',
        isTitleEmpty: false
    };

    deleteTask = () => {
        this.props.deleteTask(this.props.todolistId, this.props.task.id)
    };

    updateTask = (obj: UpdatedTaskParamType) => {
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

    setChangeByEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            this.deActivatedEditMode();
        }
    };

    onIsDoneChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.updateTask({status: status});
    };

    onTitleChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                    <Checkbox checked={status}
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

