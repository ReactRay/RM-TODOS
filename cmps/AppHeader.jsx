const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout, getScore } from '../store/actions/user.actions.js'


const { useSelector, useDispatch } = ReactRedux

const { useEffect } = React

export function AppHeader() {
    const navigate = useNavigate()
    // const [user, setUser] = useState(userService.getLoggedinUser()) // store
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const score = useSelector(storeState => storeState.userModule.score)
    const dispatch = useDispatch()
    const formStyle = useSelector(state => state.userModule.pref)


    useEffect(() => {

        getScore()

    }, [score, user])

    function onLogout() { // action

        logout().then(() => showSuccessMsg('logged out !'))
            .then(() => navigate('/'))
            .catch(() => showErrorMsg('somethign went wrong'))

    }


    return (
        <header className="header boxshadow" style={formStyle}>
            <section className="header-flex">

                <h1 >React <span>Todo App</span> 📃</h1>
                <nav className="nav-flex">
                    <NavLink to="/" >Home</NavLink>
                    {/* <NavLink to="/about" >About</NavLink> */}
                    <NavLink to="/todo" >Todos</NavLink>
                    {/* <NavLink to="/dashboard" >Dashboard</NavLink> */}
                    {user && <NavLink to="/userProfile" >your  Profile</NavLink>}

                </nav>

                {user ? (
                    < section style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }} >

                        <Link to={`/userProfile`}>Hello {user.fullname} your score is: {score}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section >
                        <LoginSignup />
                    </section>
                )}


            </section>
            <UserMsg />
        </header>
    )
}
