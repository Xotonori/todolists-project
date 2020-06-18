import React, {Component} from 'react';
import {api} from "../../../redux/api";
import classes from './TodoListTitle.module.css'


class TodoListTitle extends Component {

    state = {
        title: this.props.title,
        isEditMode: false
    };

    updateTodolistTitle = (title) => {
        api.changeTodolistTitle(this.props.todolistId, {...title})
            .then(res => {
                this.props.changeTodolistTitle(this.props.todolistId, this.state.title)
            });
    };

    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };

    deActivatedEditMode = () => {
        this.setState({isEditMode: false});
        this.updateTodolistTitle({title: this.state.title})
    };

    setChangeByEnter = (e) => {
        if (e.key === 'Enter') {
            this.deActivatedEditMode();
        }
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value});
    };

    render() {
        return (

            <>
                {this.state.isEditMode
                    ?
                    <input value={this.state.title}
                           onKeyPress={this.setChangeByEnter}
                           autoFocus={true}
                           onBlur={this.deActivatedEditMode}
                           onChange={this.onTitleChanged}
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
