
  var timeoutID

  export const setNotification = (content, s) => {
    return dispatch => {
      clearTimeout(timeoutID)
      dispatch({ type: 'VOTE_NOTIFICATION', data: content })
      timeoutID = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION', data: null })
      }, s * 1000)
    }
  }

const initialState = null

const notificationReducer = (state = initialState, action) => {
    var newState
    switch (action.type) {
      case 'VOTE_NOTIFICATION':
        newState = action.data
        return newState
      case 'CLEAR_NOTIFICATION':
        newState = null
        return newState
      default:
        return state
    }
  }
    
  export default notificationReducer