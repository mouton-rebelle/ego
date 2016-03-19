import React, { PropTypes } from 'react'
import Header from 'components/admin/Header'

function AdminLayout ({ children }) {
  return (
    <div className='container app'>
      <Header />
      <div className='app-content'>
        {children}
      </div>
    </div>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.element
}

export default AdminLayout
