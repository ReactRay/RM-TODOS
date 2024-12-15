
import { ProgressBar } from "../cmps/ProgressBar.jsx"
import { getScore } from "../store/actions/user.actions.js"
const { useSelector, useDispatch } = ReactRedux
const { useEffect } = React

export function UserProfile() {

    const user = useSelector(state => state.userModule.loggedInUser)
    const score = useSelector(state => state.userModule.score)

    useEffect(() => {
        getScore()
    }, [])


    return (
        <div className="container">
            Hello and welcome {user.fullname} your score is: {score}
            <ProgressBar />
        </div>
    )
}