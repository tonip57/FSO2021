import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, querySelector } from '@testing-library/react'
import BlogForm from './BlogForm'

//Oma koodini eroaa niin paljon ohjeissa olevasta koodista, etten pysty toteuttamaan BlogForm-testausta aivan ohjeissa mainitulla tavalla
//addBlog-funktioni ei saa parametrikseen mitään, vaan se hakee title, url ja author arvot suoraan App.js:ssä määritellyistä state-muuttujista

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()
  var newBlogAuthor = ''
  var newBlogTitle = ''
  var newBlogUrl = ''

  const handleUrlChange = (target) => {
    newBlogUrl = target.target.value
  }
  const handleTitleChange = (target) => {
    newBlogTitle = target.target.value
  }
  const handleAuthorChange = (target) => {
    newBlogAuthor = target.target.value
  }

  const rend = render(
    <BlogForm addBlog={addBlog} handleUrlChange={handleUrlChange} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange}
    newBlogAuthor={newBlogAuthor} newBlogUrl={newBlogUrl} newBlogTitle={newBlogTitle}/>
  )

  const titleInput = rend.container.querySelector('#title-input')
  fireEvent.change(titleInput, { 
    target: { value: 'title' } 
  })
  const authorInput = rend.container.querySelector('#author-input')
  fireEvent.change(authorInput, { 
    target: { value: 'author' } 
  })
  const urlInput = rend.container.querySelector('#url-input')
  fireEvent.change(urlInput, { 
    target: { value: 'url' } 
  })

  expect(newBlogAuthor).toBe('author')
  expect(newBlogTitle).toBe('title')
  expect(newBlogUrl).toBe('url')
  
  const form = rend.container.querySelector('form')
  fireEvent.submit(form)

  expect(addBlog).toHaveBeenCalled()
  expect(addBlog.mock.calls).toHaveLength(1)
})
