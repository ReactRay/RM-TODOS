const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
import { removeTodo, loadTodos, toggleIsDone } from '../store/actions/todo.actions.js'



export function ProgressBar() {

    const [numberOfDone, setNumberOfDone] = useState(0); // Initialize state to 0
    const todos = useSelector(storeState => storeState.todoModule.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        onLoadTodos();
    }, []);

    useEffect(() => {
        calculateProgress();
    }, [todos]);

    function onLoadTodos() {
        loadTodos();
    }
    function calculateProgress() { // ths function calculate the avrg and sets it in local state
        if (!todos || !todos.length) return;
        const doneCount = todos.filter(todo => todo.isDone).length;
        const progress = Math.floor((doneCount / todos.length) * 10);
        setNumberOfDone(progress);
    }

    return (

        <div className="bar">
            <span>progress:</span>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(((bar, idx) => {
                return <div key={idx + 1} className={`bar-unit ${idx + 1 <= numberOfDone ? 'light' : ''}`}>

                </div>
            }))}
        </div>

    )
}

