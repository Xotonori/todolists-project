import React, {Component} from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from 'react-redux'
import {addTodolistAC, deleteTodolistAC, setTodolistsAC} from "./redux/todolistsReducer";
import {api} from "./redux/api";

class App extends Component {

    addListItem = (title) => {
        api.createTodolist(title)
            .then(res => {
                let todolist = res.item;
                this.props.addTodolist(todolist)
            })
    };

    deleteListItem = (todolistId) => {
        api.deleteListItem(todolistId)
            .then(res => {
                if (res.resultCode === 0) {
                    this.props.deleteTodolist(todolistId)
                }
            })
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        api.getTodolists()
            .then(res => {
                this.props.getTodolists(res);
            });
    };

    render() {
        return (
            <React.Fragment>
                <div className={'addListItem'}>
                    <h3>New Task:</h3>
                    <AddNewItemForm
                        addItem={this.addListItem}
                        placeholder={"New TodoList name"}
                    />
                </div>
                <div className={'App'}>
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

    getTodolists: (todolists) => {
        dispatch(setTodolistsAC(todolists));
    },

    addTodolist: newListItem => {
        dispatch(addTodolistAC(newListItem))
    },

    deleteTodolist: todolistId => {
        dispatch(deleteTodolistAC(todolistId))
    }
});


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
