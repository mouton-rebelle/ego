import React, { PropTypes } from 'react'
import Header from 'components/Header'
import '../../styles/core.scss'

function CoreLayout ({ children }) {
  return (
    <div className='container app'>
      <Header />
      <div className='app-content'>
        {children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
