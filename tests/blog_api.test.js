const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        id: "1",
        },
        {
        title: "Otsikko",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 3,
        id: "2"
    }
  ]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

/*
test('oikea määrä blogeja palautettiin', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})


test('blogia identifioiva kenttä on id', async () => {
  const response = await api.get('/api/blogs')
  
  
  for(var x = 0; x < initialBlogs.length; x++) {
    expect(response.body[x].id).toBeDefined()
  }
})
*/

test('blogin postaaminen toimii', async () => {
  const newBlog = {
    _id: '3',
      title: 'TONINBLOGI',
      author: 'Toni',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  console.log(response.body)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

/*
test('liket nollaksi', async () => {
  const newBlog = {
    _id: '5a422aa71b54a676234d17ee',
      title: 'TONINBLOGI',
      author: 'Toni',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  console.log(response.body)

  expect(response.body[2].likes).toBe(0)
})
*/
/*
test('title puuttuu', async () => {
  const newBlog = {
    _id: '5a422aa71b54a676234d17ee',
      author: 'Toni',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('url puuttuu', async () => {
  const newBlog = {
    _id: '5a422aa71b54a676234d17ee',
       title: 'TONI',
      author: 'Toni',
      likes: 3,
      __v: 0
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'abc123')
    .send(newBlog)
    .expect(400)
})
*/



afterAll(() => {
  mongoose.connection.close()
})