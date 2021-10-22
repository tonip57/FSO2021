import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, addLike, removeBlog }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const infoHidden = () => {
    return (
      <div>
        {blog.title} | {blog.author} | <button id="view-button" onClick={() => setBlogInfoVisible(true)}>view</button>
      </div>
    )
  }

  const infoVisible = () => {
    return (
      <div className='info'>
        <div>
          {blog.title} | {blog.author} | <button id='hide-button' onClick={() => setBlogInfoVisible(false)}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div id='likes'>
          {blog.likes} <button id='like-button' onClick={() => addLike({ blog })}>like</button>
        </div>
        <div>
          {blog.user.name === undefined && user.name}
          {blog.user.name !== undefined && blog.user.name}
        </div>
        <div>
          {blog.user.name === user.name && <button id='remove-blog' onClick={() => removeBlog({ blog })}>remove</button>}
          {blog.user.name === undefined && <button id='remove-blog' onClick={() => removeBlog({ blog })}>remove</button>}
        </div>
      </div>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blogInfoVisible === false && infoHidden()}
        {blogInfoVisible === true && infoVisible()}
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog