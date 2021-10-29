import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  
    const create = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.createAnecdote(content)
        event.target.anecdote.value = ''
        props.setNotification(`you created anecdote '${content}'`, 4)
      }
  
    return (
      <div>
          <h2>create new</h2>
          <form onSubmit={create}>
            <div><input name="anecdote"/></div>
            <button type='submit'>create</button>
          </form>
      </div>
    )
  }
  
  const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
    }
  }
  
  const mapDispatchToProps = {
    createAnecdote,
    setNotification,
  }
  
  const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
  export default ConnectedAnecdoteForm