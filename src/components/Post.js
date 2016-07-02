import React, { PropTypes } from 'react'

import PostHeader from './PostHeader'
import PostTree from './PostTree'
import CommentsContainer from 'containers/CommentsContainer'

function flattenImages (c, images) {
  if (c.image) {
    images.push(c.image)
    return images
  } else {
    if (!c.child) {
      return []
    }
    c.child.forEach((child) => flattenImages(child, images))
    return images
  }
}

const Post = ({ post, showOverlay }) => {
  const images = flattenImages(post, [])
  const dates = images.map((img) => img.takenOn).sort((a, b) => a > b ? 1 : -1)

  return (
    <section className='element'>
      <PostHeader dates={dates} desc={post.desc} kind='light' title={post.title} />
      {post.child ? <PostTree child={post.child} horizontal={post.horizontal} showOverlay={showOverlay} /> : ''}
      {post.admin ? '' : <CommentsContainer postId={post._id} slug={post.slug} />}
    </section>
  )
}
Post.propTypes = {
  post: PropTypes.object.isRequired,
  admin: PropTypes.boolean,
  showOverlay: PropTypes.func
}

export default Post
