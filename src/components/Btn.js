import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Btn extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    handler: PropTypes.func,
    text: PropTypes.string.isRequired,
    url: PropTypes.string
  };

  render () {
    const {url, text, handler, disabled} = this.props
    if (url) {
      return (
        <Link
          className='btn'
          to={url}>
            {text}
        </Link>
      )
    } else {
      return (
        <button className='btn' onClick={handler} disabled={disabled} >{text}</button>
      )
    }
  }
}
