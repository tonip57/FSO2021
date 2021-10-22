import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, queryByAttribute } from '@testing-library/react'
import Blog from './Blog'

test('renders correct content', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
  }

  const user = {
    username: 'username',
    name: 'name',
    password: 'password',
  }

  const addLike = () => {}
  const removeBlog = () => {}

  const component = render(
    <Blog blog={blog} user={user} addLike={addLike}  removeBlog={removeBlog}/>
  )


  expect(component.container).toHaveTextContent(
    'title'
  )

  expect(component.container).toHaveTextContent(
    'author'
  )

  expect(component.container).not.toHaveTextContent(
    'url'
  )

  expect(component.container).not.toHaveTextContent(
    0
  )

})

test('renders correct content when view button is pressed', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: {
      name: 'name'
    },
  }

  const user = {
    username: 'username',
    name: 'name',
    password: 'password',
  }

  const addLike = () => {}
  const removeBlog = () => {}

  const getById = queryByAttribute.bind(null, 'id')

  const rend = render(
    <Blog blog={blog} user={user} addLike={addLike} removeBlog={removeBlog}/>
  )

  const button = getById(rend.container, 'view-button')
  fireEvent.click(button)

  expect(rend.container).toHaveTextContent(
    'url'
  )

  expect(rend.container).toHaveTextContent(
    0
  )

})

test('like button is pressed two times', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: {
      name: 'name'
    },
  }

  const user = {
    username: 'username',
    name: 'name',
    password: 'password',
  }

  const removeBlog = () => {}

  const getById = queryByAttribute.bind(null, 'id')

  const mockHandler = jest.fn()

  const rend = render(
    <Blog blog={blog} user={user} addLike={mockHandler} removeBlog={removeBlog}/>
  )

  var button = getById(rend.container, 'view-button')
  fireEvent.click(button)

  button = getById(rend.container, 'like-button')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})