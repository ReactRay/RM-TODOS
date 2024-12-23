
import { ProgressBar } from "../cmps/ProgressBar.jsx"
import { getScore, getStyle, updateUserPref } from "../store/actions/user.actions.js"
import { SET_PREF, SET_USER } from "../store/reducers/user.reducer.js"

import { userService } from "../services/user.service.js"

const { useNavigate } = ReactRouterDOM

const { useSelector, useDispatch } = ReactRedux
const { useEffect, useState } = React

export function UserProfile() {
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const itemsPerPage = 5; // Number of notifications per page

    const [userHistory, setUserHistory] = useState([])
    const navigate = useNavigate()
    const user = useSelector(state => state.userModule.loggedInUser)
    const score = useSelector(state => state.userModule.score)
    const formStyle = useSelector(state => state.userModule.pref) || userService.getPrefs()

    useEffect(() => {

        getScore()
        loadHistory()
        getStyle()
    }, [])

    async function loadHistory() {
        if (user) {
            let savedUser = await userService.getById(user._id)
            const savedHistory = savedUser.history || []
            setUserHistory(savedHistory.sort((a, b) => b.time - a.time))


        }
    }

    function timeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''} ago`;
        } else if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (seconds > 0) {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        } else {
            return 'just now';
        }
    }

    function handleChange(e) {
        const { name, value } = e.target

        const newPref = {
            [name]: value,
        }

        updateUserPref(newPref)
    }

    // pagination Logic
    const totalPages = Math.ceil(userHistory.length / itemsPerPage);
    const paginatedHistory = userHistory.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    function nextPage() {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    function prevPage() {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
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
            <div>
                <div className="color-form boxshadow" style={formStyle}>
                    <h3>Notifications:</h3>
                    {paginatedHistory.map((history, idx) => (
                        <h4 className="history" key={history.txt + idx}>
                            {history.txt || history.action}, {timeAgo(history.time)}
                        </h4>
                    ))}

                    {/* Pagination Controls */}
                    <div className="pagination-controls">
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button onClick={nextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}