import React, { PropTypes } from 'react'

import Post from './Post'

const PostsList = ({ posts, showOverlay }) => {
  return (
    <div>
      {posts.map((p) =>
        <div key={p._id} className='aSinglePost'>
          <Post post={p} showOverlay={showOverlay} />
        </div>
      )}
    </div>
  )
}
PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  showOverlay: PropTypes.func.isRequired
}

export default PostsList
