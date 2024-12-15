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
        <section className="home container boxshadow">
            <h1>Todo's R Us!</h1>
            <h4 className="boxshadow">welcome to my Todo redux project please ejoy your stay 😊</h4>
            <ul className="boxshadow">
                <li>
                    first please sign up
                </li>
                <li>there is no dummy data in this project but don't worr adding todos is easy 😃</li>
                <li>the progress bar will be filled when ever you complete a todo</li>
                <li>please enjoy , i put my best into my work ❤️</li>
            </ul>

        </section>
    )
}