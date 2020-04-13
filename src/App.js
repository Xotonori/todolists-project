import React, {Component} from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader"
import TodoListTasks from "./components/TodoListTasks"
import TodoListFooter from "./components/TodoListFooter"

class App extends Component {
    constructor(props) {
        super(props);
    }


    state = {
        tasks: [
            {title: 'ReactJs', isDone: false, priority: 'low'},
            {title: 'CSS', isDone: false, priority: 'low'},
            {title: 'JS', isDone: false, priority: 'high'},
            {title: 'jQuery', isDone: true, priority: 'medium'},
            {title: 'Patterns', isDone: true, priority: 'low'},
        ],

        filterValue: "Completed",
    };

    addTask = (newTitle) => {
        this.setState({
            tasks: [...this.state.tasks, {title: newTitle, isDone: false, priority: 'low'}]
        })
    };


    render() {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }

}

export default App;
