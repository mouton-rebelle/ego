import Monk from 'monk'
import { listPostImageIds } from '../server/api/posts'
let conn = Monk('localhost/ego')
let db = {
  images: conn.get('images'),
  posts: conn.get('posts')
}

db.posts.find({}, 'child').each((post) => {
  let imageIds = listPostImageIds(post)
  imageIds.forEach((iid) => {
    console.log(`set image post id to ${post._id} for image ${iid}`)
    db.images.updateById(iid, {
      $set: {
        postId: post._id
      },
      $unset: {
        parent_id: 1
      }
    })
  })
})
