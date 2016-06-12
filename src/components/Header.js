import React, {Component} from 'react'
import {Link} from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class Header extends Component {

  constructor (props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      small: false
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', () => {
      this.setState({
        small: window.scrollY>50
      })
    })
  }
  shouldComponentUpdate () {
    return ''
  }
  render () {
    const classes = `header ${this.state.small ? 'header--small' : ''}`
    return (
      <header className={classes}>
        <h1 className='logo header__logo'>EG<span className='logo__alt'>0</span></h1>
        <ul className='nav head-nav'>
          <li className='head-nav__item'><Link className='head-nav__item__link' to='/'>Home</Link></li>
          <li className='head-nav__item'><Link className='head-nav__item__link' to='/search'>Search</Link></li>
          <li className='head-nav__item'><Link className='head-nav__item__link' to='/about'>About</Link></li>
        </ul>
      </header>
    )
  }
}
