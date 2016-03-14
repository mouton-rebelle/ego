import * as _ from 'lodash'
import Monk from 'monk'

let conn = Monk('localhost/ego')
let db = {
  images: conn.get('images'),
  posts: conn.get('posts')
}

const maxPerPage = 30

let listPostImageIds = function (post) {
  if (!post.child) {
    return [post._id]
  } else {
    return post.child.reduce((ids, c) => {
      ids.push(...listPostImageIds(c))
      return ids
    }, [])
  }
}

let replaceImagesInPost = function (post, images, id) {
  if (!post) {
    return post
  }
  if (!post.child && post._id) {
    post.image = images.filter(function (img) {
      return img._id + '' === post._id + ''
    })[0]
    post.image.postUrl = `/post/${id}`
  } else {
    post.child = post.child.map((p) => {
      p = replaceImagesInPost(p, images, id)
      return p
    })
  }
  return post
}

export const getById = async function(id) {
  let post = await db.posts.findOne({_id: id})
  let ids = listPostImageIds(post)
  let images = await db.images.find({_id: {$in: ids}})
  return replaceImagesInPost(post, images, id)
}

export const getByRange = async function (...range) {
  let count = Math.min(range[1] - range[0], maxPerPage)
  let posts = await db.posts.find({},
    {
      sort: { order: -1 },
      limit: count,
      skip: range[0]
    })
  let total = await db.posts.count({})

  // gather images _id
  let ids = _.uniq(posts.reduce((cids, post) => {
    cids.push(...listPostImageIds(post))
    return cids
  }, []))

  // query images
  let images = await db.images.find({_id: {$in: ids}})

  // replace child images in posts
  posts = posts.map((post) => {
    return replaceImagesInPost(post, images, post._id)
  })

  return {
    posts: posts,
    contentRange: `posts ${range[0]}-${range[1]}/${total}`,
    partial: posts.length < total
  }
}
