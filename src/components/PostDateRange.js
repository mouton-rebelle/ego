import React, { PropTypes } from 'react'
import moment from 'moment'

const Almanach = ({momentDate}) => {
  return (
    <span className='almn pdr__item'>
      <span className='almn__year'>{momentDate.format('YYYY')}</span>
      <span className='almn__date'>{momentDate.format('DD')}</span>
      <span className='almn__month'>{momentDate.format('MMM')}</span>
    </span>
  )
}
Almanach.propTypes = {
  momentDate: PropTypes.object.isRequired
}

const PostDateRange = ({ dates }) => {
  const first = moment(dates[0])
  const last = moment(dates[dates.length - 1])
  const single = first.isSame(last, 'day')
  let calendars = [first]
  if (!single) {
    calendars.push(last)
  }
  return (
    <div className='pdr'>
      <Almanach momentDate={first} />
      {single ? '' : <span className='pdr__item'>↔</span>}
      {single ? '' : <Almanach momentDate={last} />}
    </div>
  )
}

PostDateRange.propTypes = {
  dates: PropTypes.array.isRequired
}

export default PostDateRange
