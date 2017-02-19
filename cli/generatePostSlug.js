import Monk from 'monkii'
import { getSlug } from '../server/api/posts'
let conn = Monk('localhost/ego')
let db = {
  posts: conn.get('posts')
}
async function run () {
  const posts = await db.posts.find({})
  for (let post of posts) {
    let slug = await getSlug(post.title)
    console.log(post.title, slug)
    await db.posts.updateById(post._id, {$set: {slug}})
  }
}

run()
