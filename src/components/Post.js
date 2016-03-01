import React, { PropTypes } from 'react'

import PostHeader from './PostHeader'

function flattenImages (c, images) {
  if (c.image) {
    images.push(c.image)
    return images
  } else {
    if (!c.child) {
      return null
    }
    c.child.forEach((child) => flattenImages(child, images))
    return images
  }
}

const Post = ({ post }) => {
  const images = flattenImages(post, [])
  const dates = images.map((img) => img.takenOn).sort((a, b) => a > b ? 1 : -1)

  return (
    <section className='element'>
      <PostHeader dates={dates} desc={post.desc} kind='light' title={post.title}/>
    </section>
  )
}
Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default Post
