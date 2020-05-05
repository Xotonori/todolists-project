import React, {Component} from 'react';

class TodoListHeader extends Component {

    state = {
        error: false,
        title: ''
    };

    onAddTaskClick = () => {
        let newTitle = this.state.title.trim();

        if (newTitle.length === 0) {
            this.setState({error: true})
        } else {
            this.setState({title: ''});
            this.props.addTask(newTitle);
        }
        
    };

    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        })
    };

    onKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.onAddTaskClick()
        }
    };

    

    render() {
        let errorClass = this.state.error ? 'err' : '';

        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input type="text"
                           placeholder="New task name"
                           className={errorClass}
                           onChange={this.onTitleChanged}
                           onKeyPress={this.onKeyPress}
                           value={this.state.title}
                    />
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }


}

export default TodoListHeader;
