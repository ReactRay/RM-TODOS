
import { ProgressBar } from "../cmps/ProgressBar.jsx"
import { getScore, updateUserPref } from "../store/actions/user.actions.js"
import { SET_PREF, SET_USER } from "../store/reducers/user.reducer.js"

import { userService } from "../services/user.service.js"

const { useNavigate } = ReactRouterDOM

const { useSelector, useDispatch } = ReactRedux
const { useEffect } = React

export function UserProfile() {

    const navigate = useNavigate()
    const user = useSelector(state => state.userModule.loggedInUser)
    const score = useSelector(state => state.userModule.score)
    const formStyle = useSelector(state => state.userModule.pref)

    useEffect(() => {

        if (!user) {
            navigate('/')
        } else {
            getScore()
        }
    }, [user, navigate])

    function handleChange(e) {
        const { name, value } = e.target

        const newPref = {
            [name]: value,
        }

        updateUserPref(newPref)
    }

    return (
        <div className="user-profile" >

            <ProgressBar />
            Hello and welcome {user.fullname} your score is: {score}

            <form className="color-form boxshadow" style={formStyle}>
                <div>
                    <label>Choose a background color: </label>
                    <input
                        style={{ padding: '3px' }}
                        type="color"
                        name="backgroundColor"
                        value={formStyle.backgroundColor || "#333"}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Choose a font color: </label>
                    <input
                        style={{ padding: '3px' }}

                        type="color"
                        name="color"
                        value={formStyle.color || "#fff"}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </div >
    )
}