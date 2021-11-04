import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Users from './components/Users'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { getAllBlogs, createBlog, likeBlog, commentBlog } from './reducers/blogReducer'
import { getAllUsers } from './reducers/allusersReducer'
import { logUserIn, logUserOut, loggedUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div style={{ paddingLeft: 20 }}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
    </div>
  )
}

const User = (props) => {
  const filteredBlogs = props.blogs.filter(blog => blog.user.id === useParams().id)
  const user = props.users.filter(user => user.id === useParams().id)
  if (!user[0]) {
    return null
  }

  return(
    <div>
      <h1 className='titles'>{user[0].name}</h1>
      <h3>added blogs</h3>
      {filteredBlogs === null && <h5>Blogs not found</h5>}
      {filteredBlogs !== null && <div>
        {filteredBlogs.map(blog =>
          <li key={blog.title} className='rowColor2'>{blog.title}</li>
        )}
      </div>
      }
    </div>
  )
}

const BlogInfo = (props) => {
  const filteredBlog = props.blogs.filter(blog => blog.id === useParams().id)
  var blog = filteredBlog[0]
  var name
  if (blog === undefined) {
    blog = null
  } else {
    if (blog.user.name === undefined || blog.user.name === null) {
      name = props.user.name
    } else {
      name = blog.user.name
    }
  }

  return(
    <div className='rowColor2'>
      {blog === null && null}
      {blog !== null && <div>
        <h1 className='titles'>{blog.title}</h1>
        <p>{blog.url}</p>
        <div id='likes'>
          {blog.likes} likes <button className='likeButton' id='like-button' onClick={() => props.addLike({ blog })}>like</button>
        </div>
        <p>added by {name}</p>
        <h3>comments</h3>
        <div>
          comment:
          <input id="title-input"
            value={props.comment}
            onChange={props.handleCommentChange}
          />
        </div>
        <button className='createBlog' onClick={() => props.addComment({ blog })}>save</button>
        {blog.comments.map(comment =>
          <li key={comment} className='rowColor2'>{comment}</li>
        )}
      </div>
      }
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [comment, setComment] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    dispatch(getAllBlogs())
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      var logged = JSON.parse(loggedUserJSON)
      dispatch(loggedUser(logged))
    } else {
      dispatch(logUserOut())
    }
  }, [])

  var user = useSelector(state => state.user)
  const allUsers = useSelector(state => state.allUsers)
  const blogs = useSelector(state => state.blogs)
  blogs.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes)

  const handleCommentChange = (target) => {
    setComment(target)
  }

  const handleTitleChange = (target) => {
    setNewBlogTitle(target)
  }

  const handleAuthorChange = (target) => {
    setNewBlogAuthor(target)
  }

  const handleUrlChange = (target) => {
    setNewBlogUrl(target)
  }

  function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null
  }

  const addBlog = async (event) => {
    event.preventDefault()
    if(!isEmptyOrSpaces(newBlogTitle) && !isEmptyOrSpaces(newBlogAuthor) && !isEmptyOrSpaces(newBlogUrl)) {
      try {
        const blogObject = {
          title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl,
        }
        dispatch(createBlog(blogObject))
        dispatch(setNotification(`you created blog '${newBlogTitle}'`, 4))
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
      } catch (exception) {
        dispatch(setNotification('Error', 4))
      }
    } else {
      dispatch(setNotification('Error, title, author or url cannot be empty', 4))
    }
  }

  const addComment = async blog => {
    try {
      var commentsPushed = blog.comments
      commentsPushed.push(comment)
      const blogObject = {
        title: blog.title, author: blog.author, url: blog.url, likes: blog.likes, user: blog.user, comments: commentsPushed
      }
      dispatch(commentBlog(blog.id, blogObject))
      dispatch(setNotification('comment created', 4))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
    } catch (exception) {
      dispatch(setNotification('Error', 4))
    }
    setComment('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('trying to log in')
    dispatch(logUserIn(username, password))
    setUsername('')
    setPassword('')
  }

  const logout = async (event) => {
    event.preventDefault()
    console.log('logging out')
    dispatch(logUserOut())
    window.localStorage.clear()
  }

  /**
  const removeBlog = async (blog) => {
    if (window.confirm('Remove blog: ' + blog.title + ' by ' + blog.author)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification(`Removed blog '${blog.title}'`, 4))
      } catch (exception) {
        console.log('Error')
      }
    }
  }
  **/

  const addLike = async (blog) => {
    const likes = blog.likes + 1
    try {
      const blogObject = {
        title: blog.title, author: blog.author, url: blog.url, user: blog.user, likes: likes
      }
      dispatch(likeBlog(blog.id, blogObject))
      dispatch(setNotification(`Liked blog '${blog.title}'`, 4))
    } catch (exception) {
      console.log('Error')
    }
  }

  if (user === null) {
    return (
      <div className='rowColor2'>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button className='button-5' id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div style={{ paddingBottom: 30 }}>
        <div style={hideWhenVisible}>
          <button id='open-blogform-button' className='createBlog' onClick={() => setBlogFormVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            addBlog={addBlog}
            handleTitleChange={({ target }) => handleTitleChange(target.value)}
            handleAuthorChange={({ target }) => handleAuthorChange(target.value)}
            handleUrlChange={({ target }) => handleUrlChange(target.value)}
            newBlogAuthor={newBlogAuthor}
            newBlogTitle={newBlogTitle}
            newBlogUrl={newBlogUrl}
          />
          <button className='cancelButton' onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className='rowColor2'>
      <Router>
        <div className='appBar'>
          <p style={{ paddingLeft: 20 }}>{user.name} logged in <button className='button-5' onClick={logout}>Logout</button></p>
          <Menu/>
        </div>
        <Notification />
        <Switch>
          <Route path="/blogs/:id">
            <BlogInfo blogs={ blogs } user={user} comment={comment} addLike={({ blog }) => addLike(blog)} handleCommentChange={({ target }) => handleCommentChange(target.value)} addComment={({ blog }) => addComment(blog)}/>
          </Route>
          <Route path="/users/:id">
            <User blogs={blogs} users={allUsers}/>
          </Route>
          <Route path="/users">
            <Users users={ allUsers }/>
          </Route>
          <Route path="/">
            <h1 className='titles'>Blogs</h1>
            {blogForm()}
            {blogs.map(blog =>
              <Blog key={blog.id} id={blog.title} blog={blog}/>
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App