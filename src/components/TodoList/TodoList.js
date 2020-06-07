import React, {Component} from 'react';
import classes from './TodoList.module.css'
import TodoListTasks from "./TodoListTasks/TodoListTasks"
import TodoListFooter from "./TodoListFooter/TodoListFooter"
import TodoListTitle from "./TodoListTitle/TodoListTitle";
import AddNewItemForm from "../AddNewItemForm/AddNewItemForm";
import {addTaskAC, changeTaskAC, deleteTaskAC} from '../../redux/todolistsReducer'
import {connect} from "react-redux";
import DeleteItem from "../DeleteItem/DeleteItem";

class TodoList extends Component {

    state = {
        filterValue: "All",
    };

    addTask = (newTitle) => {

        let newTask = {
            id: (new Date()).getTime(),
            title: newTitle,
            isDone: false,
            priority: 'low'
        };

        this.props.addTask(this.props.id, newTask);
    };

    deleteTodoList = () => {
        this.props.deleteListItem(this.props.id);
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };

    changeTask = (taskId, obj) => {
        this.props.changeTask(this.props.id, taskId, obj)
    };

    render() {
        let filteredTasks = this.props.tasks.filter(task => {

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
            <div className="TodoList">
                <div className={classes.todoListHeader}>
                    <div className={classes.TodoListTitleWrapper}>
                        <TodoListTitle title={this.props.title}/>
                        <DeleteItem deleteItem={this.deleteTodoList}/>
                    </div>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <TodoListTasks
                    tasks={filteredTasks}
                    todolistId={this.props.id}
                    deleteTask={this.props.deleteTask}
                    changeTask={this.changeTask}
                />
                <TodoListFooter
                    filterValue={this.state.filterValue}
                    changeFilter={this.changeFilter}
                />
            </div>
        );
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (todolistId, newTask) => {
            dispatch(addTaskAC(todolistId, newTask));
        },

        deleteTask: (todolistId, taskId) => {
            dispatch(deleteTaskAC(todolistId, taskId))
        },

        changeTask: (todolistId, taskId, obj) => {
            dispatch(changeTaskAC(todolistId, taskId, obj));
        }
    }
};

const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodoList;
