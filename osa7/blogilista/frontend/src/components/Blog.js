import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    paddingBottom: 10,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blogRowColor1'>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog