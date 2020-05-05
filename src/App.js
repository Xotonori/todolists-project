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
            {id: 0, title: 'ReactJs', isDone: false, priority: 'low'},
            {id: 1, title: 'CSS', isDone: false, priority: 'low'},
            {id: 2, title: 'JS', isDone: false, priority: 'high'},
            {id: 3, title: 'jQuery', isDone: true, priority: 'medium'},
            {id: 4, title: 'Patterns', isDone: true, priority: 'low'},
            {id: 5, title: 'PHP', isDone: false, priority: 'low'},
        ],

        filterValue: "All",
    };

    nextTaskId = this.state.tasks.length;

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('state', stateAsString);
    };

    restoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem('state');
        if (stateAsString) {
            state = JSON.parse(stateAsString);
            this.setState(state, () => {
                this.state.tasks.forEach(t => {
                    if (t.id >= this.nextTaskId) {
                        this.nextTaskId = t.id + 1
                    }
                })
            })
        }
    };

    componentDidMount() {
        this.restoreState();
    }


    addTask = (newTitle) => {
        this.setState({
            tasks: [...this.state.tasks,

                {
                    id: this.nextTaskId,
                    title: newTitle,
                    isDone: false,
                    priority: 'low'
                }]
        }, this.saveState);
        this.nextTaskId++;
    };

    changeFilter = (newFilterValue) => {
        this.setState
        ({filterValue: newFilterValue})

    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(task => {
            if (task.id !== taskId) {
                return task
            } else {
                return {...task, ...obj}
            }
        });
        this.setState({
            tasks: newTasks
        })
    };

    render() {
        let filteredTasks = this.state.tasks.filter(task => {

            switch (this.state.filterValue) {
                case 'Active':
                    return !task.isDone;
                case 'Completed':
                    return task.isDone;
                default:
                    return true;
            }

        });

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader
                        addTask={this.addTask}
                    />
                    <TodoListTasks
                        tasks={filteredTasks}
                        changeTask={this.changeTask}
                    />
                    <TodoListFooter
                        filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                    />
                </div>
            </div>
        );
    }

}

export default App;
