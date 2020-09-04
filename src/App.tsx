import React, {Component} from 'react';
import './App.scss';
import TodoList from "./components/TodoList/TodoList";
import {AddNewItemForm} from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from 'react-redux'
import {addTodolist, deleteTodolist, setTodoLists} from "./redux/todolistsReducer";
import {TodoListType} from "./types/entities";
import {AppStateType} from "./redux/store";
import {Preloader} from "./components/Preloader/Preloader";
import {ErrorMessages} from "./components/ErrorMessages/ErrorMessages";

class App extends Component<CommonPropsType> {

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
            <>
                <Preloader/>
                <ErrorMessages/>
                <div className={'addListItemWrapper'}>
                    <div className={'addListItem'}>
                        <h3>New TodoList:</h3>
                        <AddNewItemForm
                            addItem={this.addListItem}
                            placeholder={"New TodoList name"}
                        />
                    </div>
                </div>
                <div className={'todolists'}>
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
            </>
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
})(App);

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
