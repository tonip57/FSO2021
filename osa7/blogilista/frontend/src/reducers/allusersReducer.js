import userService from '../services/users'

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_ALL_USERS',
      data: users,
    })
  }
}

const allusersReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
  case 'GET_ALL_USERS':
    return action.data
  default:
    return state
  }
}

export default allusersReducer