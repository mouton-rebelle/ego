import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import { get as _get } from 'lodash'
export default class Btn extends Component {

  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  static propTypes = {
    disabled: PropTypes.bool,
    handler: PropTypes.func,
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'alt', 'hud'])
  };

  render () {
    const {url, text, handler, disabled} = this.props
    const variant = _get(this.props, 'variant', 'primary')
    const classes = `btn btn--${variant}`
    if (url) {
      return (
        <Link
          className={classes}
          to={url}>
            {text}
        </Link>
      )
    } else {
      return (
        <button className={classes} onClick={handler} disabled={disabled} >{text}</button>
      )
    }
  }
}
