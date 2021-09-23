import React from 'react'
import Part from './Part'

const Content = (props) => {
    console.log(props)
    return (
      <div>
        <Part part={props.course}/>
      </div>
    )
  }

export default Content