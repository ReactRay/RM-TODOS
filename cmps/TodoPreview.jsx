export function TodoPreview({ todo }) {
    return (
        <article className="todo-preview">
            <h2 className={(todo.isDone) ? 'done' : ''} >
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
        </article>
    )
}
