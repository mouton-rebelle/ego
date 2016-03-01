import React, { PropTypes } from 'react'
import cx from 'classnames'
import PostDateRange from './PostDateRange'

const PostHeader = ({ children, dates, kind, title, desc }) => {
  const classes = {
    title: cx('pHead__info__title', `pHead__info__title--${kind}`),
    desc: cx('pHead__info__desc', `pHead__info__desc--${kind}`),
    base: cx('pHead', `pHead--${kind}`)
  }
  return (
    <div className={classes.base}>
      <div className='pHead__info'>
        <h3 className={classes.title}>{title}</h3>
        {desc ? <div className={classes.desc} dangerouslySetInnerHTML={{__html: desc}} /> : null}
      </div>
      <div className='pHead__date'>
        {dates ? <PostDateRange dates={dates}/> : null}
      </div>
      {React.Children.map(children, (c, i) => {
        return (
          <div className='pHead__additional' key={i}>
            {c}
          </div>
        )
      })}
    </div>
  )
}

PostHeader.propTypes = {
  children: PropTypes.object,
  dates: PropTypes.array,
  desc: PropTypes.string,
  kind: PropTypes.oneOf(['dark', 'light']).isRequired,
  title: PropTypes.string.isRequired
}

export default PostHeader
