import React, { Component, PropTypes } from 'react'

export default class Tag extends Component {

  static propTypes = {
    category: PropTypes.string,
    name: PropTypes.string.isRequired
  };

  render () {
    const { category, name } = this.props
    return (
      <span className='tag'>
        {category ? <span className='tag__category'>{category}</span> : null}
        <span>{name}</span>
      </span>
    )
  }
}
