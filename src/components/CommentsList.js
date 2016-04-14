import React, { PropTypes } from 'react'
import Comment from 'components/Comment'

const CommentsList = ({comments, status}) => {
  return (
    <div className='comList'>
      {
        comments.map((com) => {
          return (
            <Comment key={com._id} com={com} />
          )
        })
      }
    </div>
  )
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  status: PropTypes.oneOf(['NONE', 'LOADING', 'LOADED', 'SAVING'])
}

export default CommentsList
