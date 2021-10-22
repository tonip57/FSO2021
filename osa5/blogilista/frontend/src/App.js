import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  function sortListByLikes(list){
    return list.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortListByLikes(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error')
      setUsername('')
      setPassword('')
      setNotification('Error, wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const logout = async (event) => {
    event.preventDefault()
    console.log('logging out')
    window.localStorage.clear()
    setUser(null)
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

  const removeBlog = async (blog) => {
    if (window.confirm('Remove blog: ' + blog.title + ' by ' + blog.author)) {
      try {
        var blogIndex = 0
        for(var x = 0; x < blogs.length; x++) {
          if (blogs[x].id === blog.id) {
            blogIndex = x
          }
        }

        const blogResponse = await blogService.remove(blog.id)
        console.log(blogResponse)

        var blogs2 = blogs
        blogs2.splice(blogIndex, 1)
        blogs2 = blogs2.concat()
        setBlogs(sortListByLikes(blogs2))

      } catch (exception) {
        console.log('error')
      }
    }
  }

  const addLike = async (blog) => {
    const likes = blog.likes + 1
    try {
      const blogObject = {
        title: blog.title, author: blog.author, url: blog.url, user: blog.user, likes: likes
      }

      const blogResponse = await blogService.update(blog.id, blogObject)

      var blogIndex = 0
      for(var x = 0; x < blogs.length; x++) {
        if (blogs[x].id === blog.id) {
          blogIndex = x
        }
      }
      var blogs2 = blogs
      blogs2.splice(blogIndex, 1)
      blogs2 = blogs2.concat(blogResponse)
      setBlogs(sortListByLikes(blogs2))

    } catch (exception) {
      console.log('error')
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    if(!isEmptyOrSpaces(newBlogTitle) && !isEmptyOrSpaces(newBlogAuthor) && !isEmptyOrSpaces(newBlogUrl)) {
      try {
        const blogObject = {
          title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl,
        }

        const blogResponse = await blogService.create(blogObject)

        var blogs2 = blogs.concat(blogResponse)
        setBlogs(sortListByLikes(blogs2))
        setNotification(
          `a new blog '${newBlogTitle}' by '${newBlogAuthor}' added`
        )
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (exception) {
        setNotification(
          'Error'
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    } else {
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      setNotification(
        'Error, title, author or url cannot be empty'
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} />
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
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button id='open-blogform-button' onClick={() => setBlogFormVisible(true)}>create new blog</button>
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
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logout}>Logout</button></p>
      <Notification message={notification} />
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} id={blog.title} blog={blog} user={user} addLike={({ blog }) => addLike(blog)} removeBlog={({ blog }) => removeBlog(blog)}/>
      )}
    </div>
  )
}

export default App