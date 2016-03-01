import React, { PropTypes } from 'react'

import Post from './Post'

const PostsList = ({ posts }) => {
  return (
    <div>
      {posts.map((p) =>
        <div key={p._id}>
          <Post post={p} />
        </div>
      )}
    </div>
  )
}
PostsList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostsList
