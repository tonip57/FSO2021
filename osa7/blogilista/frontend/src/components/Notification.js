
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification

  console.log(notification)

  if (notification !== null && notification.includes('Error')) {
    return (
      <div className='error'>
        {notification}
      </div>
    )
  } else if (notification !== null && !notification.includes('Error')){
    return (
      <div className='notifi'>
        {notification}
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification