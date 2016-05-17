import Monk from 'monkii'

let conn = Monk('localhost/ego')
let db = {
  comments: conn.get('comments'),
  posts: conn.get('posts')
}

export const getByPostId = async function (id) {
  return await db.comments.find({post: db.posts.id(id)})
}

export const save = async function (comment) {
  comment.post = await db.posts.id(comment.post)
  comment.when = new Date()
  console.log(comment)
  await db.comments.insert(comment)
  await db.posts.updateById(comment.post,
    {
      $push:
      {
        comments: comment._id
      }
    }
  )
  return comment
}

export const getRecents = async function () {
  let comments = await db.comments.find({},
    {
      sort: { when: -1 },
      limit: 10,
      skip: 0
    })
  return comments
}
