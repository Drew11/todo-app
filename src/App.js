import React from 'react';
import NewTodo from './components/NewTodos';

import './App.css';

class TodoApp extends React.Component {

    constructor() {
        super();
        this.state = {
            active: false,
            todos: [],
            todoIndex: null,
            completed: [],
            clickedComplete: false,
            editing: false,
        };

        this.removeTodo = this.removeTodo.bind(this);
        this.setEditingStatus = this.setEditingStatus.bind(this);
        this.addEditingValues = this.addEditingValues.bind(this);
        this.setItemStatus = this.setItemStatus.bind(this);
        this.getCompletedTodos = this.getCompletedTodos.bind(this);
        this.getAllTodos = this.getAllTodos.bind(this);
        this.clearCompletedTodos = this.clearCompletedTodos.bind(this);

    }

    removeTodo(index) {
        const todos = [...this.state.todos],
            upDateTodos = todos.filter((curr, i) => i!==index);
        this.setState({todos: upDateTodos})
    }

    setEditingStatus(index) {
        this.setState({
            editing: true,
            todoIndex: index
        });
    }

    addEditingValues(event) {
        if(!event.target.value){
            return alert("sorry empty text, type something")
        }
        const todos = [...this.state.todos];
        todos[this.state.todoIndex]['text'] = event.target.value;

        if (event.which === 13) {
            this.setState({
                editing: false,
                todos: todos
            });
        }
    }

    setItemStatus(event, index) {
        const todos = [...this.state.todos];
        todos[index]['completed'] = event.target.checked;
        this.setState({todos: todos})
    }


    getAllTodos() {
        const todos = [...this.state.todos];
        this.setState({
            todos: todos,
            clickedComplete: false
        })
    }

    getCompletedTodos() {
        const todos = [...this.state.todos];
        const completedTodos = todos.filter((todo) => todo['completed']);

        this.setState({
            completed: completedTodos,
            clickedComplete: true
        });
    }

    clearCompletedTodos() {
        const todos = [...this.state.todos];
        const clearTodos = todos.filter((todo) => !todo['completed']);

        this.setState({
            todos: clearTodos,
            clickedComplete: false
        });

    }


    render() {
        console.log(this.state);

        let todos = this.state.todos;


        if (this.state.clickedComplete === true) {
            todos = this.state.completed;
        }
        const todosItem = todos.map((item, index) => {
            return <NewTodo
                text={item['text']}
                status={item['completed']}
                index={index}
                remove={this.removeTodo}
                edit={this.setEditingStatus}
                setItemStatus={this.setItemStatus}
            />
        });


        return (
            <section className={'todo-app'}>
                <header className="todo-header">
                    <h1>todos</h1>
                    <input
                        onKeyPress={(event) => {
                            if(event.target.value===''){
                                return;
                            }
                            const initialTodo = [...this.state.todos, {
                                text: event.target.value,
                                completed: false
                            }];

                            if (event.which === 13) {
                                this.setState({
                                    todos: initialTodo
                                });
                            }
                        }}

                        className={"new-todo"}
                        placeholder={"What needs to be done?"}
                    >

                    </input>

                </header>
                <main>
                    {
                        <ul className={"todo-list"}>
                        {!this.state.editing ?
                            this.state.todos.length>0 ? todosItem : null
                            :
                            <input
                                className={"todo-edit"}
                                type='text'
                                defaultValue={this.state.todos[this.state.todoIndex]['text']}
                                onKeyPress={(event) => {
                                    this.addEditingValues(event)
                                }}
                            >

                            </input>
                        }
                    </ul>}
                </main>

                <footer className="todo-status"

                >
                    {this.state.todos.length>0?
                        <ul className="todo-filters">

                            <li>
                                <a href="#2"
                                   onClick={this.getAllTodos}
                                >All</a>
                            </li>
                            <li >
                                <a href="#1"
                                   onClick={this.getCompletedTodos}
                                >Completed</a>
                            </li>
                            <li>
                                <a href="#3"
                                   onClick={this.clearCompletedTodos}
                                >Clear Completed</a>
                            </li>
                        </ul>:null
                    }

                </footer>
            </section>

        )
    }
}

export default TodoApp;
