import { userService } from '../../services/user.service.js'
import { SET_USER, SET_USER_SCORE, SET_PREF } from '../reducers/user.reducer.js'
import { store } from '../store.js'

export function login(credentials) {
  return userService
    .login(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user })
      store.dispatch({
        type: SET_PREF,
        pref: user.pref,
      })
    })
    .catch((err) => {
      console.log('user actions -> Cannot login', err)
      throw err
    })
    .finally(() => userService.addToHistory('logged in !'))
}

export function signup(credentials) {
  return userService
    .signup(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user })
      store.dispatch({
        type: SET_PREF,
        pref: { backgroundColor: '#9DB2BF', color: '#333' },
      })
    })
    .catch((err) => {
      console.log('user actions -> Cannot signup', err)
      throw err
    })
}

export function logout() {
  return userService
    .logout()
    .then(() => {
      store.dispatch({ type: SET_USER, user: null })
      store.dispatch({
        type: SET_PREF,
        pref: { backgroundColor: '#9DB2BF', color: 'EAEAEA' },
      })
    })
    .catch((err) => {
      console.log('user actions -> Cannot logout', err)
      throw err
    })
}

export function getScore() {
  return userService
    .getUserScore()
    .then((score) => store.dispatch({ type: SET_USER_SCORE, score }))
}

export function incrementScore() {
  return userService.incrementUserScore((score) =>
    dispatch({ type: SET_USER_SCORE, score })
  )
}

export function updateUserPref(pref) {
  const loggedInUser = userService.getLoggedinUser()

  if (!loggedInUser) {
    console.error('updateUserPref -> No logged-in user found')
    return Promise.reject('No logged-in user')
  }

  return userService.getById(loggedInUser._id).then((fullUser) => {
    if (!fullUser) {
      console.error('updateUserPref -> User not found in storage')
      return Promise.reject('User not found in storage')
    }

    fullUser.pref = {
      ...fullUser.pref,
      ...pref,
    }

    localStorage.setItem('userPrefs', JSON.stringify(fullUser.pref))

    return userService.update(fullUser).then(() => {
      store.dispatch({ type: SET_PREF, pref: fullUser.pref })
      console.log('Preferences updated successfully')
    })
  })
}
