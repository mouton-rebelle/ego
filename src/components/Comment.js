import React, { PropTypes } from 'react'
import moment from 'moment'
const Comment = ({com}) => {
  return (
    <div className='com'>
      <div className='com__text'>
        {com.text}
      </div>
      <div className='com__meta'>
        <span className='com__meta__author'>{com.author}</span>
        <span className='com__meta__date'>{moment(com.when).format('LLLL')}</span>
      </div>
    </div>
  )
}

Comment.propTypes = {
  com: PropTypes.object.isRequired
}

export default Comment
