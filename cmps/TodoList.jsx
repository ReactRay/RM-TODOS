import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM

import { removeTodo, toggleIsDone } from "../store/actions/todo.actions.js"
import { showSuccessMsg } from "../services/event-bus.service.js"



export function TodoList({ todos, onToggleTodo }) {


    function onRemoveTodo(todoId) {
        removeTodo(todoId).then(() => showSuccessMsg('removed yay!'))
    }

    return (
        <div className="todo-list boxshadow">
            <h2>Todo List</h2>
            <ul className="todo-list-flex">
                {todos.map(todo =>
                    <li key={todo._id}>
                        <TodoPreview todo={todo} />
                        <section style={{ display: 'flex', justifyContent: 'space-evenly', gap: '1rem' }}>
                            <button className="btn" onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                            <Link className="btn" to={`/todo/${todo._id}`}>Details</Link>
                            <Link className="btn" to={`/todo/edit/${todo._id}`}>Edit</Link>
                            <button className="btn" onClick={() => onToggleTodo(todo)}>toggle status</button>
                        </section>
                    </li>
                )}
            </ul>
        </div>
    )
}