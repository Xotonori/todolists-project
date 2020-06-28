import React, {Component} from 'react';
import classes from './TodoList.module.scss'
import TodoListTasks from "./TodoListTasks/TodoListTasks"
import TodoListFooter from "./TodoListFooter/TodoListFooter"
import TodoListTitle from "./TodoListTitle/TodoListTitle";
import AddNewItemForm from "../AddNewItemForm/AddNewItemForm";
import {
    addTask,
    changeTask, changeTodolistTitle,
    changeTodolistTitleSuccess,
    deleteTask,
    setTasks
} from '../../redux/todolistsReducer'
import {connect} from "react-redux";
import DeleteItem from "../DeleteItem/DeleteItem";


class TodoList extends Component {

    state = {
        filterValue: "All",
    };

    addTask = (title) => {
        this.props.addTask(title, this.props.id);
    };

    deleteTodoList = () => {
        this.props.deleteListItem(this.props.id);
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.setTasks(this.props.id);
    };

    render() {
        let {tasks = []} = this.props;

        let filteredTasks = tasks.filter(task => {

            switch (this.state.filterValue) {
                case 'Active':
                    return !task.status;
                case 'Completed':
                    return task.status;
                default:
                    return true;
            }

        });

        return (
            <div className={classes.TodoList}>
                <div className={classes.todoListHeader}>
                    <div className={classes.TodoListTitleWrapper}>
                        <TodoListTitle title={this.props.title}
                                       changeTodolistTitle={this.props.changeTodolistTitle}
                                       todolistId={this.props.id}
                        />
                        <DeleteItem deleteItem={this.deleteTodoList}/>
                    </div>
                    <AddNewItemForm addItem={this.addTask}
                                    placeholder={"New task name"}
                    />
                </div>
                <TodoListTasks tasks={filteredTasks}
                               todolistId={this.props.id}
                               deleteTask={this.props.deleteTask}
                               changeTask={this.props.changeTask}
                />
                <TodoListFooter filterValue={this.state.filterValue}
                                changeFilter={this.changeFilter}
                />
            </div>
        );
    }
}

const ConnectedTodoList = connect(null, {
    setTasks,
    addTask,
    deleteTask,
    changeTask,
    changeTodolistTitle
})(TodoList);
export default ConnectedTodoList;
