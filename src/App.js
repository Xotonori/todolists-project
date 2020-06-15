import React, {Component} from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from 'react-redux'
import {addTodolistAC, deleteTodolistAC, setTodolistsAC} from "./redux/todolistsReducer";
import axios from 'axios';
import {ROOT_URL, serverAccess} from "./redux/store";


class App extends Component {

    addListItem = (title) => {
        axios.post(
            ROOT_URL,
            {title},
            serverAccess
        )
            .then(res => {
                let todolist = res.data.data.item;
                this.props.addTodolist(todolist)
            })
    };

    deleteListItem = (todolistId) => {
        axios.delete(
            `${ROOT_URL}/${todolistId}`,
            serverAccess
        )
            .then(res => {
                if(res.data.resultCode === 0) {
                    this.props.deleteTodolist(todolistId)
                }
            })
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        axios.get(ROOT_URL, serverAccess)
            .then(res => {
                this.props.setTodolists(res.data);
            });
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

    setTodolists: (todolists) => {
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
