import blogService from '../services/blogs'

const sortBlogsByLikes = (list) => {
  return list.sort((firstItem, secondItem) => secondItem.votes - firstItem.votes)
}


export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog,
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_ALL_BLOGS',
      data: blogs,
    })
  }
}

export const likeBlog = (id, blog) => {
  return async dispatch => {
    await blogService.update(id, blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: id,
    })
  }
}

export const commentBlog = (id, blog) => {
  return async dispatch => {
    await blogService.comment(id, blog)
    dispatch({
      type: 'COMMENT_BLOG',
      data: id,
    })
  }
}

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
  case 'GET_ALL_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return state.concat(action.data)
  case 'DELETE_BLOG':
    return state.filter(blogs => blogs.id !== action.data)
  case 'LIKE_BLOG':
    var id = action.data
    var blogLikesToChange = state.find(b => b.id === id)
    var changedLikes = {
      ...blogLikesToChange,
      likes: blogLikesToChange.likes + 1
    }
    var newState = state.map(anecdote =>
      anecdote.id !== id ? anecdote : changedLikes
    )
    sortBlogsByLikes(newState)
    return newState
  case 'COMMENT_BLOG':
    return state
  default:
    return state
  }
}

export default blogReducer