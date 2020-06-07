import React, {Component} from 'react';

class TodoListHeader extends Component {

    render() {
        return (
            <div className='todoListTitleWrapper'>
                <h3 className="todoListTitle">{this.props.title}</h3>
            </div>
        );
    }
}

export default TodoListHeader;
