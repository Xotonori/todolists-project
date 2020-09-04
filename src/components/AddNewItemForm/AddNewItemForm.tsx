import React, {Component} from 'react';
import {Button, TextField} from '@material-ui/core';
import classes from './AddNewItemForm.module.scss'

export class AddNewItemForm extends Component<OwnPropsType, StateType> {

    state: StateType = {
        error: false,
        title: '',
        focus: false
    };

    onAddItemClick = () => {
        let newTitle = this.state.title.trim();

        if (newTitle.length === 0) {
            this.setState({
                error: true,
                focus: true
            })
        } else {
            this.setState({title: ''});
            this.props.addItem(newTitle);
        }
    };

    onTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            this.onAddItemClick()
        }
    };

    onMouseUpHandler = () => {
        this.setState({
            error: false,
        });
    }


    render() {
        return (
            <div className={classes.todoListNewItemForm}>
                <TextField onChange={this.onTitleChange}
                           onKeyPress={this.onKeyPress}
                           value={this.state.title}
                           label={this.props.placeholder}
                           error={this.state.error}
                           onMouseUp={this.onMouseUpHandler}
                           autoFocus={this.state.focus}
                           helperText={this.state.error && 'Title is required!'}
                />
                <Button variant="contained"
                        color="primary"
                        onClick={this.onAddItemClick}
                        className={classes.onAddItemButton}>+</Button>
            </div>
        );
    }

}

//Types

type StateType = {
    error: boolean;
    title: string;
    focus: boolean;
}

type OwnPropsType = {
    addItem: (title: string) => void;
    placeholder: string;
}

