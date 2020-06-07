import React, {Component} from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from 'react-redux'
import {createTodolistAC, deleteTodolistAC} from "./redux/todolistsReducer";


class App extends Component {


    addListItem = (newTitle) => {

        let newListItem = {
            id: (new Date()).getTime(),
            title: newTitle,
            tasks: []
        };

        this.props.createTodolist(newListItem);
    };

    deleteListItem = (todolistId) => {
        this.props.deleteTodolist(todolistId);
    };



    render() {
        return (
            <React.Fragment>
                <div className={'addListItem'}>
                    <h3>New Task:</h3>
                    <AddNewItemForm addItem={this.addListItem}/>
                </div>
                <div className={'App'}>
                    {this.props.todolists.map(item => (
                        <TodoList
                            id={item.id}
                            title={item.title}
                            tasks={item.tasks}
                            deleteListItem={this.deleteListItem}
                        />
                    ))}
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolistsReducer.todolists,
    }
};

const mapDispatchToProps = (dispatch) => ({

    createTodolist: newListItem => {
        dispatch(createTodolistAC(newListItem))
    },

    deleteTodolist: todolistId => {
        dispatch(deleteTodolistAC(todolistId))
    }
});


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
