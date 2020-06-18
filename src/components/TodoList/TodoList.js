import React, {Component} from 'react';
import classes from './TodoList.module.css'
import TodoListTasks from "./TodoListTasks/TodoListTasks"
import TodoListFooter from "./TodoListFooter/TodoListFooter"
import TodoListTitle from "./TodoListTitle/TodoListTitle";
import AddNewItemForm from "../AddNewItemForm/AddNewItemForm";
import {addTaskAC, changeTaskAC, changeTodolistTitleAC, deleteTaskAC, setTasksAC} from '../../redux/todolistsReducer'
import {connect} from "react-redux";
import DeleteItem from "../DeleteItem/DeleteItem";
import {api} from "../../redux/api";

class TodoList extends Component {

    state = {
        filterValue: "All",
    };

    addTask = (title) => {
        api.addTask(title, this.props.id)
            .then(res => {
                let task = res.item;
                this.props.addTask(this.props.id, task);
            })
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

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        api.getTasks(this.props.id)
            .then(res => {
                let allTasks = res.items;
                this.props.setTasks(allTasks, this.props.id);
            });
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
                        <TodoListTitle
                            title={this.props.title}
                            changeTodolistTitle={this.props.changeTodolistTitle}
                            todolistId={this.props.id}
                        />
                        <DeleteItem deleteItem={this.deleteTodoList}/>
                    </div>
                    <AddNewItemForm
                        addItem={this.addTask}
                        placeholder={"New task name"}
                    />
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
        setTasks: (tasks, todolistId) => {
            dispatch(setTasksAC(tasks, todolistId));
        },

        addTask: (todolistId, newTask) => {
            dispatch(addTaskAC(todolistId, newTask));
        },

        deleteTask: (todolistId, taskId) => {
            dispatch(deleteTaskAC(todolistId, taskId))
        },

        changeTask: (todolistId, taskId, obj) => {
            dispatch(changeTaskAC(todolistId, taskId, obj));
        },

        changeTodolistTitle: (todolistId, title) => {
            dispatch(changeTodolistTitleAC(todolistId, title));
        }
    }
};

const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodoList;
