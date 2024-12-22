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
  getPrefs,
  update,
  addToHistory,
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
    pref: { backGroundColor: '#9DB2BF', color: '#EAEAEA' },
    score: 0,
    history: [{ action: 'created this account', time: Date.now() }],
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
  const userToSave = { _id: user._id, fullname: user.fullname, pref: user.pref }
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

function getUserScore() {
  const loggedInUser = getLoggedinUser()
  if (!loggedInUser) return 'User not logged in'

  return getById(loggedInUser._id).then((fullUser) => {
    if (fullUser) {
      console.log(fullUser)
      return fullUser.score
    }
    return 'Score not found'
  })
}

function addToHistory(txt) {
  const loggedInUser = getLoggedinUser() // Retrieve logged-in user from sessionStorage
  if (!loggedInUser) return Promise.reject('No logged-in user')

  return getById(loggedInUser._id)
    .then((fullUser) => {
      if (!fullUser) return Promise.reject('User not found in database')

      fullUser.history = [...fullUser.history, { txt: txt, time: Date.now() }]

      return storageService.put(STORAGE_KEY, fullUser).then(() => {
        _setLoggedinUser(fullUser)
        return fullUser.score
      })
    })
    .catch((err) => {
      console.error('failed to add for some reason:', err)
      throw err
    })
}

function incrementUserScore() {
  const loggedInUser = getLoggedinUser() // Retrieve logged-in user from sessionStorage
  if (!loggedInUser) return Promise.reject('No logged-in user')

  return getById(loggedInUser._id)
    .then((fullUser) => {
      if (!fullUser) return Promise.reject('User not found in database')

      fullUser.score = (fullUser.score || 0) + 10

      return storageService.put(STORAGE_KEY, fullUser).then(() => {
        _setLoggedinUser(fullUser)
        return fullUser.score
      })
    })
    .catch((err) => {
      console.error('Failed to increment user score:', err)
      throw err
    })
}

// :root {

//     --dark: #222831;
//     --gray: #393E46;
//     --blue: #9DB2BF;
//     --light: #EAEAEA;

// }

function getPrefs() {
  const loggedInUser = getLoggedinUser()
  if (!loggedInUser) return {}

  return getById(loggedInUser._id).then((fullUser) => {
    if (fullUser) {
      console.log(fullUser.pref)
      return fullUser.pref
    }
    return {}
  })
}

function update(user) {
  return storageService
    .put(STORAGE_KEY, user) //
    .then(() => _setLoggedinUser(user))
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
