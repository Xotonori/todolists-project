import React, {Component} from "react";
import {AddNewItemForm} from "../AddNewItemForm/AddNewItemForm";
import TodoList from "../TodoList/TodoList";
import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
import {addTodolist, deleteTodolist, setTodoLists} from "../../redux/todolistsReducer";
import {TodoListType} from "../../types/entities";
import classes from './TodolIstContainer.module.scss'

class TodolistContainer extends Component<CommonPropsType> {

    addListItem = (title: string) => {
        this.props.addTodolist(title);
    };

    deleteListItem = (todolistId: string) => {
        this.props.deleteTodolist(todolistId);
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.setTodoLists();
    };

    render() {
        return (
            <div>
                <div className={classes.addListItemWrapper}>
                    <div className={classes.addListItem}>
                        <AddNewItemForm
                            addItem={this.addListItem}
                            placeholder={"New TodoList name"}
                        />
                    </div>
                </div>
                <div className={classes.todoLists}>
                    {this.props.todolists.map(item => (
                        <TodoList
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            tasks={item.tasks}
                            deleteListItem={this.deleteListItem}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    todolists: state.todolistsReducer.todolists,
    isFetching: state.todolistsReducer.isFetching,
    errorMessages: state.todolistsReducer.errorMessages
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    setTodoLists,
    addTodolist,
    deleteTodolist
})(TodolistContainer);

//Types
type MapDispatchToPropsType = {
    setTodoLists: () => void;
    addTodolist: (title: string) => void;
    deleteTodolist: (todolistId: string) => void;
}
type MapStateToPropsType = {
    todolists: Array<TodoListType>,
    isFetching: boolean,
}
type CommonPropsType = MapDispatchToPropsType & MapStateToPropsType;