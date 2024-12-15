import { storageService } from './async-storage.service.js'

export const userService = {
  getLoggedinUser,
  login,
  logout,
  signup,
  getById,
  query,
  getEmptyCredentials,
  incrementUserScore,
  getUserScore,
}
const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
  return storageService.query(STORAGE_KEY)
}

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
  return storageService.query(STORAGE_KEY).then((users) => {
    const user = users.find((user) => user.username === username)
    if (user) return _setLoggedinUser(user)
    else return Promise.reject('Invalid login')
  })
}

function signup({ username, password, fullname }) {
  const user = {
    username,
    password,
    fullname,
    pref: { backGroundColor: '#333', color: '#fff' },
    score: 0,
  }
  user.createdAt = user.updatedAt = Date.now()

  return storageService.post(STORAGE_KEY, user).then(_setLoggedinUser)
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
  return Promise.resolve()
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
  const userToSave = { _id: user._id, fullname: user.fullname }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
  return userToSave
}

function getEmptyCredentials() {
  return {
    fullname: '',
    username: 'muki',
    password: 'muki1',
  }
}

function incrementUserScore() {
  const user = getLoggedinUser()
  if (user) {
    user.score = (user.score || 0) + 10
    return storageService
      .put(STORAGE_KEY, user)
      .then(() => _setLoggedinUser(user))
  }
  return Promise.reject('No logged-in user')
}

function getUserScore() {
  const loggedInUser = getLoggedinUser() // Minimal data from sessionStorage
  if (!loggedInUser) return 'User not logged in'

  // Fetch the full user object from storage
  return getById(loggedInUser._id).then((fullUser) => {
    if (fullUser) {
      console.log(fullUser.score)
      console.log(fullUser)
      return fullUser.score
    }
    return 'Score not found'
  })
}

function incrementUserScore() {
  const loggedInUser = getLoggedinUser() // Retrieve logged-in user from sessionStorage
  if (!loggedInUser) return Promise.reject('No logged-in user')

  // Fetch the full user object
  return getById(loggedInUser._id)
    .then((fullUser) => {
      if (!fullUser) return Promise.reject('User not found in database')

      // Increment the score
      fullUser.score = (fullUser.score || 0) + 10

      // Save the updated user back to the database
      return storageService.put(STORAGE_KEY, fullUser).then(() => {
        // Update sessionStorage with the updated user data
        _setLoggedinUser(fullUser)
        return fullUser.score // Return the updated score
      })
    })
    .catch((err) => {
      console.error('Failed to increment user score:', err)
      throw err
    })
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }
