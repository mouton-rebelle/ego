import React from 'react'
import {Link} from 'react-router'

export default () => {
  return (
    <header className='header'>
      <h1 className='logo header__logo'>CON<span className='logo__alt'>SOLE</span></h1>
      <ul className='nav head-nav'>
        <li className='head-nav__item'><Link className='head-nav__item__link' to='/admin'>Upload</Link></li>
        <li className='head-nav__item'><Link className='head-nav__item__link' to='/admin/images'>Images</Link></li>

      </ul>
    </header>
  )
}
