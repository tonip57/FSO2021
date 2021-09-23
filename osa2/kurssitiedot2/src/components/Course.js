import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <ul>
        {course.parts.map(c => 
          <Content key={c.id} course={c}/>
        )}
      </ul>
      <Total course={course} />
    </div>
  )
}

export default Course