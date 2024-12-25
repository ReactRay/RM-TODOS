

export function ConfirmDelete({ idToRemove, onRemoveTodo, onDelete }) {

    function deleting() {
        onRemoveTodo(idToRemove)
        onDelete(false, '')
    }

    return (
        <div className="confirm-delete">
            <h2>Are you sure ?</h2>

            <div className="btn-box">
                <button onClick={deleting}>yes</button>
                <button onClick={() => onDelete(false, '')}>no</button>
            </div>
        </div>
    )
}