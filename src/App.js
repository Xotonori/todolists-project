import React from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader"
import TodoListTasks from "./components/TodoListTasks"
import TodoListFooter from "./components/TodoListFooter"

function App() {

    let tasks = [
        {title:'ReactJs', isDone:false, priority: 'low'},
        {title:'CSS', isDone:false, priority: 'low'},
        {title:'JS', isDone:false, priority: 'high'},
        {title:'jQuery', isDone:true, priority: 'medium'},
        {title:'Patterns', isDone:true, priority: 'low'},
    ];

    let filterValue = "Completed";

  return (
      <div className="App">
          <div className="todoList">
             <TodoListHeader />
             <TodoListTasks tasks={tasks}/>
             <TodoListFooter filterValue={filterValue}/>
          </div>
      </div>
  );
}

export default App;
