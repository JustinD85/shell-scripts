import React, { useState } from 'react'
import { Button } from 'reactstrap'
import SimpleForm from './SimpleForm';
import TodoList from './TodoList';
import TodoStats from './TodoStats';



export default () => {
    const initState = localStorage.getItem('todoApp') ?
        JSON.parse(localStorage.getItem('todoApp')) : { todos: [], nextId: 1 }

    const uniqueId = (function (inValue) {
        let value = inValue;
        return () => value++;
    })(initState.nextId)//Nice for protecting values

    const [showForm, setShowForm] = useState(false)
    const [todos, setTodos] = useState(initState.todos.map(e => e))

    function addChangeHandler(stateChange) {
        let newState;
        let id = parseInt(stateChange.id)

        if (Array.isArray(stateChange))
            (newState = stateChange) && (id = stateChange.length ? stateChange.reverse()[0].id : 0)
        else if (!todos.find(todo => parseInt(todo.id) === id))
            newState = todos.reduce((acc, e) => [...acc, e], [stateChange])
        else
            newState = todos.map(todo => todo.id === id ? stateChange : todo)

        setTodos(newState)//set React's state
        localStorage.setItem('todoApp', JSON.stringify({ nextId: id + 1, todos: newState }))//Persist it
    }

    function showFormToggler() {
        setShowForm(!showForm)
    }

    function checkboxToggler(e) {
        const id = parseInt(e.target.closest('.todo-item').id)
        const newState = todos.reduce((acc, todo) => todo.id === id ? { ...todo, ...acc } : acc, { isChecked: e.target.checked })
        addChangeHandler(newState)
    }

    function deleteHandler(e) {
        const id = parseInt(e.target.closest('.todo-item').id)
        const newState = todos.filter(todo => todo.id !== id)
        addChangeHandler(newState)
    }

    return (<main>
        <section>
            <Button active={true} onClick={showFormToggler}>Click to Add a Todo!</Button>
            {showForm && <SimpleForm uniqueId={uniqueId} todos={todos} addStateHandler={addChangeHandler} />}
        </section>
        <section>
            <TodoStats todos={todos} />
            <TodoList todos={todos} checkboxToggler={checkboxToggler} deleteHandler={deleteHandler} />
        </section>
    </main>)
}