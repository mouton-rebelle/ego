import React, { PropTypes } from 'react'

const Field = ({label, children}) => {
  return (
    <div className='field'>
      <label className='field__label'>{label}</label>
      <div className='field__field'>
        {children}
      </div>
    </div>
  )
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default Field
