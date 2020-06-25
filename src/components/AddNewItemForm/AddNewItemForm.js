import React, {Component} from 'react';
import {Button, TextField} from '@material-ui/core';
import classes from './AddNewItemForm.module.scss'

class AddNewItemForm extends Component {

    state = {
        error: false,
        title: ''
    };

    onAddItemClick = () => {
        let newTitle = this.state.title.trim();

        if (newTitle.length === 0) {
            this.setState({error: true})
        } else {
            this.setState({title: ''});
            this.props.addItem(newTitle);
        }
    };

    onTitleChange = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        })
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddItemClick()
        }
    };

    render() {
        return (
            <div className={classes.todoListNewItemForm}>
                <TextField onChange={this.onTitleChange}
                           onKeyPress={this.onKeyPress}
                           value={this.state.title}
                           label={this.props.placeholder}
                           error={this.state.error}
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

export default AddNewItemForm;
