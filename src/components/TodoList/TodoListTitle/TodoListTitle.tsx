import React, {Component} from 'react';
import classes from './TodoListTitle.module.css'
import {TextField} from "@material-ui/core";
import {UpdatedTodoTitleType} from "../../../types/entities";

type OwnPropsType = {
    title: string;
    changeTodolistTitle:(todolistId: string, objTitle: UpdatedTodoTitleType)=>void;
    todolistId: string;
}

type StateType = {
    title: string;
    isEditMode: boolean;
    oldTitle: string;
    isTitleEmpty: boolean;
}

class TodoListTitle extends Component<OwnPropsType, StateType> {

    state = {
        title: this.props.title,
        isEditMode: false,
        oldTitle: '',
        isTitleEmpty: false
    };

    updateTodolistTitle = (objTitle: UpdatedTodoTitleType) => {
        this.props.changeTodolistTitle(this.props.todolistId, objTitle)
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
            this.updateTodolistTitle({title: this.state.title});
        this.setState({isTitleEmpty: false});
    };

    setChangeByEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            this.deActivatedEditMode();
        }
    };

    onTitleChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let title = e.currentTarget.value;
        title.length === 0 ?
            this.setState({isTitleEmpty: true, title: title}) :
            this.setState({isTitleEmpty: false, title: title})
    };

    render() {
        return (
            <>
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
                    <span className={classes.title}
                          onClick={this.activatedEditMode}
                    >{this.props.title}</span>
                }
            </>


        );
    }
}

export default TodoListTitle;
