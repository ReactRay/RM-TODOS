import { getScore, getStyle } from "../store/actions/user.actions.js"
import { Presets } from "../cmps/Presets.jsx";
const { useState, useEffect } = React

const { useSelector } = ReactRedux

export function Home() {



    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const formStyle = useSelector(state => state.userModule.pref)

    useEffect(() => {
        if (user && user.pref) {
            getScore()
            getStyle()
        }

    }, [])

    return (
        <section className="home container boxshadow" style={formStyle}>
            <h1>Todo's R Us!</h1>
            {!user && <h4 className="boxshadow">welcome to my Todo redux project please ejoy your stay 😊</h4>}
            {user && <h4 className="boxshadow">welcome {user.fullname} lets dos some todos 🥳</h4>}

            <ul className="boxshadow">
                <li>
                    first please sign up
                </li>
                <li>there is no dummy data in this project but don't worr adding todos is easy 😃</li>
                <li>the progress bar will be filled when ever you complete a todo</li>
                <li>in your profile , feel free to change the style of the whole website 💅🏻</li>
                <li>or just choose a preset from the list below after you login/signup 😊</li>
                <li>please enjoy , i put my best into my work ❤️</li>
            </ul>
            {
                user && <Presets />
            }


        </section>
    )
}