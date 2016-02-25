import Monk from 'monk'
import CoMonk from 'co-monk'

let conn = Monk('localhost/ego')
let db = {
  comments: CoMonk(conn.get('comments')),
  posts: CoMonk(conn.get('posts'))
}

export const getByPostId = function *(id) {
  return yield db.comments.find({post: db.posts.id(id)})
}

export const save = function *(comment) {
  comment.post = db.posts.id(comment.post)
  comment.when = new Date()
  yield db.comments.insert(comment)
  yield db.posts.updateById(comment.post,
    {
      $push:
      {
        comments: comment._id
      }
    }
  )
  return comment
}

export const getRecents = function *() {
  let comments = yield db.comments.find({},
    {
      sort: { when: -1 },
      limit: 10,
      skip: 0
    })
  return comments
}
