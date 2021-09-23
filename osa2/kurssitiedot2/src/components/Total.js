import React from 'react'


const Total = (props) => {
    return (
      <div>
        <p>total of exercises {props.course.parts.reduce(function(a, b) {
            if (a.exercises !== undefined) {
                a = a.exercises + b.exercises;
            } else {
                a = a + b.exercises;
            }
    
            return (a);
        })}</p>
      </div>
    )
  }

export default Total