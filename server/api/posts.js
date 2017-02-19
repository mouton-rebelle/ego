import * as _ from 'lodash'
import Monk from 'monkii'
import {slugify} from './utils'

let conn = Monk('localhost/ego')
let db = {
  images: conn.get('images'),
  posts: conn.get('posts')
}

const maxPerPage = 30

export async function getSlug (text, run = 0) {
  let slug = slugify(text)
  if (run > 0) {
    slug =`${slug}-${run}`
  }
  let post = false
  try {
    post = await db.posts.find({slug: slug})
  } catch (err) {
    console.log(err)
  }
  if (post.length) {
    console.log('------------')
    return await getSlug(text, run+1)
  } else {
    return slug
  }
}

export const listPostImageIds = function (post) {
  if (!post.child) {
    return [post._id]
  } else {
    return post.child.reduce((ids, c) => {
      ids.push(...listPostImageIds(c))
      return ids
    }, [])
  }
}

const replaceImagesInPost = function (mesh, images, slug) {
  if (!mesh) {
    return mesh
  }
  // no more child, this is a leef, we need to find the image
  if (!mesh.child && mesh._id) {
    const imgId = mesh._id + ''
    const matches = images.filter(function (img) {
      return img._id + '' === imgId
    })
    if (matches.length === 1) {
      mesh.image = matches[0]
      mesh.image.postSlug = slug
    }
  } else {
    // still not a leef, we recurse
    mesh.child = mesh.child.map((p) => {
      p = replaceImagesInPost(p, images, slug)
      return p
    })
  }
  return mesh
}

export const getById = async function (id) {
  let post = await db.posts.findOne({_id: id})
  let ids = listPostImageIds(post)
  let images = await db.images.find({_id: {$in: ids}})
  return replaceImagesInPost(post, images, post.slug)
}

export const getBySlug = async function (slug) {
  let post = await db.posts.findOne({slug})
  let ids = listPostImageIds(post)
  let images = await db.images.find({_id: {$in: ids}})
  return replaceImagesInPost(post, images, post.slug)
}

export const getByRange = async function (...range) {
  let count = Math.min(range[1] - range[0], maxPerPage)
  let posts = await db.posts.find({},
    {
      sort: { order: -1 },
      limit: count,
      skip: parseInt(range[0])
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
    return replaceImagesInPost(post, images, post.slug)
  })

  return {
    posts: posts,
    contentRange: `posts ${range[0]}-${range[1]}/${total}`,
    partial: posts.length < total
  }
}
