import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const logUserIn = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password, })
      dispatch({
        type: 'LOG_IN',
        data: user,
      })
    } catch (e) {
      dispatch(setNotification('Error, wrong username or password', 4))
    }
  }
}

export const loggedUser = logged => {
  return async dispatch => {
    dispatch({
      type: 'LOGGED_USER',
      data: logged,
    })
  }
}

export const logUserOut = () => {
  return async dispatch => {
    dispatch({
      type: 'LOG_OUT',
      data: null,
    })
  }
}

const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOG_IN':
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(action.data)
    )
    blogService.setToken(action.data.token)
    return action.data
  case 'LOG_OUT':
    return null
  case 'LOGGED_USER':
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(action.data)
    )
    blogService.setToken(action.data.token)
    return action.data
  default:
    return state
  }
}

export default userReducer