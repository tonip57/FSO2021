import anecdoteService from '../services/anecdotes'

const sortAnecdotesByLikes = (list) => {
  return list.sort((firstItem, secondItem) => secondItem.votes - firstItem.votes)
}

export const voteAnecdote = content => {
  return async dispatch => {
    await anecdoteService.addVote(content)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: content,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteVotesToChange = state.find(a => a.id === id)
      const changedVotes = { 
        ...anecdoteVotesToChange, 
        votes: anecdoteVotesToChange.votes + 1
      }
      var newState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedVotes
      )
      sortAnecdotesByLikes(newState)
      return newState
    case 'CREATE_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer