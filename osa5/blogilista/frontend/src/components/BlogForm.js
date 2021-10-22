import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newBlogAuthor,
  newBlogTitle,
  newBlogUrl
}) => {

  return(

    <form onSubmit={addBlog} id='form'>
      <div>
      title:
        <input id="title-input"
          value={newBlogTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
      author:
        <input id="author-input"
          value={newBlogAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
      url:
        <input id="url-input"
          value={newBlogUrl}
          onChange={handleUrlChange}
        />
      </div>
      <button id="submit-button" type="create">save</button>
    </form>
  )}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  newBlogAuthor: PropTypes.string.isRequired,
  newBlogTitle: PropTypes.string.isRequired,
  newBlogUrl: PropTypes.string.isRequired
}

export default BlogForm