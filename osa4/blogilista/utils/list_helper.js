const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  var likes = 0

  blogs.map(blog => {
      likes = likes + blog.likes
  })
  
  return likes
}

const favoriteBlog = (blogs) => {
  var index
  var currentMostLikes = -1
  
  if (blogs.length === 0) {
      return undefined
  }

  for (var x = 0; x < blogs.length; x++) {
      if (blogs[x].likes > currentMostLikes) {
          index = x
          currentMostLikes = blogs[x].likes
      }
  }
  
  var answer = {
  title: blogs[index].title,
  author: blogs[index].author,
  likes: blogs[index].likes
  }
 
  
  return answer
}

const mostBlogs = (blogs) => {
  var names = []
  var answer
  
  for(var x = 0; x < blogs.length; x++) {
    names.push(blogs[x].author)
  }
  
  var count = _.reduce(names, (total, next) => {
  total[next] = (total[next] || 0) + 1 ;
  return total;
  }, {});
  
  if (blogs.length > 1) {
    var authorName = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
    answer = {
        author: authorName,
        blogs: count[authorName]
    }
  } else if (blogs.length === 1) {
     answer = {
        author: blogs[0].author,
        blogs: 1
    }
  } else if (blogs.length === 0) {
      return undefined
  }
  
  return answer
}

const mostLikes = (blogs) => {
  var names = []
  var answer
  var index
  var currentMostLikes = 0
  var currentLikes = 0
  
  if (blogs.length === 0) {
      return undefined
  }
  
  for(var x = 0; x < blogs.length; x++) {
    names.push(blogs[x].author)
  }
  var count = _.reduce(names, (total, next) => {
  total[next] = (total[next] || 0) + 1 ;
  return total;
  }, {});
  
  for (var property in count) {
      for (var x = 0; x < blogs.length; x++) {
          if (blogs[x].author === property) {
              currentLikes = currentLikes + blogs[x].likes
              if (currentLikes > currentMostLikes) {
                  currentMostLikes = currentLikes
                  index = x
              }
          }
      }
      currentLikes = 0
  }
  
  answer = {
  author: blogs[index].author,
  likes: currentMostLikes
  }
  return answer 
 
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}