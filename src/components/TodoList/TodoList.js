import React, {Component} from 'react';
import classes from './TodoList.module.css'
import TodoListTasks from "./TodoListTasks/TodoListTasks"
import TodoListFooter from "./TodoListFooter/TodoListFooter"
import TodoListTitle from "./TodoListTitle/TodoListTitle";
import AddNewItemForm from "../AddNewItemForm/AddNewItemForm";
import {addTaskAC, changeTaskAC, deleteTaskAC, setTasksAC} from '../../redux/todolistsReducer'
import {connect} from "react-redux";
import DeleteItem from "../DeleteItem/DeleteItem";
import axios from "axios";
import {ROOT_URL, serverAccess} from "../../redux/store";

class TodoList extends Component {

    state = {
        filterValue: "All",
    };

    addTask = (title) => {
        axios.post(
            `${ROOT_URL}/${this.props.id}/tasks`,
            {title},
            serverAccess
        )
            .then(res => {
                let task = res.data.data.item;
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
        axios.get(
            `${ROOT_URL}/${this.props.id}/tasks`,
            serverAccess
        )
            .then(res => {
                let allTasks = res.data.items;
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
        }
    }
};

const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodoList;
