import React, {Component} from 'react';
import {api} from "../../../redux/api";
import classes from './TodoListTitle.module.css'
import {TextField} from "@material-ui/core";


class TodoListTitle extends Component {

    state = {
        title: this.props.title,
        isEditMode: false,
        oldTitle: '',
        isTitleEmpty: false
    };

    updateTodolistTitle = (title) => {
        api.changeTodolistTitle(this.props.todolistId, {...title})
            .then(res => {
                this.props.changeTodolistTitle(this.props.todolistId, this.state.title)
            });
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

    setChangeByEnter = (e) => {
        if (e.key === 'Enter') {
            this.deActivatedEditMode();
        }
    };

    onTitleChanged = (e) => {
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
