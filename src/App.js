import React, {Component} from 'react';
import './App.scss';
import TodoList from "./components/TodoList/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from 'react-redux'
import {addTodolist, deleteTodolist, setTodoLists} from "./redux/todolistsReducer";

class App extends Component {

    addListItem = (title) => {
        this.props.addTodolist(title)
    };

    deleteListItem = (todolistId) => {
        this.props.deleteTodolist(todolistId)
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
                <div className={'addListItemWrapper'}>
                    <div className={'addListItem'}>
                        <h3>New Task:</h3>
                        <AddNewItemForm
                            addItem={this.addListItem}
                            placeholder={"New TodoList name"}
                        />
                    </div>
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
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolistsReducer.todolists,
    }
};


const ConnectedApp = connect(mapStateToProps, {setTodoLists, addTodolist, deleteTodolist})(App);
export default ConnectedApp;
