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
  getPrefs,
  update,
  addToHistory,
  getScore,
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
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    pref: user.pref,
    score: user.score,
  }
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
  const loggedInUser = getLoggedinUser()
  if (!loggedInUser) return Promise.reject('No logged-in user')

  return getById(loggedInUser._id).then((user) => {
    console.log('user is', user.score)
    if (!user) return Promise.reject('User not found')
    let newScore = +user.score + 10
    let updatedUser = { ...user, score: newScore }
    console.log('user nooow', user)
    return storageService.put(STORAGE_KEY, updatedUser).then(() => {
      _setLoggedinUser(user)
      return user.score
    })
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
      return fullUser.pref
    }
    return {}
  })
}

function getScore() {
  const loggedInUser = getLoggedinUser()
  if (!loggedInUser) return 0

  return getById(loggedInUser._id).then((fullUser) => {
    if (fullUser) {
      console.log(fullUser.score)
      return fullUser.score
    }
    return 0
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
