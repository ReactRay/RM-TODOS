import { ToggleButton } from "../cmps/ToggleButton.jsx"
import { getScore } from "../store/actions/user.actions.js"

const { useState, useEffect } = React

const { useSelector } = ReactRedux

export function Home() {



    const [isOn, setIsOn] = useState(false)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    useEffect(() => {
        if (user) getScore()

    }, [])

    return (
        <section className="home">
            <h1>Todo's R Us!</h1>
            <ToggleButton val={isOn} setVal={setIsOn} />
            {isOn && <img src="../assets/img/todo.png" alt="" />}
        </section>
    )
}