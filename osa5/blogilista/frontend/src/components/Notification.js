import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else if (message.includes('Error')) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div className="notifi">
      {message}
    </div>
  )
}

export default Notification