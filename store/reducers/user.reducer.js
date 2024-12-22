import { userService } from '../../services/user.service.js'

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'
export const SET_PREF = 'SET_PREF'

const initialState = {
  loggedInUser: userService.getLoggedinUser(),
  score: 0,
  pref: userService.getPrefs(),
  notifications: {},
}

export function userReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_USER:
      return {
        ...state,
        loggedInUser: cmd.user,
      }

    case SET_USER_SCORE:
      return { ...state, score: cmd.score }
    case SET_PREF:
      return { ...state, pref: cmd.pref }

    default:
      return state
  }
}
