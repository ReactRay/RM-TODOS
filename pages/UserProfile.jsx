
import { ProgressBar } from "../cmps/ProgressBar.jsx"
const { useSelector, useDispatch } = ReactRedux

export function UserProfile() {

    const user = useSelector(state => state.userModule.loggedInUser)



    return (
        <div className="container">
            Hello and welcome {user.fullname}
            <ProgressBar />
        </div>
    )
}