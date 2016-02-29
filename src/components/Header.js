import React from 'react'
import {Link} from 'react-router'

export default () => {
  return (
    <header className='header'>
      <h1 className='logo header__logo'>EG<span className='logo__alt'>0</span></h1>
      <ul className='nav head-nav'>
        <li className='head-nav__item'><Link className='head-nav__item__link' to='/'>Home</Link></li>
        <li className='head-nav__item'><Link className='head-nav__item__link' to='/search'>Search</Link></li>
        <li className='head-nav__item'><Link className='head-nav__item__link' to='/about'>About</Link></li>
      </ul>
    </header>
  )
}
