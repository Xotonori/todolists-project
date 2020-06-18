import React, {Component} from 'react';
import Input from "../Input/Input";

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
            <div className="todoList-newItemForm">
                <Input
                    errorClass={this.state.error ? 'err' : ''}
                    onChange={this.onTitleChange}
                    onKeyPress={this.onKeyPress}
                    value={this.state.title}
                    placeholder={this.props.placeholder}
                />
                <button onClick={this.onAddItemClick}>Add</button>
            </div>
        );
    }

}

export default AddNewItemForm;
