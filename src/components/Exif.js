import React, { PropTypes } from 'react'

const Exif = ({prefix='', value, suffix=''}) => {
  return (
    <span className='exif'>
      {(prefix && value) ? <span className='exif__label exif__label--prefix'>{prefix}</span> : null}
      {value ? <span className='exif__value'>{value}</span> : null}
      {(suffix.length && value) ? <span className='exif__label exif__label--suffix'>{suffix}</span> : null}
    </span>
  )
}

Exif.propTypes = {
  prefix: PropTypes.string,
  value: PropTypes.any,
  suffix: PropTypes.string
}

export default Exif
