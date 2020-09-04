import React, {Component} from 'react';
import classes from './TodoList.module.scss'
import {TodoListTasks} from "./TodoListTasks/TodoListTasks"
import TodoListFooter from "./TodoListFooter/TodoListFooter"
import TodoListTitle from "./TodoListTitle/TodoListTitle";
import {AddNewItemForm} from "../AddNewItemForm/AddNewItemForm";
import {
    addTask,
    changeTask,
    changeTodolistTitle,
    deleteTask,
    setTasks,
} from '../../redux/todolistsReducer'
import {connect} from "react-redux";
import DeleteItem from "../DeleteItem/DeleteItem";
import {TaskType, UpdatedTaskParamType, UpdatedTodoTitleType} from "../../types/entities";
import {AppStateType} from "../../redux/store";

class TodoList extends Component<CommonPropsType, StateType> {

    state = {
        filterValue: "All",
    };

    addTask = (title: string) => {
        this.props.addTask(title, this.props.id);
    };

    deleteTodoList = () => {
        this.props.deleteListItem(this.props.id);
    };

    changeFilter = (newFilterValue: string) => {
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

export default connect<{}, MapDispatchToPropsType, OwnPropsType, AppStateType>(null, {
    setTasks,
    addTask,
    deleteTask,
    changeTask,
    changeTodolistTitle
})(TodoList);


//Types
type OwnPropsType = {
    key: string;
    id: string;
    title: string;
    tasks: Array<TaskType>;
    deleteListItem: (todolistId: string) => void;
}

type MapDispatchToPropsType = {
    setTasks: (todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    deleteTask: (todolistId: string, taskId: string) => void;
    changeTask: (todolistId: string, task: TaskType, obj: UpdatedTaskParamType) => void;
    changeTodolistTitle: (todolistId: string, objTitle: UpdatedTodoTitleType) => void;
}

type StateType = {
    filterValue: string;
}

type CommonPropsType = OwnPropsType & MapDispatchToPropsType & {};
