import React from 'react';

class TodoListTask extends React.Component {

        state = {
            isEditMode: false
        };

        activatedEditMode = () => {
            this.setState({isEditMode: true})
        };

        deActivatedEditMode = () => {
            this.setState({isEditMode: false})
        };

        setChangeByEnter = (e) => {
            if(e.key === 'Enter') {
               this.deActivatedEditMode();
            }
        };

        onIsDoneChanged = (e) => {
            this.props.changeTask(this.props.task.id, {isDone: e.currentTarget.checked})
        };

        onTitleChanged = (e) => {
            this.props.changeTask(this.props.task.id, {title: e.currentTarget.value})
        };

        render() {
            let taslIsDoneClass = this.props.task.isDone ? 'todoList-task done' : 'todoList-task';

            return (
                <div className={taslIsDoneClass}>
                    <input
                        type="checkbox"
                        checked={this.props.task.isDone}
                        onChange={this.onIsDoneChanged}
                    />

                    {this.state.isEditMode
                        ?
                        <input
                            value={this.props.task.title}
                            onKeyPress={this.setChangeByEnter}
                            autoFocus={true}
                            onBlur={this.deActivatedEditMode}
                            onChange={this.onTitleChanged}
                        />
                        :
                        <span onClick={this.activatedEditMode}>
                            {this.props.task.id} : {this.props.task.title}
                        </span>
                    }
                    <span> - {this.props.task.priority}</span>
                </div>
            )
        }

}

export default TodoListTask;
