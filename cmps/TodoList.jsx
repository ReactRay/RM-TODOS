import { TodoPreview } from "./TodoPreview.jsx"
import { ConfirmDelete } from "./ConfirmDelete.jsx"
const { Link } = ReactRouterDOM

import { removeTodo, toggleIsDone } from "../store/actions/todo.actions.js"
import { showSuccessMsg } from "../services/event-bus.service.js"
const { useState } = React
const { useSelector } = ReactRedux

const style = { fontSize: '30px', padding: '10px', width: '50%', margin: '1rem auto', textAlign: 'center' }// was lazy 

export function TodoList({ todos, onToggleTodo }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [selectedId, setSelectedId] = useState('')
    const formStyle = useSelector(state => state.userModule.pref)

    function onDelete(input, id = '') {
        setIsDeleting(input)
        setSelectedId(id)
    }


    function onRemoveTodo(todoId) {
        removeTodo(todoId).then(() => showSuccessMsg('removed yay!'))
    }

    return (
        <div className="todo-list boxshadow" style={formStyle}>
            <h2>Todo List📃📖</h2>
            {todos.length !== 0 ?
                <ul className="todo-list-flex">
                    {todos.map(todo =>
                        <li key={todo._id} className="container-preview">
                            <TodoPreview todo={todo} />
                            <section className="btn-section" style={{ display: 'flex', justifyContent: 'space-evenly', gap: '1rem' }}>
                                <button style={{ backgroundColor: 'coral' }} className="btn remove" onClick={() => onDelete(true, todo._id)}>X</button>
                                <Link className="btn" to={`/todo/${todo._id}`}>Details</Link>
                                <Link className="btn" to={`/todo/edit/${todo._id}`}>Edit</Link>
                                <button className="btn" onClick={() => onToggleTodo(todo)}>toggle status</button>
                            </section>
                        </li>
                    )}
                </ul>
                : <h1 style={style}>no todos to show ☹️</h1>
            }
            {isDeleting && <ConfirmDelete idToRemove={selectedId} onRemoveTodo={onRemoveTodo} onDelete={onDelete} />}
        </div>
    )
}