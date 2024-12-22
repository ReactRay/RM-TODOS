import { ProgressBar } from "../cmps/ProgressBar.jsx"
import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { removeTodo, loadTodos, toggleIsDone } from '../store/actions/todo.actions.js'
import { getScore, incrementScore } from "../store/actions/user.actions.js"

import { SET_FILTER_BY } from "../store/reducers/todo.reducer.js"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {

    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)

    const todos = useSelector(storeState => storeState.todoModule.todos)

    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)

    const dispatch = useDispatch()

    const userStyle = useSelector(storeState => storeState.userModule.pref)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const formStyle = useSelector(state => state.userModule.pref)


    useEffect(() => {
        onLoadTodos()
        if (user)
            getScore()

    }, [filterBy])



    function onLoadTodos() {
        loadTodos()

    }

    function setFilterBy(filter) {
        dispatch({ type: SET_FILTER_BY, filterBy: filter })

    }


    function onRemoveTodo(todoId) {
        removeTodo(todoId)

    }



    function onToggleTodo(todo) {
        toggleIsDone(todo).then(() => { showSuccessMsg('updated the status') })
            .catch(() => showErrorMsg('oh no'))
    }

    if (isLoading) return <div>Loading...</div>
    return (
        <section className="todo-index" >
            <ProgressBar />
            <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <div  >
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>

            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            <div className="the-table boxshadow" style={formStyle}>
                <h2>Todos Table 📔</h2>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}