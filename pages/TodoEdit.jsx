import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { saveTodo } from '../store/actions/todo.actions.js'
import { SET_USER_SCORE } from "../store/reducers/user.reducer.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
const { useDispatch } = ReactRedux

export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())

    const navigate = useNavigate()
    const params = useParams()

    let start = ''
    let end = ''

    const dispatch = useDispatch()
    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [])

    function loadTodo() {
        todoService.get(params.todoId)
            .then(setTodoToEdit).then(() => start = todoToEdit.isDone)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }

    async function onSaveTodo(ev) {
        ev.preventDefault()
        end = todoToEdit.isDone
        if (end !== start & start === false)
            dispatch({ type: SET_USER_SCORE })

        await saveTodo(todoToEdit)

        navigate('/todo')
        showSuccessMsg(`Todo Saved!`)
    }

    const { txt, importance, isDone } = todoToEdit

    return (
        <section className="container ">
            <form onSubmit={onSaveTodo} className="todo-edit">
                <label htmlFor="txt">Text:</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="importance">Importance:</label>
                <input onChange={handleChange} value={importance} type="number" name="importance" id="importance" />

                <label htmlFor="isDone">isDone:</label>
                <input onChange={handleChange} value={isDone} type="checkbox" name="isDone" id="isDone" />


                <button>Save</button>
            </form>
        </section>
    )
}